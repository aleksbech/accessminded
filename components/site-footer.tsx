"use client"

import { useLang } from "./lang-provider"

export function SiteFooter() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 py-10 md:flex-row md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <span className="text-sm text-muted-foreground">
            &copy; {year} {t("footer_copy")}
          </span>
        </div>
        <p className="text-center text-xs text-muted-foreground/70 md:text-right">
          {t("footer_a11y")}
        </p>
      </div>
    </footer>
  )
}
