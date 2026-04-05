import { Resend } from "resend"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ALLOWED_ORIGINS = [
    "https://accessminded.com",
    "https://www.accessminded.com",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "",
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
].filter(Boolean)

function validateEnv() {
    const required = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"] as const
    for (const key of required) {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`)
        }
    }
}

validateEnv()

const resend = new Resend(process.env.RESEND_API_KEY)

// Production: Upstash Redis rate limiting (works across serverless instances)
// Fallback: in-memory for local dev when UPSTASH env vars aren't set
const ratelimit =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(5, "60 s"),
            analytics: true,
        })
        : null

// In-memory fallback for development only
const devRateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 5
const MAX_MAP_SIZE = 1000

function isDevRateLimited(ip: string): boolean {
    const now = Date.now()

    // Prevent unbounded memory growth
    if (devRateLimitMap.size > MAX_MAP_SIZE) {
        for (const [key, entry] of devRateLimitMap) {
            if (now > entry.resetTime) devRateLimitMap.delete(key)
        }
    }

    const entry = devRateLimitMap.get(ip)
    if (!entry || now > entry.resetTime) {
        devRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
        return false
    }
    entry.count++
    return entry.count > RATE_LIMIT_MAX
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

const contactSchema = z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(320),
    message: z.string().min(1).max(5000),
    url: z
        .string()
        .max(2000)
        .refine((value) => {
            if (!value) return true
            try {
                const parsed = new URL(value)
                return parsed.protocol === "http:" || parsed.protocol === "https:"
            } catch {
                return false
            }
        }, "Invalid URL")
        .or(z.literal("")),
    service: z.enum(["audit", "reaudit", "training", "training-notify"]),
})

const MAX_CONTENT_LENGTH = 25_000

function json(data: unknown, status = 200) {
    return Response.json(data, {
        status,
        headers: {
            "Cache-Control": "no-store",
        },
    })
}

function isAllowedOrigin(origin: string | null): boolean {
    if (!origin) return false
    if (process.env.NODE_ENV === "development") return true
    return ALLOWED_ORIGINS.includes(origin)
}

export async function POST(req: Request) {
    try {
        const origin = req.headers.get("origin")
        if (!isAllowedOrigin(origin)) {
            return json({ error: "Forbidden" }, 403)
        }

        const contentType = req.headers.get("content-type") || ""
        if (!contentType.toLowerCase().includes("application/json")) {
            return json({ error: "Unsupported Media Type" }, 415)
        }

        const contentLengthHeader = req.headers.get("content-length")
        if (contentLengthHeader) {
            const contentLength = Number(contentLengthHeader)
            if (Number.isFinite(contentLength) && contentLength > MAX_CONTENT_LENGTH) {
                return json({ error: "Payload too large" }, 413)
            }
        }

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

        if (ratelimit) {
            const { success } = await ratelimit.limit(ip)
            if (!success) {
                return json({ error: "Too many requests" }, 429)
            }
        } else if (isDevRateLimited(ip)) {
            return json({ error: "Too many requests" }, 429)
        }

        const body = await req.json()
        const result = contactSchema.safeParse(body)

        if (!result.success) {
            return json({ error: "Invalid input" }, 400)
        }

        const { name, email, message, url, service } = result.data

        const isTrainingNotify = service === "training-notify"
        const subject = isTrainingNotify
            ? "Nowy zapis na powiadomienie o szkoleniu"
            : service === "training"
            ? "Nowa wiadomość — Szkolenia (Aleksandra Migus)"
            : "Nowa wiadomość — Audyty (Aleksandra Bech)"
        const html = isTrainingNotify
            ? `
        <h2>Nowy zapis na powiadomienie o szkoleniu WCAG</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      `
            : `
        <h2>Nowa wiadomość z formularza</h2>
        <p><strong>Imię:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Usługa:</strong> ${escapeHtml(service)}</p>
        <p><strong>URL:</strong> ${url ? escapeHtml(url) : "-"}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${escapeHtml(message)}</p>
      `

        const { error } = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL!,
            to: process.env.CONTACT_TO_EMAIL!,
            replyTo: email,
            subject,
            html,
        })

        if (error) {
            console.error(error)
            return json({ error: "Email error" }, 500)
        }

        return json({ success: true })
    } catch (error) {
        console.error(error)
        return json({ error: "Server error" }, 500)
    }
}