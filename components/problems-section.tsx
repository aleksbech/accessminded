"use client"

import { AlertCircle, Users, Heart } from "lucide-react"
import { useLang } from "./lang-provider"

export function ProblemsSection() {
  const { t } = useLang()

  const problems = [
    {
      icon: AlertCircle,
      titleKey: "problem_1_title",
      descKey: "problem_1_desc",
    },
    {
      icon: Users,
      titleKey: "problem_2_title",
      descKey: "problem_2_desc",
    },
    {
      icon: Heart,
      titleKey: "problem_3_title",
      descKey: "problem_3_desc",
    },
  ]

  return (
    <section
      className="scroll-mt-24 rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-10"
      aria-labelledby="problems-title"
    >
      <h2
        id="problems-title"
        className="mb-8 text-2xl font-black tracking-tight md:text-3xl"
      >
        {t("problems_title")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {problems.map(({ icon: Icon, titleKey, descKey }) => (
          <article
            key={titleKey}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-destructive/25 bg-destructive/[0.10]"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5 text-destructive" strokeWidth={2} />
              </span>
              <h3 className="text-lg font-black text-foreground">
                {t(titleKey)}
              </h3>
            </div>
            <p className="leading-relaxed text-muted-foreground text-sm">
              {t(descKey)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
