import type { Metadata } from "next"
import { cookies } from "next/headers"
import { LangProvider } from "@/components/lang-provider"
import { SzkoleniaContent } from "@/components/szkolenia-content"
import type { Lang } from "@/lib/i18n"

export const metadata: Metadata = {
    title: "Internet bez barier — Szkolenie z dostępności cyfrowej — Access Minded",
    description:
        "Intensywne szkolenie z dostępności cyfrowej. Teoria, praktyka, empatia i AI. Niezależnie od Twojej roli — to szkolenie jest dla Ciebie. Zapisy wkrótce.",
    openGraph: {
        title: "Internet bez barier — Szkolenie z dostępności cyfrowej",
        description:
            "Intensywne szkolenie z dostępności cyfrowej. Teoria, praktyka, empatia i AI. Zapisy wkrótce.",
    },
}

export default async function SzkoleniaPage() {
    const cookieStore = await cookies()
    const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "pl"

    return (
        <LangProvider initialLang={lang}>
            <SzkoleniaContent />
        </LangProvider>
    )
}
