"use client"

import { useLang } from "./lang-provider"
import { SiteHeader } from "./site-header"
import { HeroSection } from "./hero-section"
import { ServicesSection } from "./services-section"
import { ProcessSection } from "./process-section"
import { AboutSection } from "./about-section"
import { FaqSection } from "./faq-section"
import { ContactSection } from "./contact-section"
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
                    <div className="grid gap-12 md:gap-16">
                        <HeroSection />
                        <ServicesSection />
                        <ProcessSection />
                        <AboutSection />
                        <FaqSection />
                        <ContactSection />
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    )
}
