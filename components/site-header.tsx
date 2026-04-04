"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLang } from "./lang-provider"

const NAV_ITEMS = [
  { key: "nav_home", href: "/" },
  { key: "nav_about_page", href: "/o-nas" },
  { key: "nav_training", href: "/szkolenia" },
  { key: "nav_audits", href: "/audyty" },
  { key: "nav_blog", href: "/blog" },
  { key: "nav_contact_page", href: "/kontakt" },
] as const

export function SiteHeader() {
  const { lang, setLang, t } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeMobile()
        return
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement

        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKey)

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()

    return () => document.removeEventListener("keydown", onKey)
  }, [mobileOpen, closeMobile])

  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(11,18,32,0.88)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-4 py-4 md:gap-4 md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-8">
        <a
          href="/"
          className="flex min-w-0 shrink items-center rounded-2xl px-1 py-2 sm:px-3 lg:justify-self-start"
          aria-label="Access Minded — home"
        >
          <Image
            src="/images/accessminded-logo.svg"
            alt="Access Minded logo"
            width={200}
            height={50}
            priority
            className="h-10 w-auto brightness-110 contrast-125 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:h-14 md:h-16"
          />
        </a>

        <nav className="hidden lg:block lg:justify-self-center" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  data-text={t(item.key)}
                  className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-bold text-foreground transition-colors hover:border-border hover:bg-foreground/[0.03]"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3 lg:justify-self-end">
          <div
            role="group"
            className="inline-flex items-center gap-1 rounded-xl border border-border bg-foreground/[0.02] p-1"
            aria-label={lang === "pl" ? "Wybor jezyka" : "Language selector"}
          >
            <button
              type="button"
              aria-pressed={lang === "pl"}
              onClick={() => setLang("pl")}
              className={`lang-switcher-button rounded-lg px-3 py-2 text-xs font-black text-foreground transition-colors ${lang === "pl"
                ? "border border-primary/35 bg-primary/[0.14]"
                : "border border-transparent"
                }`}
            >
              PL
            </button>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
              className={`lang-switcher-button rounded-lg px-3 py-2 text-xs font-black text-foreground transition-colors ${lang === "en"
                ? "border border-primary/35 bg-primary/[0.14]"
                : "border border-transparent"
                }`}
            >
              EN
            </button>
          </div>

          <a
            href="/kontakt"
            className="hidden min-w-[10.5rem] justify-center rounded-2xl border border-primary/45 bg-primary px-4 py-2.5 text-sm font-black text-primary-foreground transition-all hover:brightness-105 sm:inline-flex"
          >
            {t("cta_nav")}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-foreground/[0.02] p-3 text-foreground lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-border lg:hidden"
          style={{
            background: "rgba(11,18,32,0.96)",
            backdropFilter: "blur(12px)",
          }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="grid gap-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  data-text={t(item.key)}
                  onClick={closeMobile}
                  className="flex rounded-xl border border-transparent px-4 py-3 text-base font-black text-foreground transition-colors hover:border-border hover:bg-foreground/[0.03]"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/kontakt"
                onClick={closeMobile}
                className="mt-2 flex items-center justify-center rounded-2xl border border-primary/45 bg-primary px-4 py-3 text-sm font-black text-primary-foreground sm:hidden"
              >
                {t("cta_nav")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
