"use client"

import { useState, useRef } from "react"
import { GraduationCap, ClipboardCheck, CheckCircle2 } from "lucide-react"
import { useLang } from "./lang-provider"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import Link from "next/link"

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#content">
      {t("skip_to_content")}
    </a>
  )
}

interface FormErrors {
  name?: string
  email?: string
  trainingInterest?: string
  message?: string
  privacy?: string
}

function ContactForm({
  service,
  formIdPrefix,
  variant,
}: {
  service: string
  formIdPrefix: string
  variant: "training" | "audit"
}) {
  const { t } = useLang()
  const isAudit = variant === "audit"
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  function validate(form: FormData): FormErrors {
    const errs: FormErrors = {}
    const name = (form.get("name") as string)?.trim()
    const email = (form.get("email") as string)?.trim()
    const trainingInterest = (form.get("trainingInterest") as string)?.trim()
    const message = (form.get("message") as string)?.trim()
    const privacy = form.get("privacy")

    if (!name) errs.name = t("f_err_name")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t("f_err_email")
    }
    if (variant === "training" && !trainingInterest) {
      errs.trainingInterest = t("f_err_training_interest")
    }
    if (!message || message.length < 20) errs.message = t("f_err_msg")
    if (!privacy) errs.privacy = t("f_err_priv")

    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const errs = validate(formData)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setSubmitted(false)
      const firstKey = Object.keys(errs)[0]
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`)
      if (el instanceof HTMLElement) el.focus()
      return
    }

    setErrors({})
    setSubmitted(false)
    setSubmitting(true)

    const trainingInterest = String(formData.get("trainingInterest") || "").trim()
    const baseMessage = String(formData.get("message") || "")
    const message =
      variant === "training" && trainingInterest
        ? `${t("f_training_interest_label")}: ${trainingInterest}\n\n${baseMessage}`
        : baseMessage

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      url: variant === "audit" ? String(formData.get("url") || "") : "",
      service,
      message,
      privacy: Boolean(formData.get("privacy")),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrors({ message: result.error || t("f_err_send") })
        return
      }

      setSubmitted(true)
      formRef.current?.reset()
      requestAnimationFrame(() => statusRef.current?.focus())
    } catch (error) {
      console.error("FORM SUBMIT ERROR:", error)
      setErrors({ message: t("f_err_connection") })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div
        ref={statusRef}
        aria-live="polite"
        role="status"
        tabIndex={-1}
        className="mb-4 text-sm focus:outline-none"
      >
        {submitted && (
          <p className={isAudit ? "rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 font-bold text-secondary" : "rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-bold text-primary"}>
            {t("f_success")}
          </p>
        )}
      </div>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-1.5">
          <label htmlFor={`${formIdPrefix}-name`} className="text-sm font-black text-foreground">
            {t("f_name_label")} <span className={isAudit ? "text-secondary" : "text-primary"} aria-hidden="true">*</span>
          </label>
          <input
            id={`${formIdPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            placeholder={t("f_name_ph")}
            aria-invalid={!!errors.name}
            className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
          />
          {errors.name && <p role="alert" className="text-xs font-bold text-destructive">{errors.name}</p>}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor={`${formIdPrefix}-email`} className="text-sm font-black text-foreground">
            {t("f_email_label")} <span className={isAudit ? "text-secondary" : "text-primary"} aria-hidden="true">*</span>
          </label>
          <input
            id={`${formIdPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            placeholder={t("f_email_ph")}
            aria-invalid={!!errors.email}
            className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
          />
          {errors.email && <p role="alert" className="text-xs font-bold text-destructive">{errors.email}</p>}
        </div>

        {variant === "audit" ? (
          <div className="grid gap-1.5">
            <label htmlFor={`${formIdPrefix}-url`} className="text-sm font-black text-foreground">
              {t("f_url_label")}
            </label>
            <input
              id={`${formIdPrefix}-url`}
              name="url"
              type="url"
              autoComplete="url"
              placeholder={t("f_url_ph")}
              className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
            />
          </div>
        ) : (
          <div className="grid gap-1.5">
            <label htmlFor={`${formIdPrefix}-training-interest`} className="text-sm font-black text-foreground">
              {t("f_training_interest_label")} <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <textarea
              id={`${formIdPrefix}-training-interest`}
              name="trainingInterest"
              required
              aria-required="true"
              rows={3}
              placeholder={t("f_training_interest_ph")}
              aria-invalid={!!errors.trainingInterest}
              className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow resize-none"
            />
            {errors.trainingInterest && (
              <p role="alert" className="text-xs font-bold text-destructive">{errors.trainingInterest}</p>
            )}
          </div>
        )}

        <div className="grid gap-1.5">
          <label htmlFor={`${formIdPrefix}-message`} className="text-sm font-black text-foreground">
            {t("f_msg_label")} <span className={isAudit ? "text-secondary" : "text-primary"} aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${formIdPrefix}-message`}
            name="message"
            required
            aria-required="true"
            placeholder={t("f_msg_ph")}
            aria-invalid={!!errors.message}
            rows={5}
            className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow resize-none"
          />
          {errors.message && <p role="alert" className="text-xs font-bold text-destructive">{errors.message}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input
            id={`${formIdPrefix}-privacy`}
            name="privacy"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.privacy}
            className={isAudit ? "mt-0.5 h-5 w-5 shrink-0 rounded accent-secondary transition-shadow" : "mt-0.5 h-5 w-5 shrink-0 rounded accent-primary transition-shadow"}
          />
          <div className="grid gap-1">
            <label htmlFor={`${formIdPrefix}-privacy`} className="text-sm font-bold text-foreground">
              {t("f_priv_label")} <span className={isAudit ? "text-secondary" : "text-primary"} aria-hidden="true">*</span>
            </label>
            <p className="text-xs leading-relaxed text-muted-foreground">
              <Link
                href="/privacy-policy"
                className={isAudit ? "inline-flex items-center self-start whitespace-nowrap px-2 py-0.5 text-xs leading-none text-secondary underline underline-offset-4" : "inline-flex items-center self-start whitespace-nowrap px-2 py-0.5 text-xs leading-none text-primary underline underline-offset-4"}
                style={{ borderRadius: "8px", width: "fit-content" }}
              >
                {t("f_priv_link")}
              </Link>
            </p>
            {errors.privacy && <p role="alert" className="text-xs font-bold text-destructive">{errors.privacy}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className={isAudit ? "inline-flex h-12 items-center justify-center rounded-2xl border border-secondary/45 bg-secondary px-5 text-sm font-black text-secondary-foreground transition-all hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed" : "inline-flex h-12 items-center justify-center rounded-2xl border border-primary/45 bg-primary px-5 text-sm font-black text-primary-foreground transition-all hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"}
        >
          {submitting ? t("f_submitting") : t("f_submit")}
        </button>
      </form>
    </div>
  )
}

export function ContactPageContent() {
  const { t } = useLang()

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8">
            <section>
              <h1 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
                {t("contact_choice_title")}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("contact_choice_intro")}
              </p>
            </section>

            <section className="grid gap-6" aria-label="Contact forms">
              <div id="contact-audits" className="group relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl md:p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
                  aria-hidden="true"
                  style={{
                    backgroundImage: "radial-gradient(rgba(90,170,255,0.16) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    maskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
                    WebkitMaskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-secondary/15 opacity-40 blur-3xl transition-opacity group-hover:opacity-60"
                  aria-hidden="true"
                />

                <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
                  <aside className="grid content-start gap-5 border-border lg:border-r lg:pr-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/[0.10]" aria-hidden="true">
                        <ClipboardCheck className="h-6 w-6 text-secondary" strokeWidth={2} />
                      </span>
                      <h2 className="text-xl font-black text-foreground md:text-2xl">{t("contact_choice_audit")}</h2>
                    </div>
                    <p className="text-muted-foreground">{t("contact_body")}</p>
                    <div className="grid gap-1 text-sm text-foreground/90">
                      <p><span className="font-black">{t("f_name_label")}: </span>{t("aleksandra_bech_name")}</p>
                      <p><span className="font-black">{t("contact_email_label")}: </span><a className="text-secondary underline underline-offset-4" href={`mailto:${t("contact_email_value")}`}>{t("contact_email_value")}</a></p>
                      <p><span className="font-black">{t("contact_lang_label")}: </span>{t("contact_lang_value")}</p>
                    </div>
                    <div className="grid gap-2">
                      <p className="text-sm font-black uppercase tracking-wide text-foreground/90">{t("contact_expect_title")}</p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />{t("contact_expect_1")}</p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />{t("contact_expect_2")}</p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />{t("contact_expect_3")}</p>
                    </div>
                  </aside>
                  <div>
                    <ContactForm service="audit" formIdPrefix="audit" variant="audit" />
                  </div>
                </div>
              </div>

              <div id="contact-training" className="group relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl md:p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
                  aria-hidden="true"
                  style={{
                    backgroundImage: "radial-gradient(rgba(46,230,166,0.14) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    maskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
                    WebkitMaskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/15 opacity-40 blur-3xl transition-opacity group-hover:opacity-60"
                  aria-hidden="true"
                />

                <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
                  <aside className="grid content-start gap-5 border-border lg:border-r lg:pr-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]" aria-hidden="true">
                        <GraduationCap className="h-6 w-6 text-primary" strokeWidth={2} />
                      </span>
                      <h2 className="text-xl font-black text-foreground md:text-2xl">{t("contact_choice_training")}</h2>
                    </div>
                    <p className="text-muted-foreground">{t("contact_choice_training_desc")}</p>
                    <div className="grid gap-1 text-sm text-foreground/90">
                      <p><span className="font-black">{t("f_name_label")}: </span>{t("aleksandra_migus_name")}</p>
                      <p><span className="font-black">{t("contact_email_label")}: </span><a className="text-primary underline underline-offset-4" href={`mailto:${t("contact_email_training_value")}`}>{t("contact_email_training_value")}</a></p>
                      <p><span className="font-black">{t("contact_lang_label")}: </span>{t("contact_lang_training_value")}</p>
                    </div>
                    <div className="grid gap-2">
                      <p className="text-sm font-black uppercase tracking-wide text-foreground/90">{t("contact_expect_title")}</p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{t("contact_expect_1")}</p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{t("contact_expect_2")}</p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{t("contact_expect_3")}</p>
                    </div>
                  </aside>
                  <div>
                    <ContactForm service="training" formIdPrefix="training" variant="training" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
