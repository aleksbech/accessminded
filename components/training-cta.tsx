"use client"

import Link from "next/link"
import { GraduationCap, ArrowRight } from "lucide-react"
import { useLang } from "./lang-provider"

export function TrainingCta() {
    const { t } = useLang()

    return (
        <section aria-labelledby="training-cta-title">
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg md:p-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.10]"
                            aria-hidden="true"
                        >
                            <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                        </span>
                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.10] px-3 py-1 text-[10px] font-black uppercase text-primary">
                            {t("training_badge")}
                        </span>
                    </div>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2
                            id="training-cta-title"
                            className="text-lg font-black tracking-tight md:text-xl"
                        >
                            {t("training_title")}
                            <br />
                            <span className="text-primary">{t("training_cta_line2")}</span>
                        </h2>
                        <Link
                            href="/szkolenia"
                            className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-primary/55 bg-transparent px-5 py-3 text-sm font-black text-primary transition-colors hover:bg-primary/10"
                        >
                            {t("training_cta")}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
