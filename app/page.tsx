import { cookies } from "next/headers"
import { LangProvider } from "@/components/lang-provider"
import { PageContent } from "@/components/page-content"
import type { Lang } from "@/lib/i18n"

export default async function Home() {
  const cookieStore = await cookies()
  const initialLang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "pl"

  return (
    <LangProvider initialLang={initialLang}>
      <div id="top" className="relative z-[1]">
        <PageContent />
      </div>
    </LangProvider>
  )
}
