#!/usr/bin/env -S node --experimental-strip-types
/**
 * profile/build.ts
 *
 * Single source-of-truth pipeline for github.com/howdoiusekeyboard's profile README.
 *
 * Pipeline:
 *   1. Load profile/data.yaml with Zod schema validation
 *   2. Ping live demos in parallel (HEAD, 5s timeout)
 *   3. Render profile/template.md with substituted fields
 *   4. Write README.md
 *   5. Print a build report
 *
 * Run locally: tsx profile/build.ts
 * Run in CI:   .github/workflows/build-profile.yml (nightly @ 03:00 UTC + on push)
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

const SCRIPT_DIR = (() => {
  try {
    return dirname(fileURLToPath(import.meta.url));
  } catch {
    return process.cwd();
  }
})();
const PROJECT_ROOT = resolve(SCRIPT_DIR, "..");

// ─── Schemas ─────────────────────────────────────────────────────────────────

const ShippingItem = z.object({
  name: z.string(),
  version: z.string().optional().default(""),
  url: z.string().url(),
});

const Demo = z.object({
  name: z.string(),
  url: z.string().url(),
  logo: z.string(),
});

const Project = z.object({
  slug: z.string(),
  category: z.string(),
  paired: z.boolean(),
  tagline: z.string(),
  blurb: z.string(),
  tech: z.array(z.string()),
  demoUrl: z.string().url().optional(),
  npm: z.string().optional(),
});

// color/logoColor: coerce numbers (YAML auto-parses `005571` etc. as int) to string.
const ColorString = z.union([z.string(), z.number()]).transform((v) => {
  if (typeof v === "number") return v.toString(16).padStart(6, "0").toUpperCase();
  return v;
});

const Badge = z.object({
  label: z.string(),
  color: ColorString,
  logo: z.string(),
  logoColor: ColorString,
});

const Todo = z.object({ done: z.boolean(), text: z.string() });

const WidgetSwitch = z.object({
  enabled: z.boolean(),
  file: z.string().optional(),
  url: z.string().url().optional(),
});

const Data = z.object({
  identity: z.object({
    name: z.string(),
    handle: z.string(),
    tagline: z.string(),
    role: z.string(),
    company: z.string(),
    currentlyShipping: z.array(ShippingItem),
  }),
  operation: z.string(),
  currentTodos: z.array(Todo).optional().default([]),
  demos: z.array(Demo),
  projects: z.array(Project),
  loadout: z.record(z.string(), z.array(Badge)),
  theme: z.object({
    accent: z.string(),
    background: z.string(),
    text: z.string(),
    widgetTheme: z.string(),
  }),
  widgets: z
    .object({
      metricsProfile: WidgetSwitch.optional(),
      metricsIsocalendar: WidgetSwitch.optional(),
      metricsAchievements: WidgetSwitch.optional(),
      screenshotGraphlit: WidgetSwitch.optional(),
      screenshotAddressparser: WidgetSwitch.optional(),
      metricsInsightsLink: WidgetSwitch.optional(),
    })
    .optional()
    .default({}),
  footer: z.object({ motto: z.string() }),
});

type DataT = z.infer<typeof Data>;

// ─── Live-status pings ───────────────────────────────────────────────────────

type Status = "up" | "down";

async function ping(url: string, timeoutMs = 5000): Promise<Status> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { method: "HEAD", signal: ctl.signal });
    return res.ok ? "up" : "down";
  } catch {
    return "down";
  } finally {
    clearTimeout(timer);
  }
}

// ─── Rendering helpers ───────────────────────────────────────────────────────

function shieldsBadge(b: z.infer<typeof Badge>, style = "for-the-badge"): string {
  const label = encodeURIComponent(b.label).replace(/%20/g, "_");
  return `![${b.label}](https://img.shields.io/badge/${label}-${b.color}?style=${style}&logo=${b.logo}&logoColor=${b.logoColor})`;
}

function renderLoadout(loadout: DataT["loadout"]): string {
  const cols = Object.entries(loadout)
    .map(([heading, badges]) => {
      const rows = badges.map((b) => shieldsBadge(b)).join("\n");
      return `<td valign="top" width="25%">\n\n**${heading}**\n\n${rows}\n\n</td>`;
    })
    .join("\n");
  return `<table>\n<tr>\n${cols}\n</tr>\n</table>`;
}

function pinCard(handle: string, repo: string, accent: string, bg: string, theme: string, wide = false): string {
  const params = new URLSearchParams({
    username: handle,
    repo,
    theme,
    hide_border: "true",
    bg_color: bg,
    title_color: accent,
    icon_color: accent,
    description_lines_count: "2",
  });
  if (wide) params.set("card_width", "600");
  return `https://github-readme-stats-fast.vercel.app/api/pin/?${params.toString()}`;
}

function screenshotFor(p: z.infer<typeof Project>, d: DataT): string {
  const w = d.widgets ?? {};
  const cases: Array<{ slug: string; sw?: { enabled: boolean; file?: string } }> = [
    { slug: "graphlit-expansion", sw: w.screenshotGraphlit },
    { slug: "indian-address-parser", sw: w.screenshotAddressparser },
  ];
  for (const c of cases) {
    if (p.slug !== c.slug || !c.sw?.enabled || !c.sw.file) continue;
    // Prefer a real PNG (manually captured) over the SVG (Action-generated or stub).
    const stem = c.sw.file.replace(/\.svg$/i, "");
    for (const ext of [".png", ".svg"]) {
      const rel = `${stem}${ext}`;
      if (existsSync(resolve(PROJECT_ROOT, rel))) {
        return `<img src="./${rel}" alt="${p.slug} live screenshot" width="100%" />`;
      }
    }
  }
  return "";
}

function renderProjectCard(p: z.infer<typeof Project>, d: DataT): string {
  const { handle } = d.identity;
  const { accent, background, widgetTheme } = d.theme;
  const wide = !p.paired;
  const pinUrl = pinCard(handle, p.slug, accent, background, widgetTheme, wide);
  const repoLink = `https://github.com/${handle}/${p.slug}`;
  const screenshot = screenshotFor(p, d);

  const techLine = p.tech.map((t) => `\`${t}\``).join(" · ");

  // The pin card title links to the repo — so no redundant [Repo] button.
  const buttons: string[] = [];
  if (p.demoUrl) buttons.push(`[**↗ Live Demo**](${p.demoUrl})`);
  if (p.npm) {
    const pkgName = p.npm.replace(/\s+v?\d.*$/, "");
    buttons.push(`[**npm: ${p.npm}**](https://www.npmjs.com/package/${pkgName})`);
  }

  if (p.paired) {
    return [
      `<td width="50%" valign="top">`,
      ``,
      `<a href="${repoLink}">`,
      `  <img src="${pinUrl}" />`,
      `</a>`,
      ``,
      `**${p.tagline}**`,
      ``,
      p.blurb,
      ``,
      techLine,
      ``,
      `</td>`,
    ].join("\n");
  }

  // Solo card WITH screenshot — horizontal layout (screenshot left, content right).
  // Screenshot links to the live demo (the thing it actually depicts).
  if (screenshot) {
    const screenshotLink = p.demoUrl ?? repoLink;
    return [
      `<table>`,
      `<tr>`,
      `<td width="55%" valign="middle">`,
      ``,
      `<a href="${screenshotLink}">`,
      `  ${screenshot}`,
      `</a>`,
      ``,
      `</td>`,
      `<td width="45%" valign="top">`,
      ``,
      `<a href="${repoLink}">`,
      `  <img src="${pinCard(handle, p.slug, accent, background, widgetTheme, false)}" />`,
      `</a>`,
      ``,
      `**${p.tagline}**`,
      ``,
      p.blurb,
      ``,
      techLine,
      ``,
      buttons.join(" · "),
      ``,
      `</td>`,
      `</tr>`,
      `</table>`,
    ].join("\n");
  }

  // Solo card WITHOUT screenshot — original vertical layout.
  return [
    `<div align="center">`,
    `  <a href="${repoLink}">`,
    `    <img src="${pinUrl}" />`,
    `  </a>`,
    `</div>`,
    ``,
    `**${p.tagline}**`,
    ``,
    p.blurb,
    ``,
    techLine,
    ``,
    buttons.join(" · "),
  ].join("\n");
}

function renderProjects(d: DataT): string {
  const byCategory = new Map<string, z.infer<typeof Project>[]>();
  for (const p of d.projects) {
    const arr = byCategory.get(p.category) ?? [];
    arr.push(p);
    byCategory.set(p.category, arr);
  }

  const sections: string[] = [];
  for (const [category, projects] of byCategory) {
    sections.push(`### · ${category}\n`);
    if (projects.length === 2 && projects.every((p) => p.paired)) {
      const [a, b] = projects;
      sections.push(`<table>\n<tr>\n${renderProjectCard(a, d)}\n${renderProjectCard(b, d)}\n</tr>\n</table>\n`);
    } else {
      for (const p of projects) sections.push(`${renderProjectCard(p, d)}\n`);
    }
  }
  return sections.join("\n");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const dataPath = resolve(PROJECT_ROOT, "profile/data.yaml");
  const templatePath = resolve(PROJECT_ROOT, "profile/template.md");
  const outPath = resolve(PROJECT_ROOT, "README.md");

  const rawData = parseYaml(readFileSync(dataPath, "utf8"));
  const data = Data.parse(rawData);
  const template = readFileSync(templatePath, "utf8");

  console.log("Pinging demos…");
  const liveStatuses = await Promise.all(
    data.demos.map(async (d) => ({ ...d, status: await ping(d.url) })),
  );
  for (const s of liveStatuses) console.log(`  ${s.name.padEnd(20)} → ${s.status}`);

  const shippingLine = data.identity.currentlyShipping
    .map((s) => `[\`${s.name}\`](${s.url})${s.version ? ` ${s.version}` : ""}`)
    .join(" + ");

  const demoBadges = data.demos
    .map(
      (d) =>
        `[![${d.name} · live](https://img.shields.io/website?url=${encodeURIComponent(d.url)}&label=${d.name}&style=for-the-badge&up_color=${data.theme.accent}&up_message=live&down_color=ffb000&down_message=offline&logo=${d.logo}&logoColor=white&labelColor=${data.theme.background})](${d.url})`,
    )
    .join("\n");

  const ts = new Date().toISOString();
  const w = data.widgets ?? {};

  function svgBlock(
    sw: { enabled: boolean; file?: string } | undefined,
    altText: string,
    wrap: "centered" | "details",
    summary?: string,
  ): string {
    if (!sw?.enabled || !sw.file) return "";
    const abs = resolve(PROJECT_ROOT, sw.file);
    if (!existsSync(abs)) return "";
    if (wrap === "details") {
      return [
        ``,
        `<details>`,
        `<summary><sub><b>${summary}</b></sub></summary>`,
        ``,
        `<img src="./${sw.file}" alt="${altText}" width="98%" />`,
        ``,
        `</details>`,
        ``,
      ].join("\n");
    }
    return [
      ``,
      `<div align="center">`,
      ``,
      `<img src="./${sw.file}" alt="${altText}" width="98%" />`,
      ``,
      `</div>`,
      ``,
    ].join("\n");
  }

  const profileCard = svgBlock(w.metricsProfile, "Account profile · lowlighter/metrics", "centered");
  const isocalendarBlock = svgBlock(w.metricsIsocalendar, "Half-year isocalendar · lowlighter/metrics", "centered");
  const achievementsBlock = svgBlock(w.metricsAchievements, "Achievements · lowlighter/metrics", "centered");

  const insightsBadge = w.metricsInsightsLink?.enabled && w.metricsInsightsLink.url
    ? ` [![↗ live insights](https://img.shields.io/badge/%E2%86%97_live_insights-${data.theme.accent}?style=flat-square&labelColor=${data.theme.background})](${w.metricsInsightsLink.url})`
    : "";

  const currentTodos = (data.currentTodos ?? [])
    .map((t) => `> - [${t.done ? "x" : " "}] ${t.text}`)
    .join("\n");

  const rendered = template
    .replaceAll("{{name}}", data.identity.name)
    .replaceAll("{{handle}}", data.identity.handle)
    .replaceAll("{{tagline}}", data.identity.tagline)
    .replaceAll("{{role}}", data.identity.role)
    .replaceAll("{{company}}", data.identity.company)
    .replaceAll("{{shippingLine}}", shippingLine)
    .replaceAll("{{operation}}", data.operation.trim())
    .replaceAll("{{demoBadges}}", demoBadges)
    .replaceAll("{{projects}}", renderProjects(data))
    .replaceAll("{{loadout}}", renderLoadout(data.loadout))
    .replaceAll("{{accent}}", data.theme.accent)
    .replaceAll("{{background}}", data.theme.background)
    .replaceAll("{{text}}", data.theme.text)
    .replaceAll("{{widgetTheme}}", data.theme.widgetTheme)
    .replaceAll("{{motto}}", data.footer.motto)
    .replaceAll("{{currentTodos}}", currentTodos)
    .replaceAll("{{profileCard}}", profileCard)
    .replaceAll("{{isocalendarBlock}}", isocalendarBlock)
    .replaceAll("{{achievementsBlock}}", achievementsBlock)
    .replaceAll("{{insightsBadge}}", insightsBadge)
    .replaceAll("{{timestamp}}", ts);

  writeFileSync(outPath, rendered);
  console.log(`\nWrote ${outPath} (${rendered.length.toLocaleString()} bytes)`);
  console.log(`Demo health: ${liveStatuses.map((s) => `${s.name}=${s.status}`).join(", ")}`);
  console.log(`Built at:    ${ts}`);
}

main().catch((err) => {
  console.error("[build.ts] failed:", err);
  process.exit(1);
});
