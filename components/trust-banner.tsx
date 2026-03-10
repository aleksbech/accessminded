"use client"

import { useLang } from "@/components/lang-provider"
import { ShieldCheck, FileCheck, Globe, RefreshCw } from "lucide-react"

const icons = [ShieldCheck, FileCheck, Globe, RefreshCw]
const keys = ["trust_1", "trust_2", "trust_3", "trust_4"] as const

export function TrustBanner() {
  const { t } = useLang()

  return (
    <section aria-label={t("trust_label")} className="w-full">
      <ul
        role="list"
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {keys.map((key, i) => {
          const Icon = icons[i]
          return (
            <li
              key={key}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
            >
              <Icon
                aria-hidden="true"
                className="size-5 shrink-0 text-primary"
              />
              <span className="text-sm font-medium leading-snug text-foreground">
                {t(key)}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
