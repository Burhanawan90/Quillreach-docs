# Quillreach help docs

Public customer help for Quillreach, served at https://quillreach.com/docs (Mintlify).
Pages are MDX with YAML frontmatter. Navigation lives in `docs.json`.

## What a page may say

- WHAT the customer gets and WHICH button to press. Never HOW it works inside.
- Safety is only ever "Smart AI Connection" (keeps the account's connection human) and
  "AI Pilot" (drives the account and keeps it safe). Name the feature and its outcome.
- Never name vendors or the stack. Never publish internal numbers (caps, ramps,
  limits, thresholds, schedules), how Quillreach connects to LinkedIn, pacing or pause
  rules, or how AI review works. When unsure, leave it out.
- `scripts/check-copy.mjs` runs in CI and fails the build on forbidden wording and em dashes.

## Style

- Second person, active voice, one idea per sentence, sentence-case headings.
- Bold for UI labels exactly as they appear in the app: click **New campaign**.
- Steps as numbered lists. Every page answers one task.
- No em dashes anywhere. Use a comma, a period, a colon or a plain hyphen.

## Keeping it current

When a customer-facing screen, button or flow changes in the Quillreach app, the matching
page here is updated in the same batch of work.
