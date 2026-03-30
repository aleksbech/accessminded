"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLang } from "./lang-provider"

const FAQ_ITEMS = [
  { qKey: "faq_q1", aKey: "faq_a1" },
  { qKey: "faq_q2", aKey: "faq_a2" },
  { qKey: "faq_q3", aKey: "faq_a3" },
  { qKey: "faq_q4", aKey: "faq_a4" },
] as const

export function FaqSection() {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="scroll-mt-24"
      aria-labelledby="faq-title"
    >
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-10">
        <h2
          id="faq-title"
          className="mb-6 text-xl font-black tracking-tight md:text-2xl"
        >
          {t("faq_title")}
        </h2>

        <div className="grid gap-3" role="list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const triggerId = `faq-trigger-${index}`

            return (
              <div
                key={item.qKey}
                className="rounded-xl border border-border bg-card"
                role="listitem"
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    className="faq-trigger flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black text-foreground transition-shadow"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{t(item.qKey)}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-4 pb-4 pt-4"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(item.aKey)}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
