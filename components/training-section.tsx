"use client"

import { useRef, useState } from "react"
import { GraduationCap } from "lucide-react"
import { useLang } from "./lang-provider"

export function TrainingSection() {
    const { t } = useLang()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const statusRef = useRef<HTMLDivElement>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const trimmed = email.trim()
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError(t("training_notify_err_email"))
            return
        }

        setError("")
        setSubmitting(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "-",
                    email: trimmed,
                    message: "Proszę o powiadomienie, gdy szkolenia z WCAG będą dostępne.",
                    url: "",
                    service: "training-notify",
                }),
            })

            if (!response.ok) {
                setError(t("training_notify_err_send"))
                return
            }

            setSubmitted(true)
            setEmail("")
            requestAnimationFrame(() => statusRef.current?.focus())
        } catch {
            setError(t("training_notify_err_send"))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section id="training" className="scroll-mt-24" aria-labelledby="training-title">
            <h1 id="training-title" className="mb-3 text-4xl font-black tracking-tight md:text-5xl">
                {t("training_page_title")}
            </h1>
            <p className="mb-8 font-bold text-primary">{t("training_polish_only")}</p>

            <h2 className="mb-3 text-lg font-black text-primary">
                {t("training_active_section_heading")}
            </h2>

            {/* Single WCAG training card */}
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-8">
                <h3 className="flex items-center gap-3 text-xl font-black text-foreground md:text-2xl">
                    <span
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
                        aria-hidden="true"
                    >
                        <GraduationCap className="h-5 w-5 text-primary" strokeWidth={2} />
                    </span>
                    {t("training_active_name")}
                </h3>
                <p className="mt-3 w-full max-w-none text-muted-foreground">
                    {t("training_active_desc")}
                </p>

                <div className="mt-6 grid gap-2 text-muted-foreground">
                    <p>{t("training_item_active_program")}</p>
                    <p>{t("training_item_active_audience")}</p>
                    <p className="font-bold text-primary">{t("training_item_active_terms")}</p>
                </div>

                {/* Waitlist form */}
                <div className="mt-6">
                    <div
                        ref={statusRef}
                        aria-live="polite"
                        role="status"
                        tabIndex={-1}
                        className="text-sm focus:outline-none"
                    >
                        {submitted && (
                            <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-bold text-primary">
                                {t("training_notify_success")}
                            </p>
                        )}
                    </div>

                    {!submitted && (
                        <form onSubmit={handleSubmit} noValidate className="grid gap-3">
                            <label htmlFor="training-email" className="text-sm font-black text-foreground">
                                {t("training_notify_label")}
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    id="training-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 w-full rounded-2xl border-2 border-border bg-input px-4 text-sm text-foreground"
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-black text-primary-foreground transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? t("training_notify_submitting") : t("training_notify_submit")}
                                </button>
                            </div>
                            {error && (
                                <p role="alert" className="text-xs font-bold text-destructive">
                                    {error}
                                </p>
                            )}
                        </form>
                    )}
                </div>

                <p className="mt-8 text-sm italic text-muted-foreground">
                    {t("training_coming_soon_note")}
                </p>
            </div>
        </section>
    )
}
