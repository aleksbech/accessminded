import type { Metadata } from "next"
import { cookies } from "next/headers"
import { LangProvider } from "@/components/lang-provider"
import { AuditsPageContent } from "@/components/audits-page-content"
import type { Lang } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Audyty WCAG 2.2 — Access Minded",
  description: "Profesjonalne audyty dostępności stron i aplikacji. WCAG 2.2, EAA compliance, raport z priorytetami.",
  openGraph: {
    title: "Audyty WCAG 2.2 — Access Minded",
    description: "Audyty dostępności stron i aplikacji z priorytetami i rekomendacjami.",
  },
}

export default async function AuditsPage() {
  const cookieStore = await cookies()
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "pl"

  return (
    <LangProvider initialLang={lang}>
      <AuditsPageContent />
    </LangProvider>
  )
}
