import type { Metadata } from "next"
import { cookies } from "next/headers"
import { LangProvider } from "@/components/lang-provider"
import { BlogPageContent } from "@/components/blog-page-content"
import type { Lang } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Blog — Access Minded",
  description:
    "Artykuły o dostępności cyfrowej, WCAG 2.2, EAA i praktycznych wdrożeniach w zespołach produktowych.",
  openGraph: {
    title: "Blog — Access Minded",
    description:
      "Praktyczne treści o audytach dostępności, re-audytach i szkoleniach z WCAG.",
  },
}

export default async function BlogPage() {
  const cookieStore = await cookies()
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "pl"

  return (
    <LangProvider initialLang={lang}>
      <BlogPageContent />
    </LangProvider>
  )
}
