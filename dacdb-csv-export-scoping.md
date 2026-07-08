# DACdb Extension — Project 1: "Export Any Table to CSV"

**Status:** Scoping / design (no code yet)
**Last updated:** 2026-07-08
**Author context:** Club secretary (full access), hobbyist Chrome-extension developer. Intended for the wider Rotary/DACdb community, not just personal use.

---

## 1. Why this feature first

Chosen as the first project because it is the sweet spot for a DOM-injection extension:

- **High utility** — every DACdb user hits lists/reports they'd like in a spreadsheet (rosters, attendance, report output).
- **Low brittleness** — relies on generic HTML table structure, not DACdb-specific classes, so it survives their ongoing old-UI → new-UI transition better than most approaches.
- **Read-only** — never writes to DACdb, never calls the network, never touches server state. Lowest-risk category for terms-of-service and for member trust.
- **Low PII risk** — only exports data the logged-in user is *already looking at*, to a local file on their own machine. No new access is granted and nothing leaves the browser.

## 2. What it does (scope)

**In scope (v0.1):**
- Detect qualifying data tables on a DACdb page.
- Inject a small, unobtrusive "⬇ CSV" button near each qualifying table.
- On click, serialize that table's visible contents to a clean CSV file and trigger a local download.

**Explicitly out of scope (for now):**
- Any editing, submitting, or automation of DACdb actions.
- Mobile (`m.dacdb.com`) — Chrome extensions effectively don't run on mobile browsers.
- Div-based/virtualized data grids (if DACdb uses any) — flagged as an open question below.
- Server-side reports that only exist as PDF/print output.
- Column selection, filtering, or reformatting — those are candidate *v0.2+* features.

## 3. DOM approach (design intent, not final code)

1. **Content script** runs on DACdb pages via host permissions scoped to `*.dacdb.com`.
2. **Table detection heuristic** — favor semantic structure over brand-specific classes:
   - Select real `<table>` elements.
   - Qualify a table if it has a header row (`<thead>` or first-row `<th>`) **and** at least a minimum number of data rows/columns (to skip layout tables).
3. **Button injection** — insert a lightweight button positioned relative to each qualifying table (e.g., just above it, or absolutely positioned at its top-right). Give injected elements a unique class/attribute so we can (a) avoid double-injecting and (b) exclude our own controls from the export.
4. **Serialization on click:**
   - Walk rows (`<tr>`), then cells (`<th>`/`<td>`), reading trimmed `textContent`.
   - Collapse internal whitespace; skip any cell that is our injected UI.
   - CSV-escape properly: wrap fields containing commas, quotes, or newlines in quotes and double interior quotes.
   - Build a `Blob`, generate an object URL, and trigger download via a temporary anchor.
   - Filename derived from page/document title + table index + timestamp.
5. **Async content** — DACdb loads some views dynamically. Use a `MutationObserver` so tables that appear after initial load also get a button.
6. **Frames** — some reports may render in an `iframe` or popup window. Plan for `all_frames: true` and verify behavior (see open questions).

## 4. Brittleness strategy

- Prefer **semantic selectors** (`table`, `tr`, `th`, `td`) over DACdb class names, since the platform is mid-redesign.
- Keep any DACdb-specific selectors in a **single config object** at the top of the file, so future breakage is a one-line fix, not a hunt through the codebase — important for a community-maintained tool.
- Fail **silently and safely**: if detection finds nothing, inject nothing. Never block or alter normal DACdb use.

## 5. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Member PII in exported file | Low | Only exports data user already sees; local-only; no network calls; documented design principle |
| Terms-of-service concerns | Low | Read-only, user-initiated, no scraping/automation; review DACdb terms before public release |
| Markup changes break detection | Medium | Semantic selectors + centralized config; fail-safe (no button rather than broken UI) |
| Capturing injected UI as a column | Low | Tag and exclude our own elements during serialization |
| Div-based grids not matched | Medium (unknown) | Flagged as open question; v0.1 targets real `<table>` only |

## 6. Manifest V3 notes

- `manifest_version: 3`, content script on `https://*.dacdb.com/*`.
- **No** remote code, **no** external network permissions.
- Downloads via Blob + anchor generally need no extra permission; confirm during build.
- Keep the permission footprint as small as possible — a public tool touching a membership DB should be visibly minimal, and ideally open source.

## 7. MVP milestone (v0.1)

Inject a working "⬇ CSV" button on **one** high-value real-`<table>` page (proposed: the My Club member roster). Clicking it downloads a clean, correctly escaped CSV. Verified by manual test on that page.

## 8. Open questions (to resolve before/while building)

1. Which page/table is the best first target — member roster, attendance list, or a specific report?
2. Are DACdb's data lists real `<table>` elements, or div-based/virtualized grids?
3. Do reports render in the same document, an `iframe`, or a popup window?
4. Any meaningful differences between the old UI and new UI table markup?
5. Distribution plan — personal load-unpacked first, then Chrome Web Store / open-source repo for the community?

## 9. Next steps

- [ ] Review/adjust this scoping doc.
- [ ] Answer open questions (#1–#4) using a real DACdb page you have open.
- [ ] Only then: set up the extension skeleton (manifest + empty content script), one step at a time.
