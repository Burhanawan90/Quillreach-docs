// Fails CI when a public docs page breaks the Quillreach copy rules.
// Mirrors src/app/(landing)/marketing-copy.test.ts in the app repo: say WHAT the
// customer gets and WHICH button to press, never HOW Quillreach works inside.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKIP = new Set(["node_modules", ".git", "scripts", ".github"]);

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (SKIP.has(name)) return [];
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(mdx?|json)$/.test(name) ? [path] : [];
  });
}

const phrase = (p) => new RegExp(`\\b(?:${p})\\b`, "gi");

const RULES = [
  ["em dash", /—/g],
  ["off-limits competitor", /\b(aimfox|prosp\.io|prosp)\b/gi],
  ["official API claim", /official[ -]?(linkedin )?(partner )?api/gi],
  ["ban wording", /\bbann?(ed|ing|s)?\b/gi],
  ["internal mechanism", phrase([
    "approved (third-party )?integration", "isolated[- ]sessions?", "session[- ]based",
    "session (infrastructure|isolation)", "hard (per-account |safety )?caps?",
    "per-account (daily |safety )?caps?", "cap-aware", "refuses? to (send|exceed)",
    "quillreach enforces", "warm-?up", "human[- ]pac(ed|ing)", "randomi[sz]ed",
    "safe timing", "human rhythm", "natural pace", "safe (send )?rates",
    "independent opt-ins?", "server-side gate", "(review|approval) queues?",
    "within safe limits", "daily (cap|limit)s?", "throttl\\w*", "proxy|proxies",
    "residential ip", "cookies?", "li_at", "browser extension", "headless",
    "push(es|ed|ing)? back", "webhooks?", "unlimited", "white[- ]label", "founding pricing", "founder pricing",
    "early access", "waitlist", "blast", "mass (message|messaging|outreach)",
  ].join("|"))],
  ["vendor or stack name", phrase([
    "unipile", "supabase", "vercel", "openai", "anthropic", "claude", "gpt", "deepseek",
    "gemini", "openrouter", "inngest", "upstash", "resend(?! invite)", "stripe", "posthog", "anychat",
    "next\\.?js", "postgres", "fly\\.io", "cloudflare",
  ].join("|"))],
];

const failures = [];
for (const path of files(ROOT)) {
  const text = readFileSync(path, "utf8");
  for (const [rule, re] of RULES) {
    for (const m of text.matchAll(re)) {
      failures.push(`${relative(ROOT, path)}: ${rule}: "${m[0]}"`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Copy check passed.");
