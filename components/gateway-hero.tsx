"use client"

import { GraduationCap, ClipboardCheck } from "lucide-react"
import { useLang } from "./lang-provider"

export function GatewayHero() {
  const { t } = useLang()

  return (
    <section
      className="relative scroll-mt-24 grid items-stretch gap-6 md:grid-cols-2"
      aria-labelledby="gateway-title"
    >
      <h1 id="gateway-title" className="sr-only">
        {t("hero_h1")}
      </h1>

      {/* Pillar A: Training */}
      <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-lg transition-all hover:shadow-xl group">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(rgba(46,230,166,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage:
              "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
            WebkitMaskImage:
              "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col gap-6">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/[0.10]"
              aria-hidden="true"
            >
              <GraduationCap className="h-6 w-6 text-secondary" strokeWidth={2} />
            </span>
            <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/[0.10] px-3 py-1 text-xs font-black text-secondary">
              {t("training_badge")}
            </span>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-black tracking-tight md:text-3xl leading-tight">
              {t("home_training_title")}
            </h2>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {t("home_training_intro")}
          </p>

          <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
            <a
              href="/szkolenia"
              className="inline-flex items-center justify-center rounded-2xl border border-primary/55 bg-transparent px-6 py-3.5 text-sm font-black text-primary transition-colors hover:bg-primary/10"
            >
              {t("home_training_cta")}
            </a>
          </div>
        </div>
      </article>

      {/* Pillar B: Audits */}
      <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-lg transition-all hover:shadow-xl group">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(rgba(46,230,166,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage:
              "radial-gradient(circle at 65% 60%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
            WebkitMaskImage:
              "radial-gradient(circle at 65% 60%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col gap-6">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
              aria-hidden="true"
            >
              <ClipboardCheck className="h-6 w-6 text-primary" strokeWidth={2} />
            </span>
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.10] px-3 py-1 text-xs font-black text-primary">
              {t("nav_audits")}
            </span>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-black tracking-tight md:text-3xl leading-tight">
              {t("audits_page_title")}
            </h2>
            <p className="text-lg font-semibold text-primary">
              Aleksandra Bech
            </p>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {t("audits_intro")}
          </p>

          <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
            <a
              href="/audyty"
              className="inline-flex items-center justify-center rounded-2xl border border-primary/55 bg-transparent px-6 py-3.5 text-sm font-black text-primary transition-colors hover:bg-primary/10"
            >
              {t("home_audits_more")}
            </a>
            <a
              href="/kontakt#contact-audits"
              className="inline-flex items-center justify-center rounded-2xl border border-primary/45 bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105"
            >
              {t("hero_cta_primary")}
            </a>
          </div>
        </div>
      </article>
    </section>
  )
}
