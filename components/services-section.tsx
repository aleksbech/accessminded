"use client"

import { ClipboardCheck, RefreshCw, Check } from "lucide-react"
import { useLang } from "./lang-provider"

export function ServicesSection() {
  const { t } = useLang()

  const auditItems = [
    t("svc_audit_1"),
    t("svc_audit_2"),
    t("svc_audit_3"),
    t("svc_audit_4"),
  ]

  const reauditItems = [
    t("svc_reaudit_1"),
    t("svc_reaudit_2"),
    t("svc_reaudit_3"),
    t("svc_reaudit_4"),
  ]

  return (
    <section
      id="services"
      className="scroll-mt-24"
      aria-labelledby="services-title"
    >
      <div className="rounded-3xl border border-border bg-background p-6 shadow-lg md:p-10">
        <h2
          id="services-title"
          className="mb-2 text-xl font-black tracking-tight md:text-2xl"
        >
          {t("services_title")}
        </h2>
        <p className="mb-8 text-muted-foreground">{t("services_sub")}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Audit card */}
          <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/[0.10]"
                aria-hidden="true"
              >
                <ClipboardCheck className="h-5 w-5 text-secondary" strokeWidth={2} />
              </span>
              <h3 className="text-lg font-black text-foreground">
                {t("svc_audit_title")}
              </h3>
            </div>
            <ul className="grid gap-2.5">
              {auditItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Re-audit card */}
          <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/[0.10]"
                aria-hidden="true"
              >
                <RefreshCw className="h-5 w-5 text-secondary" strokeWidth={2} />
              </span>
              <h3 className="text-lg font-black text-foreground">
                {t("svc_reaudit_title")}
              </h3>
            </div>
            <ul className="grid gap-2.5">
              {reauditItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
