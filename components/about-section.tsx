"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useLang } from "./lang-provider"

const POINTS = [
  { textKey: "about_point_1" },
  { textKey: "about_point_3" },
  { textKey: "about_point_4" },
  { textKey: "about_point_5" },
] as const

export function AboutSection() {
  const { t } = useLang()

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-surface shadow-lg"
      aria-labelledby="about-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
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

      <div className="relative grid gap-6 p-6 md:grid-cols-[1.25fr_0.65fr] md:items-stretch md:gap-10 md:p-10">
        <div className="flex h-full flex-col justify-between gap-4 md:min-h-[100%]">
          <div>
            <h2
              id="about-title"
              className="mb-3 text-xl font-black tracking-tight md:text-2xl"
            >
              {t("about_title")}
            </h2>
            <p className="leading-relaxed text-muted-foreground md:text-base">
              {t("about_body")}
            </p>
          </div>

          <div className="flex flex-col self-stretch rounded-2xl border border-border bg-card p-5 md:p-6">
            <h3 className="mb-4 text-lg font-black text-foreground">
              {t("about_points_title")}
            </h3>

            <ul className="grid gap-3">
              {POINTS.map((point) => (
                <li key={point.textKey} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/[0.14]"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                  </span>

                  <span>{t(point.textKey) && `${t(point.textKey)}`}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-primary/55 bg-transparent px-5 py-3 text-sm font-black text-primary transition-colors hover:bg-primary/10"
              >
                {t("about_cta_contact")}
              </a>
            </div>
          </div>
        </div >

        <div className="order-first md:order-none md:h-full">
          <div className="mx-auto h-full max-w-xs overflow-hidden rounded-2xl border-2 border-primary/55 md:mx-0 md:max-w-none">
            <Image
              src="/images/aleksandra-bech.jpg"
              alt="Aleksandra Bech — accessibility auditor"
              width={720}
              height={900}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div >
    </section >
  )
}
