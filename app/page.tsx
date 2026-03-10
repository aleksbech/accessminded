"use client"

import { LangProvider, useLang } from "@/components/lang-provider"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { AboutSection } from "@/components/about-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#content">
      {t("skip_to_content")}
    </a>
  )
}

function PageContent() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="content" tabIndex={-1}>
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

export default function Home() {
  return (
    <LangProvider>
      <div id="top">
        <PageContent />
      </div>
    </LangProvider>
  )
}
