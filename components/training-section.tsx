"use client"

import { useState, useRef } from "react"
import { GraduationCap, CheckCircle2 } from "lucide-react"
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

    const expectations = [
        t("training_expect_1"),
        t("training_expect_2"),
        t("training_expect_3"),
    ]

    return (
        <section
            id="training"
            className="scroll-mt-24"
            aria-labelledby="training-title"
        >
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-10">
                <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                    {/* Left: content */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
                                aria-hidden="true"
                            >
                                <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                            </span>
                            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.10] px-3 py-1 text-xs font-black text-primary">
                                {t("training_badge")}
                            </span>
                        </div>

                        <div>
                            <h2
                                id="training-title"
                                className="text-xl font-black tracking-tight md:text-2xl"
                            >
                                {t("training_title")}
                            </h2>
                            <p className="text-xl font-black tracking-tight text-primary md:text-2xl">
                                {t("training_subtitle")}
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <p className="leading-relaxed text-muted-foreground">
                                {t("training_p1")}
                            </p>
                            <p className="leading-relaxed text-muted-foreground">
                                {t("training_p2")}
                            </p>
                            <p className="leading-relaxed font-bold text-foreground">
                                {t("training_p3")}
                            </p>
                            <p className="leading-relaxed text-muted-foreground">
                                {t("training_p4")}
                            </p>
                        </div>

                        <div className="mt-2">
                            <p className="mb-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
                                {t("training_expect_title")}
                            </p>
                            <ul className="grid gap-2">
                                {expectations.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                    >
                                        <CheckCircle2
                                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: notify form */}
                    <div className="flex flex-col justify-center gap-4 md:border-l md:border-border md:pl-10">
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
                                <label
                                    htmlFor="training-email"
                                    className="text-sm font-black text-foreground"
                                >
                                    {t("training_notify_label")}
                                </label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        id="training-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        aria-required="true"
                                        aria-invalid={!!error}
                                        aria-describedby={error ? "training-err" : undefined}
                                        placeholder={t("training_notify_ph")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        aria-disabled={submitting}
                                        className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-primary/45 bg-primary px-5 py-3 text-sm font-black text-primary-foreground transition-all hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {submitting
                                            ? t("training_notify_submitting")
                                            : t("training_notify_submit")}
                                    </button>
                                </div>
                                {error && (
                                    <p
                                        id="training-err"
                                        role="alert"
                                        className="text-xs font-bold text-destructive"
                                    >
                                        {error}
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
