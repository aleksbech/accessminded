import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const routes = ["/", "/audyty", "/kontakt", "/o-nas", "/szkolenia"] as const

for (const route of routes) {
  test(`a11y smoke: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" })

    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("h1").first()).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze()

    expect(results.violations, formatViolations(results.violations)).toEqual([])
  })
}

function formatViolations(
  violations: Array<{
    id: string
    help: string
    nodes: Array<{ target: string[] }>
  }>,
) {
  if (violations.length === 0) {
    return ""
  }

  return violations
    .map((v) => {
      const targets = v.nodes
        .slice(0, 4)
        .map((n) => n.target.join(" "))
        .join(" | ")
      return `${v.id}: ${v.help} -> ${targets}`
    })
    .join("\n")
}
