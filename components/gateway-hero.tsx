"use client"

import { GraduationCap, ClipboardCheck } from "lucide-react"
import { useLang } from "./lang-provider"

export function GatewayHero() {
  const { t } = useLang()

  return (
    <section
      className="relative scroll-mt-24 grid items-stretch gap-8 md:grid-cols-2 md:gap-10"
      aria-labelledby="gateway-title"
    >
      <h1 id="gateway-title" className="sr-only">
        {t("hero_h1")}
      </h1>

      {/* Pillar A: Audits */}
      <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl group md:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(90,170,255,0.16) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
            WebkitMaskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-secondary/15 blur-3xl opacity-40 transition-opacity group-hover:opacity-60"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Icon only — no text badge */}
          <div className="mb-5">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/[0.10]"
              aria-hidden="true"
            >
              <ClipboardCheck className="h-6 w-6 text-secondary" strokeWidth={2} />
            </span>
          </div>

          {/* card-content grows to fill space */}
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h2 className="mb-1 text-balance text-[2rem] font-black leading-[1.08] tracking-[-0.02em] md:text-[2.35rem]">
                {t("home_audits_title")}
              </h2>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-secondary/70">
                Aleksandra Bech
              </p>
            </div>

            <p className="text-sm leading-7 text-muted-foreground md:text-[0.98rem]">
              {t("audits_intro")}
            </p>

            <p className="mt-auto flex items-center gap-2 text-xs italic text-muted-foreground pt-2">
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-black not-italic text-muted-foreground">PL</span>
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-black not-italic text-muted-foreground">EN</span>
              {t("audits_bilingual_note")}
            </p>
          </div>

          {/* card-actions always at bottom */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="/kontakt#contact-audits"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-secondary/45 bg-secondary px-6 py-3.5 text-sm font-black text-secondary-foreground transition-all hover:brightness-105"
            >
              {t("home_audits_cta")}
            </a>
            <a
              href="/audyty"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-secondary/40 bg-transparent px-6 py-3.5 text-sm font-semibold text-secondary/90 transition-colors hover:bg-secondary/10"
            >
              {t("home_audits_more")}
            </a>
          </div>
        </div>
      </article>

      {/* Pillar B: Training */}
      <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl group md:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(90,170,255,0.16) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
            WebkitMaskImage: "radial-gradient(circle at 35% 40%, rgba(0,0,0,1), rgba(0,0,0,0) 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl opacity-40 transition-opacity group-hover:opacity-60"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Icon only — no text badge */}
          <div className="mb-5">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
              aria-hidden="true"
            >
              <GraduationCap className="h-6 w-6 text-primary" strokeWidth={2} />
            </span>
          </div>

          {/* card-content grows to fill space */}
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h2 className="mb-1 text-balance text-[2rem] font-black leading-[1.08] tracking-[-0.02em] md:text-[2.35rem]">
                {t("home_training_title")}
              </h2>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-primary/70">
                Mentorino - Aleksandra Migus
              </p>
            </div>

            <p className="text-sm leading-7 text-muted-foreground md:text-[0.98rem]">
              {t("home_training_intro")}
            </p>

            <p className="mt-auto flex items-center gap-2 text-xs italic text-muted-foreground pt-2">
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-black not-italic text-muted-foreground">
                PL
              </span>
              {t("hp_training_lang_note")}
            </p>
          </div>

          {/* card-actions always at bottom */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="/szkolenia"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-primary/45 bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105"
            >
              {t("home_training_cta")}
            </a>
            <a
              href="/kontakt#contact-training"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl border border-primary/40 bg-transparent px-6 py-3.5 text-sm font-semibold text-primary/90 transition-colors hover:bg-primary/10"
            >
              {t("aleksandra_migus_cta")}
            </a>
          </div>
        </div>
      </article>
    </section>
  )
}
