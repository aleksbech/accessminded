"use client"

import { useState, useRef, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { useLang } from "./lang-provider"
import Link from "next/link"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface FormErrors {
  name?: string
  email?: string
  message?: string
  privacy?: string
}

export function ContactSection() {
  const { t } = useLang()
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [service, setService] = useState<string>("audit")
  const [mounted, setMounted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  function validate(form: FormData): FormErrors {
    const errs: FormErrors = {}
    const name = (form.get("name") as string)?.trim()
    const email = (form.get("email") as string)?.trim()
    const message = (form.get("message") as string)?.trim()
    const privacy = form.get("privacy")

    if (!name) errs.name = t("f_err_name")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = t("f_err_email")
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

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      url: String(formData.get("url") || ""),
      service: String(formData.get("service") || service),
      message: String(formData.get("message") || ""),
      privacy: Boolean(formData.get("privacy")),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrors({
          message: result.error || t("f_err_send"),
        })
        return
      }

      setSubmitted(true)
      formRef.current?.reset()
      setService("audit")
      requestAnimationFrame(() => statusRef.current?.focus())
    } catch (error) {
      console.error("FORM SUBMIT ERROR:", error)
      setErrors({
        message: t("f_err_connection"),
      })
    } finally {
      setSubmitting(false)
    }
  }
  const expectations = [
    t("contact_expect_1"),
    t("contact_expect_2"),
    t("contact_expect_3"),
  ]

  return (
    <section
      id="contact"
      className="scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-lg">
        <div className="items-start grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10">
          {/* Left info panel */}
          <div className="flex flex-col gap-6">
            <div>
              <h2
                id="contact-title"
                className="mb-3 text-xl font-black tracking-tight md:text-2xl"
              >
                {t("contact_title")}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {t("contact_body")}
              </p>
            </div>

            {/* Contact details (no card) */}
            <div className="mt-2 text-sm">
              <div className="space-y-2">
                <p className="text-foreground">
                  <span className="font-bold">{t("contact_name_label")}: </span>
                  <span className="text-muted-foreground">{t("contact_name_value")}</span>
                </p>
                <p className="text-foreground">
                  <span className="font-bold">{t("contact_email_label")}: </span>
                  <a
                    href="mailto:hello@accessminded.com"
                    className="inline-flex items-center rounded-none px-1 py-0.5 leading-none text-primary underline underline-offset-4"
                    style={{ borderRadius: "6px" }}
                  >
                    {t("contact_email_value")}
                  </a>
                </p>
                <p className="text-foreground">
                  <span className="font-bold">{t("contact_lang_label")}: </span>
                  <span className="text-muted-foreground">{t("contact_lang_value")}</span>
                </p>
              </div>
            </div>

            {/* What to expect (moved to the left column) */}
            <div className="mt-2">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
                {t("contact_expect_title")}
              </p>
              <ul className="grid gap-2">
                {expectations.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right side: form */}
          <div className="flex h-full flex-col gap-6 md:border-l md:border-border md:pl-10">
            <div className="p-0 md:pt-1">
              <div
                ref={statusRef}
                aria-live="polite"
                role="status"
                tabIndex={-1}
                className="mb-4 text-sm focus:outline-none"
              >
                {submitted && (
                  <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-bold text-primary">
                    {t("f_success")}
                  </p>
                )}
              </div>

              <form
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                className="grid gap-4"
              >
                {/* Name */}
                <div className="grid gap-1.5">
                  <label htmlFor="name" className="text-sm font-black text-foreground">
                    {t("f_name_label")} <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    placeholder={t("f_name_ph")}
                    aria-describedby={errors.name ? "errName" : undefined}
                    aria-invalid={!!errors.name}
                    className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
                  />
                  {errors.name && (
                    <p id="errName" role="alert" className="text-xs font-bold text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-1.5">
                  <label htmlFor="email" className="text-sm font-black text-foreground">
                    {t("f_email_label")} <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    placeholder={t("f_email_ph")}
                    aria-describedby={errors.email ? "errEmail" : undefined}
                    aria-invalid={!!errors.email}
                    className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
                  />
                  {errors.email && (
                    <p id="errEmail" role="alert" className="text-xs font-bold text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* URL */}
                <div className="grid gap-1.5">
                  <label htmlFor="url" className="text-sm font-black text-foreground">
                    {t("f_url_label")}
                  </label>
                  <input
                    id="url"
                    name="url"
                    type="url"
                    autoComplete="url"
                    aria-describedby="urlHint"
                    placeholder={t("f_url_ph")}
                    className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow"
                  />
                  <p id="urlHint" className="text-xs text-muted-foreground">
                    {t("f_url_hint")}
                  </p>
                </div>

                {/* Service — suppressHydrationWarning avoids Radix Select's random aria-controls ID mismatch */}
                <div className="grid gap-1.5" suppressHydrationWarning>
                  <label htmlFor="service" className="text-sm font-black text-foreground">
                    {t("f_service_label")}
                  </label>
                  {/* Hidden input so the value is included in FormData */}
                  <input type="hidden" name="service" value={service} />

                  {mounted ? (
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger
                        id="service"
                        aria-describedby="serviceHint"
                        className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 pr-10 text-sm text-foreground transition-shadow"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="rounded-xl border-2 border-border bg-popover text-popover-foreground shadow-xl"
                        sideOffset={8}
                      >
                        <SelectItem value="audit">{t("f_service_audit")}</SelectItem>
                        <SelectItem value="reaudit">{t("f_service_reaudit")}</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div
                      className="flex min-h-12 w-full items-center rounded-xl border-2 border-border bg-input px-4 py-3 pr-10 text-sm text-foreground"
                      aria-hidden="true"
                    >
                      {t("f_service_audit")}
                    </div>
                  )}
                  <p id="serviceHint" className="text-xs text-muted-foreground">
                    {t("f_service_hint")}
                  </p>
                </div>

                {/* Message */}
                <div className="grid gap-1.5">
                  <label htmlFor="message" className="text-sm font-black text-foreground">
                    {t("f_msg_label")} <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    placeholder={t("f_msg_ph")}
                    aria-describedby={errors.message ? "errMsg" : undefined}
                    aria-invalid={!!errors.message}
                    rows={5}
                    className="w-full rounded-xl border-2 border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow resize-none"
                  />
                  {errors.message && (
                    <p id="errMsg" role="alert" className="text-xs font-bold text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-3">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    aria-required="true"
                    aria-describedby={errors.privacy ? "privacyHint errPriv" : "privacyHint"}
                    aria-invalid={!!errors.privacy}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded accent-primary transition-shadow"
                  />

                  <div className="grid gap-1">
                    <label htmlFor="privacy" className="text-sm font-bold text-foreground">
                      {t("f_priv_label")} <span className="text-primary" aria-hidden="true">*</span>
                    </label>

                    <p id="privacyHint" className="text-xs leading-relaxed text-muted-foreground">
                      <Link
                        href="/privacy-policy"
                        className="inline-flex items-center self-start whitespace-nowrap px-2 py-0.5 text-xs leading-none text-primary underline underline-offset-4"
                        style={{ borderRadius: "8px", width: "fit-content" }}
                      >
                        {t("f_priv_link")}
                      </Link>
                    </p>

                    {errors.privacy && (
                      <p id="errPriv" role="alert" className="text-xs font-bold text-destructive">
                        {errors.privacy}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  aria-disabled={submitting}
                  className="inline-flex items-center justify-center rounded-2xl border border-primary/45 bg-primary px-5 py-3.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? t("f_submitting") : t("f_submit")}
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
