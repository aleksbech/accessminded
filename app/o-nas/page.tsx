import type { Metadata } from "next"
import { cookies } from "next/headers"
import { LangProvider } from "@/components/lang-provider"
import { AboutPageContent } from "@/components/about-page-content"
import type { Lang } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "O nas — Access Minded",
  description: "Poznaj nasz zespół. Aleksandra Migus (szkolenia) i Aleksandra Bech (audyty) — dwie ekspertki dostępności cyfrowej.",
  openGraph: {
    title: "O nas — Access Minded",
    description: "Zespół specjalistek w dostępności cyfrowej: szkolenia i audyty.",
  },
}

export default async function AboutPage() {
  const cookieStore = await cookies()
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "pl"

  return (
    <LangProvider initialLang={lang}>
      <AboutPageContent />
    </LangProvider>
  )
}
