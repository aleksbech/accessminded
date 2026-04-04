"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useLang } from "./lang-provider"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#content">
      {t("skip_to_content")}
    </a>
  )
}

export function AboutPageContent() {
  const { t } = useLang()

  const beachPoints = [
    { textKey: "aleksandra_bech_point_1" },
    { textKey: "aleksandra_bech_point_2" },
    { textKey: "aleksandra_bech_point_3" },
    { textKey: "aleksandra_bech_point_4" },
  ]

  const migusPoints = [
    { textKey: "aleksandra_migus_point_1" },
    { textKey: "aleksandra_migus_point_2" },
    { textKey: "aleksandra_migus_point_3" },
    { textKey: "aleksandra_migus_point_4" },
  ]

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
          {/* Page header */}
          <section className="mb-14 py-6 text-center md:mb-20 md:py-10">
            <h1 className="mx-auto mb-5 max-w-4xl bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-5xl">
              {t("about_page_title")}
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-[1.6] text-muted-foreground md:text-xl">
              {t("about_page_intro")}
            </p>
          </section>

          {/* Two profiles grid */}
          <div className="grid gap-12 md:grid-cols-2 md:items-stretch">
            {/* Aleksandra Bech - Audits */}
            <section
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-lg"
              aria-labelledby="bech-title"
            >
              <div className="flex h-full flex-col gap-6 p-6 md:gap-6 md:p-10">
                {/* Image */}
                <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border-2 border-primary/55" style={{ aspectRatio: "3 / 4" }}>
                  <Image
                    src="/images/aleksandra-bech.jpg"
                    alt={t("aleksandra_bech_name")}
                    fill
                    className="team-photo object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <h2
                      id="bech-title"
                      className="text-2xl font-black tracking-tight"
                    >
                      {t("aleksandra_bech_name")}
                    </h2>
                    <p className="text-sm font-bold text-primary">
                      {t("aleksandra_bech_role")}
                    </p>
                  </div>

                  <p className="leading-relaxed text-muted-foreground md:min-h-[14rem]">
                    {t("aleksandra_bech_bio")}
                  </p>

                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="mb-4 text-lg font-black text-foreground">
                      {t("aleksandra_bech_points_title")}
                    </h3>
                    <ul className="grid gap-3">
                      {beachPoints.map((point) => (
                        <li key={point.textKey} className="flex items-start gap-2">
                          <span
                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/[0.14]"
                            aria-hidden="true"
                          >
                            <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                          </span>
                          <span>{t(point.textKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/kontakt#contact-audits"
                    className="mt-auto inline-flex w-full items-center justify-center rounded-2xl border border-primary/55 bg-transparent px-6 py-3.5 text-sm font-black text-primary transition-colors hover:bg-primary/10 sm:w-auto"
                  >
                    {t("hero_cta_primary")}
                  </a>
                </div>
              </div>
            </section>

            {/* Aleksandra Migus - Training */}
            <section
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-lg"
              aria-labelledby="migus-title"
            >
              <div className="flex h-full flex-col gap-6 p-6 md:gap-6 md:p-10">
                {/* Image */}
                <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border-2 border-secondary/55" style={{ aspectRatio: "3 / 4" }}>
                  <Image
                    src="/images/aleksandra-migus.jpg"
                    alt={t("aleksandra_migus_name")}
                    fill
                    className="team-photo object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <h2
                      id="migus-title"
                      className="text-2xl font-black tracking-tight"
                    >
                      {t("aleksandra_migus_name")}
                    </h2>
                    <p className="text-sm font-bold text-secondary">
                      {t("aleksandra_migus_role")}
                    </p>
                  </div>

                  <p className="leading-relaxed text-muted-foreground md:min-h-[14rem]">
                    {t("aleksandra_migus_bio")}
                  </p>

                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="mb-4 text-lg font-black text-foreground">
                      {t("aleksandra_migus_points_title")}
                    </h3>
                    <ul className="grid gap-3">
                      {migusPoints.map((point) => (
                        <li key={point.textKey} className="flex items-start gap-2">
                          <span
                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-secondary/[0.14]"
                            aria-hidden="true"
                          >
                            <Check className="h-3.5 w-3.5 text-secondary" strokeWidth={3} />
                          </span>
                          <span>{t(point.textKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/szkolenia"
                    className="mt-auto inline-flex w-full items-center justify-center rounded-2xl border border-secondary/55 bg-transparent px-6 py-3.5 text-sm font-black text-secondary transition-colors hover:bg-secondary/10 sm:w-auto"
                  >
                    {t("aleksandra_migus_cta")}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
