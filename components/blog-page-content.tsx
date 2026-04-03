"use client"

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

export function BlogPageContent() {
  const { t } = useLang()

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
          <section className="rounded-3xl border border-border bg-surface p-10 text-center shadow-lg md:p-14" aria-labelledby="blog-coming-title">
            <h1 id="blog-coming-title" className="text-3xl font-black tracking-tight md:text-4xl">
              {t("blog_coming_soon")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("blog_stay_tuned")}
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
