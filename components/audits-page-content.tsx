"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useLang } from "./lang-provider"
import { SiteHeader } from "./site-header"
import { ServicesSection } from "./services-section"
import { ProcessSection } from "./process-section"
import { FaqSection } from "./faq-section"
import { SiteFooter } from "./site-footer"

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#content">
      {t("skip_to_content")}
    </a>
  )
}

const HERO_BULLETS = [
  "hero_b1",
  "hero_b2",
  "hero_b3",
  "hero_b4",
] as const

export function AuditsPageContent() {
  const { t } = useLang()

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
          <div className="grid gap-12 md:gap-16">

            {/* Hero section — two-column blended */}
            <section
              className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border"
              aria-labelledby="audits-hero-title"
            >
              <div className="relative grid min-h-[420px] grid-cols-1 lg:grid-cols-2">
                {/* Left: text */}
                <div className="relative z-10 flex min-w-0 flex-col justify-center gap-6 p-6 sm:p-6 md:p-10 lg:py-14 lg:pl-12 lg:pr-8">
                  <h1
                    id="audits-hero-title"
                    className="text-balance text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
                  >
                    {t("audits_page_title")}
                  </h1>

                  <p className="min-w-0 max-w-[56ch] text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                    {t("audits_intro")}
                  </p>

                  <ul className="min-w-0 grid gap-4" aria-label={t("audits_page_title")}>
                    {HERO_BULLETS.map((key) => (
                      <li key={key} className="flex items-start gap-3 text-foreground/90">
                        <span
                          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/[0.14]"
                          aria-hidden="true"
                        >
                          <Check className="h-3.5 w-3.5 text-secondary" strokeWidth={3} />
                        </span>
                        <span className="text-sm md:text-base">{t(key)}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm font-bold text-secondary">{t("audits_bilingual_note")}</p>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                    <a
                      href="/kontakt#contact-audits"
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-secondary/45 bg-secondary px-6 py-3.5 text-sm font-black text-secondary-foreground transition-all hover:brightness-105 sm:w-auto"
                    >
                      {t("hero_cta_primary")}
                    </a>
                    <a
                      href="#process"
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-secondary/55 bg-transparent px-6 py-3.5 text-sm font-black text-secondary transition-colors hover:bg-secondary/10 sm:w-auto"
                    >
                      {t("hero_cta_secondary")}
                    </a>
                  </div>
                </div>

                {/* Right: blended illustration */}
                <div className="relative flex flex-col items-center h-64 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
                  <div className="relative h-full w-full overflow-hidden lg:rounded-none" aria-hidden="true">
                    <Image
                      src="/images/hero-wcag-audit.jpg"
                      alt=""
                      fill
                      priority
                      className="object-cover"
                      style={{ filter: "hue-rotate(28deg) saturate(1.08)" }}
                      sizes="(max-width: 1023px) 100vw, 50vw"
                    />
                    {/* desktop fade left */}
                    <div
                      className="pointer-events-none absolute inset-0 hidden lg:block"
                      style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 40%)" }}
                    />
                    {/* mobile fade bottom */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:hidden"
                      style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
                    />
                    {/* mobile fade top */}
                    <div
                      className="pointer-events-none absolute inset-0 lg:hidden"
                      style={{ background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%)" }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <ServicesSection />

            {/* Process */}
            <div id="process">
              <ProcessSection />
            </div>

            {/* FAQ */}
            <div>
              <FaqSection />
            </div>

            {/* CTA section */}
            <section
              className="rounded-3xl border border-border bg-surface p-8 shadow-lg md:p-12 text-center"
              aria-labelledby="audits-cta"
            >
              <h2 id="audits-cta" className="mb-4 text-2xl font-black md:text-3xl">
                {t("audits_contact_lead")}
              </h2>
              <a
                href="/kontakt#contact-audits"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-secondary/45 bg-secondary px-6 py-3.5 text-sm font-black text-secondary-foreground transition-all hover:brightness-105 sm:w-auto"
              >
                {t("hero_cta_primary")}
              </a>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
