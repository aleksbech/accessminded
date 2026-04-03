import type { Metadata } from "next"
import { cookies } from "next/headers"
import { LangProvider } from "@/components/lang-provider"
import { ContactPageContent } from "@/components/contact-page-content"
import type { Lang } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Kontakt — Access Minded",
  description: "Skontaktuj się z nami. Szkolenia z Aleksandrą Migus, audyty z Aleksandrą Bech.",
  openGraph: {
    title: "Kontakt — Access Minded",
    description: "Zapraszamy do kontaktu w sprawie szkoleń lub audytów.",
  },
}

export default async function ContactPage() {
  const cookieStore = await cookies()
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "pl"

  return (
    <LangProvider initialLang={lang}>
      <ContactPageContent />
    </LangProvider>
  )
}
