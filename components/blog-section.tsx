"use client"

import { useLang } from "./lang-provider"

export function BlogSection() {
  const { t } = useLang()

  return (
    <section
      className="scroll-mt-24"
      aria-labelledby="homepage-blog-title"
    >
      <div className="rounded-3xl border border-border bg-surface p-8 shadow-lg md:p-12 text-center">
        <h2
          id="homepage-blog-title"
          className="mb-3 text-2xl font-black tracking-tight md:text-3xl"
        >
          {t("blog_title")}
        </h2>
        <p className="text-muted-foreground">
          {t("blog_coming_soon")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("blog_stay_tuned")}
        </p>
      </div>
    </section>
  )
}
