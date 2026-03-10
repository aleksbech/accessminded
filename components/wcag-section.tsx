"use client"

import { useLang } from "./lang-provider"

export function WcagSection() {
  const { t } = useLang()

  return (
    <section
      id="wcag"
      className="scroll-mt-24"
      aria-labelledby="wcag-title"
    >
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-10">
        <h2
          id="wcag-title"
          className="mb-3 text-xl font-black tracking-tight md:text-2xl"
        >
          {t("wcag_title")}
        </h2>
        <p className="mb-6 max-w-[72ch] leading-relaxed text-muted-foreground">
          {t("wcag_body")}
        </p>

        <div
          className="rounded-2xl border border-secondary/25 bg-secondary/[0.08] p-5"
          role="note"
        >
          <p className="text-sm font-bold text-foreground">
            {t("wcag_callout")}
          </p>
        </div>
      </div>
    </section>
  )
}
