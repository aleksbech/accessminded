"use client"

import { useLang } from "./lang-provider"
import { SiteHeader } from "./site-header"
import { GatewayHero } from "./gateway-hero"
import { HomepageTrainingPromo, BlogSection } from "./blog-section"
import { SiteFooter } from "./site-footer"

function SkipLink() {
    const { t } = useLang()
    return (
        <a className="skip-link" href="#content">
            {t("skip_to_content")}
        </a>
    )
}

export function PageContent() {
    const { t } = useLang()
    return (
        <>
            <SkipLink />
            <SiteHeader />
            <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
                <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
                    <div className="grid gap-10 md:gap-12">
                        <GatewayHero />
                        <HomepageTrainingPromo />
                        <BlogSection />
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    )
}
