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
            backgroundImage: "radial-gradient(rgba(46,230,166,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
            WebkitMaskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Icon only — no text badge */}
          <div className="mb-6">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/[0.10]"
              aria-hidden="true"
            >
              <GraduationCap className="h-6 w-6 text-secondary" strokeWidth={2} />
            </span>
          </div>

          {/* card-content grows to fill space */}
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h2 className="mb-1 text-2xl font-black leading-tight tracking-tight md:text-3xl">
                {t("home_training_title")}
              </h2>
              <p className="text-sm font-semibold tracking-tight text-primary/80">
                Mentorino — Aleksandra Migus
              </p>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              {t("home_training_intro")}
            </p>

            <p className="mt-auto flex items-center gap-2 text-xs italic text-muted-foreground/70 pt-2">
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-black not-italic text-muted-foreground">
                PL
              </span>
              {t("hp_training_lang_note")}
            </p>
          </div>

          {/* card-actions always at bottom */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="/szkolenia"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-primary/55 bg-transparent px-6 py-3.5 text-sm font-black text-primary transition-colors hover:bg-primary/10"
            >
              {t("home_training_cta")}
            </a>
            {/* empty slot — reserved for future second button */}
            <span aria-hidden="true" className="hidden sm:block" />
          </div>
        </div>
      </article>

      {/* Pillar B: Audits */}
      <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-lg transition-all hover:shadow-xl group">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(46,230,166,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 65% 60%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
            WebkitMaskImage: "radial-gradient(circle at 65% 60%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Icon only — no text badge */}
          <div className="mb-6">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
              aria-hidden="true"
            >
              <ClipboardCheck className="h-6 w-6 text-primary" strokeWidth={2} />
            </span>
          </div>

          {/* card-content grows to fill space */}
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h2 className="mb-1 text-2xl font-black leading-tight tracking-tight md:text-3xl">
                {t("home_audits_title")}
              </h2>
              <p className="text-sm font-semibold tracking-tight text-primary/80">
                Aleksandra Bech
              </p>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              {t("audits_intro")}
            </p>

            <p className="mt-auto flex items-center gap-2 text-xs italic text-muted-foreground/70 pt-2">
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-black not-italic text-muted-foreground">PL</span>
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-black not-italic text-muted-foreground">EN</span>
              {t("audits_bilingual_note")}
            </p>
          </div>

          {/* card-actions always at bottom */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="/audyty"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-primary/55 bg-transparent px-6 py-3.5 text-sm font-black text-primary transition-colors hover:bg-primary/10"
            >
              {t("home_audits_more")}
            </a>
            <a
              href="/kontakt#contact-audits"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-primary/45 bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105"
            >
              {t("home_audits_cta")}
            </a>
          </div>
        </div>
      </article>
    </section>
  )
}
