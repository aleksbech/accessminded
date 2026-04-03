"use client"

import { useState, useRef, useEffect } from "react"
import { X, CheckCircle2 } from "lucide-react"
import { useLang } from "./lang-provider"

interface TrainingFormData {
  name: string
  company: string
  participants: string
  message: string
  privacy: boolean
}

interface FormErrors {
  name?: string
  company?: string
  participants?: string
  message?: string
  privacy?: string
}

interface TrainingRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TrainingRequestModal({ isOpen, onClose }: TrainingRequestModalProps) {
  const { t } = useLang()
  const [formData, setFormData] = useState<TrainingFormData>({
    name: "",
    company: "",
    participants: "",
    message: "",
    privacy: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const validateForm = (): FormErrors => {
    const errs: FormErrors = {}
    
    if (!formData.name.trim()) errs.name = t("f_err_name")
    if (!formData.company.trim()) errs.company = "Uzupełnij nazwę firmy/organizacji."
    if (!formData.participants.trim()) errs.participants = t("form_err_participants")
    if (!formData.message.trim() || formData.message.trim().length < 20) 
      errs.message = t("f_err_msg")
    if (!formData.privacy) errs.privacy = t("f_err_priv")

    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errs = validateForm()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setSubmitted(false)
    setSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: "", // Will be handled in backend
          url: "",
          service: "training-inquiry",
          message: `Firma: ${formData.company}\nLiczba uczestników: ${formData.participants}\n\n${formData.message}`,
          privacy: formData.privacy,
        }),
      })

      if (!response.ok) {
        setErrors({ message: t("f_err_send") })
        return
      }

      setSubmitted(true)
      setFormData({ name: "", company: "", participants: "", message: "", privacy: false })
      requestAnimationFrame(() => statusRef.current?.focus())

      setTimeout(() => {
        onClose()
        setSubmitted(false)
      }, 3000)
    } catch {
      setErrors({ message: t("f_err_connection") })
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
      />

      {/* Modal */}
      <dialog
        open
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        aria-labelledby="training-modal-title"
      >
        <div className="relative w-full max-w-md rounded-3xl border border-border bg-background shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors hover:bg-foreground/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="p-8">
            <h2
              id="training-modal-title"
              className="mb-4 text-2xl font-black tracking-tight"
            >
              {t("training_form_title")}
            </h2>

            <div
              ref={statusRef}
              aria-live="polite"
              role="status"
              tabIndex={-1}
              className="mb-6"
            >
              {submitted && (
                <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-primary">
                    {t("form_success")}
                  </p>
                </div>
              )}
            </div>

            {!submitted && (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="training-name" className="text-sm font-black text-foreground block mb-2">
                    {t("form_name_label")}
                  </label>
                  <input
                    id="training-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border-2 border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60"
                    placeholder={t("f_name_ph")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "error-name" : undefined}
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1 text-xs font-bold text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="training-company" className="text-sm font-black text-foreground block mb-2">
                    {t("form_company_label")}
                  </label>
                  <input
                    id="training-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border-2 border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60"
                    placeholder="np. Acme Corp"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? "error-company" : undefined}
                  />
                  {errors.company && (
                    <p id="error-company" className="mt-1 text-xs font-bold text-destructive">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Participants */}
                <div>
                  <label htmlFor="training-participants" className="text-sm font-black text-foreground block mb-2">
                    {t("form_participants_label")}
                  </label>
                  <input
                    id="training-participants"
                    type="text"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    className="w-full rounded-lg border-2 border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60"
                    placeholder={t("form_participants_ph")}
                    aria-invalid={!!errors.participants}
                    aria-describedby={errors.participants ? "error-participants" : undefined}
                  />
                  {errors.participants && (
                    <p id="error-participants" className="mt-1 text-xs font-bold text-destructive">
                      {errors.participants}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="training-message" className="text-sm font-black text-foreground block mb-2">
                    {t("form_message_label")}
                  </label>
                  <textarea
                    id="training-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border-2 border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none"
                    placeholder={t("f_msg_ph")}
                    rows={4}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "error-message" : undefined}
                  />
                  {errors.message && (
                    <p id="error-message" className="mt-1 text-xs font-bold text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Privacy */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="mt-1"
                    aria-invalid={!!errors.privacy}
                    aria-describedby={errors.privacy ? "error-privacy" : undefined}
                  />
                  <span className="text-xs font-bold text-muted-foreground">
                    {t("f_priv_label")}
                  </span>
                </label>
                {errors.privacy && (
                  <p id="error-privacy" className="text-xs font-bold text-destructive">
                    {errors.privacy}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 w-full rounded-2xl border border-secondary/45 bg-secondary px-4 py-3 text-sm font-black text-secondary-foreground transition-all hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? t("form_submitting") : t("form_submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
