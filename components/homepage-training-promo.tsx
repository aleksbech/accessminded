"use client"

import { GraduationCap } from "lucide-react"
import { useRef, useState } from "react"
import { useLang } from "./lang-provider"

export function HomepageTrainingPromo() {
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
    <section className="scroll-mt-24" aria-labelledby="homepage-training-section-title">
      <h2 id="homepage-training-section-title" className="mb-3 text-lg font-black text-primary">
        {t("training_active_section_heading")}
      </h2>
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-8">
        <h3
          id="homepage-training-promo-title"
          className="flex items-center gap-3 text-xl font-black text-foreground md:text-2xl"
        >
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

        <div className="mt-4" ref={statusRef} aria-live="polite" role="status" tabIndex={-1}>
          {submitted && (
            <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-bold text-primary">
              {t("training_notify_success")}
            </p>
          )}
        </div>

        {!submitted && (
          <form onSubmit={handleSubmit} noValidate className="mt-3">
            <label htmlFor="hp-training-email" className="mb-2 block text-sm font-black text-foreground">
              {t("training_notify_label")}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                id="hp-training-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-2xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-14 shrink-0 items-center justify-center rounded-2xl bg-primary px-5 text-base font-black text-primary-foreground transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? t("training_notify_submitting") : t("training_notify_submit")}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-1.5 text-xs font-bold text-destructive">
                {error}
              </p>
            )}
          </form>
        )}

        <div className="mt-5 text-center">
          <a
            href="/szkolenia"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            {t("training_see_all_topics")}
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">&rsaquo;</span>
          </a>
        </div>
      </div>
    </section>
  )
}