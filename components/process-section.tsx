"use client"

import { useLang } from "./lang-provider"

const STEPS = [
  { titleKey: "step1_title", descKey: "step1_desc", icon: "1" },
  { titleKey: "step2_title", descKey: "step2_desc", icon: "2" },
  { titleKey: "step3_title", descKey: "step3_desc", icon: "3" },
  { titleKey: "step4_title", descKey: "step4_desc", icon: "4" },
] as const

function StepCard({
  icon,
  title,
  desc,
  showConnector = false,
}: {
  icon: string
  title: string
  desc: string
  showConnector?: boolean
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Ikona + strzałka w jednej linii */}
      <div className="relative mb-4 flex h-12 w-full items-center justify-center">
        <div
          className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[rgba(252,211,77,0.5)] bg-[rgba(252,211,77,0.12)] text-lg font-black text-foreground"
          aria-hidden="true"
        >
          {icon}
        </div>

        {showConnector && (
          <div
            className="absolute left-[calc(50%+24px)] right-[calc(-50%-16px)] top-1/2 hidden -translate-y-1/2 md:block"
            aria-hidden="true"
          >
            <div className="relative w-full">
              <div className="h-[2px] w-[calc(100%-12px)] bg-primary/70" />
              <span className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[12px] border-y-transparent border-l-primary/70" />
            </div>
          </div>
        )}

      </div>

      <h3 className="mb-2 text-sm font-black text-foreground md:text-base">
        {title}
      </h3>

      <p className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
    </div>
  )
}

export function ProcessSection() {
  const { t } = useLang()

  const steps = STEPS.map((step) => ({
    icon: step.icon,
    title: t(step.titleKey),
    desc: t(step.descKey),
  }))

  return (
    <section
      id="process"
      className="scroll-mt-24"
      aria-labelledby="process-title"
    >
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-10">
        <h2
          id="process-title"
          className="mb-2 text-xl font-black tracking-tight md:text-2xl"
        >
          {t("process_title")}
        </h2>

        <p className="mb-10 max-w-[100ch] text-muted-foreground">
          {t("process_sub")}
        </p>

        {/* Mobile layout */}
        <ol
          className="grid grid-cols-1 gap-8 md:hidden"
          aria-label={t("process_title")}
        >
          {steps.map((step) => (
            <li key={step.title}>
              <StepCard
                icon={step.icon}
                title={step.title}
                desc={step.desc}
              />
            </li>
          ))}
        </ol>

        {/* Desktop layout */}
        <ol
          className="hidden grid-cols-4 gap-10 md:grid"
          aria-label={t("process_title")}
        >
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <StepCard
                icon={step.icon}
                title={step.title}
                desc={step.desc}
                showConnector={index < steps.length - 1}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}