"use client"

import { useLang } from "./lang-provider"

export function TrustSection() {
  const { t } = useLang()

  const stats = [
    { key: "stats_audits", value: "50+" },
    { key: "stats_trained", value: "1000+" },
    { key: "stats_compliance", value: "100%" },
  ]

  return (
    <section
      className="scroll-mt-24 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-8 shadow-lg md:p-12"
      aria-labelledby="trust-title"
    >
      <h2
        id="trust-title"
        className="mb-2 text-center text-2xl font-black tracking-tight md:text-3xl"
      >
        {t("stats_title")}
      </h2>
      <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
        {t("about_page_intro")}
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {stats.map(({ key, value }) => (
          <div key={key} className="text-center">
            <p className="mb-2 text-5xl font-black text-primary">
              {value}
            </p>
            <p className="text-lg font-bold text-foreground">
              {t(key)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
