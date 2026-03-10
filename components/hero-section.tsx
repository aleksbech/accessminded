"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useLang } from "./lang-provider"

export function HeroSection() {
  const { t } = useLang()

  const benefits = [
    t("hero_b1"),
    t("hero_b2"),
    t("hero_b3"),
    t("hero_b4"),
  ]

  return (
    <section
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border"
      aria-labelledby="hero-title"
    >
      <div className="relative grid min-h-[420px] grid-cols-1 lg:grid-cols-2">
        <div className="relative z-10 flex min-w-0 flex-col justify-center gap-6 p-6 sm:p-6 md:p-10 lg:py-14 lg:pl-12 lg:pr-8">
          <h1
            id="hero-title"
            className="text-balance text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            {t("hero_h1")}
          </h1>

          <p className="min-w-0 max-w-[56ch] text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
            {t("hero_lead")}
          </p>

          <ul className="min-w-0 grid gap-4" aria-label={t("hero_badge")}>
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-foreground/90"
              >
                <span
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.14]"
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-primary/45 bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105 sm:w-auto"
            >
              {t("hero_cta_primary")}
            </a>
            <a
              href="#process"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-primary/55 bg-transparent px-6 py-3.5 text-sm font-black text-primary transition-colors hover:bg-primary/10 sm:w-auto"
            >
              {t("hero_cta_secondary")}
            </a>
          </div>

          <p className="hidden text-xs text-muted-foreground/80 lg:mt-10 lg:block">
            {t("hero_hint")}
          </p>
        </div>

        <div className="relative flex flex-col items-center h-64 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
          <div className="relative h-full w-full overflow-hidden lg:rounded-none" aria-hidden="true">
            <Image
              src="/images/hero-wcag-audit.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />

            {/* desktop fade */}
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, var(--background) 0%, transparent 40%)",
              }}
            />

            {/* mobile fade at bottom */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
              }}
            />

            {/* mobile fade at top */}
            <div
              className="pointer-events-none absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, var(--background) 0%, transparent 40%)",
              }}
            />
          </div>

          <p className="mt-6 mb-6 px-5 text-center text-xs text-muted-foreground/80 lg:hidden">
            {t("hero_hint")}
          </p>
        </div>
      </div>
    </section>
  )
}