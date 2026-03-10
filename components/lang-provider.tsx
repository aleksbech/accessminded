"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { type Lang, dict } from "@/lib/i18n"

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pl")

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    document.documentElement.lang = newLang
  }, [])

  const t = useCallback(
    (key: string) => dict[lang]?.[key] ?? key,
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) throw new Error("useLang must be used within LangProvider")
  return context
}
