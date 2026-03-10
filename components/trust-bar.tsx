"use client"

import { ShieldCheck, FileCheck, Languages, Handshake } from "lucide-react"
import { useLang } from "./lang-provider"

const TRUST_ITEMS = [
  { iconKey: "shield", labelKey: "trust_1" },
  { iconKey: "file", labelKey: "trust_2" },
  { iconKey: "lang", labelKey: "trust_3" },
  { iconKey: "hand", labelKey: "trust_4" },
] as const

const ICONS = {
  shield: ShieldCheck,
  file: FileCheck,
  lang: Languages,
  hand: Handshake,
} as const

export function TrustBar() {
  const { t } = useLang()

  return (
    <section aria-label={t("trust_label")} className="scroll-mt-24">
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {TRUST_ITEMS.map((item) => {
          const Icon = ICONS[item.iconKey]
          return (
            <li
              key={item.labelKey}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-6 text-center"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </span>
              <span className="text-sm font-bold leading-snug text-foreground">
                {t(item.labelKey)}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
