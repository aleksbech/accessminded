"use client"

import { useLang } from "./lang-provider"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { TrainingSection } from "./training-section"

function SkipLink() {
    const { t } = useLang()
    return (
        <a className="skip-link" href="#content">
            {t("skip_to_content")}
        </a>
    )
}

export function SzkoleniaContent() {
    const { t } = useLang()

    return (
        <>
            <SkipLink />
            <SiteHeader />
            <main id="content" tabIndex={-1} aria-label={t("skip_to_content")}>
                <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-8">
                    <TrainingSection />
                </div>
            </main>
            <SiteFooter />
        </>
    )
}
