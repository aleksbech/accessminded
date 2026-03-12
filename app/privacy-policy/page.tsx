"use client"

import { LangProvider, useLang } from "@/components/lang-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

function PrivacyPolicyContent() {
    const { t } = useLang()

    return (
        <>
            <SiteHeader />

            <main
                id="content"
                className="mx-auto max-w-[900px] px-4 py-16 md:px-6 lg:px-8"
            >
                <h1 className="mb-8 text-3xl font-bold">
                    {t("pp_title")}
                </h1>

                <p className="mb-4">
                    {t("pp_intro")}
                </p>

                <h2 className="mt-8 mb-3 text-xl font-semibold">
                    {t("pp_admin_title")}
                </h2>

                <p className="mb-4">
                    {t("pp_admin_text")}
                </p>

                <h2 className="mt-8 mb-3 text-xl font-semibold">
                    {t("pp_scope_title")}
                </h2>

                <p className="mb-4">
                    {t("pp_scope_text")}
                </p>

                <h2 className="mt-8 mb-3 text-xl font-semibold">
                    {t("pp_rights_title")}
                </h2>

                <p>
                    {t("pp_rights_text")}
                </p>
            </main>

            <SiteFooter />
        </>
    )
}

export default function PrivacyPolicyPage() {
    return (
        <LangProvider>
            <PrivacyPolicyContent />
        </LangProvider>
    )
}