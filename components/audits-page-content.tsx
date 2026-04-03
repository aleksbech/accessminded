"use client"

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

export function AuditsPageContent() {
  const { t } = useLang()

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
          <div className="grid gap-12 md:gap-16">
            {/* Hero section */}
            <section className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-12" aria-labelledby="audits-hero-title">
              <h1
                id="audits-hero-title"
                className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-5xl"
              >
                {t("audits_page_title")}
              </h1>
              <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(14px,2vw,18px)] text-muted-foreground mb-3">
                {t("audits_intro")}
              </p>
              <p className="font-bold text-primary">{t("audits_bilingual_note")}</p>
            </section>

            <ServicesSection />

            {/* Process */}
            <div>
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
                className="inline-flex items-center justify-center rounded-2xl border border-primary/45 bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105"
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
