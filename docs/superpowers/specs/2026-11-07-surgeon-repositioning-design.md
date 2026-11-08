# Design: Reposition drjebran.com around surgery + fix design-critique findings

Date: 2026-11-07

## Intent / why
The site currently presents Dr. Mohammad Ehsan Wardak as a family physician. He is an
**orthopedic and general surgeon, operating since the late 1980s**, who performs essentially
every operation except cardiac and neurosurgery. Patients in Kabul searching for a surgeon
(broken bone, hernia, gallbladder, hydatid cyst, goiter…) must recognise within seconds that
he treats their problem, and know how to reach him. A design critique also found a
patient-safety copy error, broken Farsi (RTL) layout, failing contrast, and redundant UI.

## Goals
1. Hero, About, meta/SEO all say "Orthopedic & General Surgeon".
2. New **Surgical Procedures** section listing 22 operations in two groups, bilingual.
3. Make clear where he works: **his own clinic** (consultations, existing address/hours)
   and **Mawla Ali Hospital, Kabul** (where operations are performed).
4. Fix every critique finding (list below).

## Non-goals
- No booking system, backend, CMS, or new pages/routes — stays a single-page CRA app.
- No new dependencies.
- No change to analytics setup beyond keeping existing events working.

## Anti-goals (failure even if it "works")
- Any medical claim he can't back: no "24/7 emergency", no unverified reply-time promises,
  no procedures outside the approved list (no spine, no total joint replacement, no cardiac/neuro).
- Farsi mode that looks worse than English.
- Breaking the "swap siteContent.json to make a new doctor page" template model
  (`template/doctor-template.md`): new content goes in `siteContent.json`, not hard-coded.

## Approved procedure list (user-confirmed)
**Orthopedic & trauma:** ORIF plates/screws; intramedullary nailing (femur/tibia); hip fracture
surgery (DHS / hemiarthroplasty); external fixation; closed reduction & casting; wound
debridement & osteomyelitis treatment; amputation & stump revision incl. diabetic foot;
tendon/ligament repair; clubfoot correction; bone cyst/tumour & implant removal.
**General:** appendectomy; hernia repair (inguinal/umbilical/incisional); cholecystectomy;
hydatid cyst surgery (liver/lung); thyroid surgery for goiter; emergency laparotomy
(perforated ulcer, obstruction, trauma); sigmoid volvulus; haemorrhoids/fissure/fistula;
pilonidal sinus; hydrocele/varicocele; breast lump & soft-tissue mass excision;
abscess drainage, burn care & skin grafting.
Each item: name + one plain-language line (e.g. "Repair of a bulge in the groin"), EN + FA.

## Page structure (new order)
1. **Header** — logo, nav: Surgery · About · Clinic · Contact, quiet language toggle, Call button.
2. **Hero** — name; title "Orthopedic & General Surgeon"; chips: "Surgeon since the late 1980s",
   "Operates at Mawla Ali Hospital", "English · فارسی · پښتو"; "Open today 5:30–8 PM" chip;
   CTAs: "Message on WhatsApp" (primary) + "Call" (secondary); text link "See what he operates on".
   (Superseded details: see Visual direction below; chips become a single quiet line.)
   Photo badge flips side in RTL.
3. **Surgical Procedures** (new, `#surgery`) — tabs Orthopedic / General (accessible tablist;
   both visible stacked on mobile is acceptable alternative — builder's call), cards with
   distinct icons per group, closing CTA "Not sure if he treats your condition? Ask on WhatsApp".
4. **Clinic consultations** (replaces Services) — 3 items: surgical assessment/second opinion,
   pre-op planning, post-op follow-up & wound care. Remove "Emergency Care" card and the
   24/7 block entirely.
5. **About** — bio rewritten as surgeon; credentials updated (remove "Specialized in General
   Medicine"); "35+ years" stated once here; 4 "why choose" cards trimmed to 3 surgeon-relevant.
6. **Where he works** (ClinicInfo) — two location cards: Clinic (address, hours, single map,
   one Directions + Copy address) and Mawla Ali Hospital (name, "operations performed here").
   One lazy map only (remove FallbackMap duplicate + "View map" button + "Need directions?" card).
7. **Contact** — Call + WhatsApp; WhatsApp prefill localized; replace "under 10 minutes" with
   "We reply during clinic hours"; urgent note: "For a medical emergency, go to the nearest
   emergency department."
8. **Footer** — reads address/hours/phone from content JSON; social links get aria-labels.

## Critique fixes (all in scope)
- RTL: remove all `isRTL ? 'flex-row-reverse…'` conditionals; rely on `dir`; use logical
  utilities (`start-*`, `ms-*`, `me-*`, `text-start`). Badge, copy row margins, footer.
- Contrast: darken accent for text-bearing uses to ~`#0A7F75` (≥4.5:1 with white) — update
  Tailwind token; WhatsApp button `bg-green-700`; remove `hover:text-accent` on white or use dark accent.
- Focus ring visible on dark sections (light/teal ring there).
- One button system: use `.btn-*` variants everywhere, one radius, one "Call" colour.
- Replace emoji icons with inline SVGs (`aria-hidden`).
- `aria-live="polite"` for "Copied"; localize iframe titles; aria-labels on social links;
  touch targets ≥44px; `tel:` hrefs without spaces.
- Section h2 capped at `text-4xl`.
- Reduced motion: background draws one static frame.
- Narrow `overflow-wrap:anywhere` to long tokens only (email/links).
- Remove dead `via.placeholder.com` fallback.
- All new/changed strings live in `siteContent.json` (en + fa); update `siteContent.template.json`
  and `template/doctor-template.md` for the new `procedures` / `locations` fields.
- SEO: `index.html` title/description/OG updated to surgeon wording; JSON-LD becomes
  `Physician` with `medicalSpecialty` ["Surgical","Orthopedic"] plus `hospitalAffiliation`
  Mawla Ali Hospital. Remove "emergency medical services" from meta description.

## Calls I made (not confirmed by user)
- Emergency: no 24/7 claim anywhere; only "go to nearest emergency department" guidance.
- No Mawla Ali Hospital address/map — name only, until the user supplies the address.
- Farsi translations of procedure names are mine; flagged for a native-speaker review.
- "Surgeon since the late 1980s" wording (not a specific year).

## Branding (decided)
Patients call him "Dr. Sahib Ehsan"; the domain and social accounts use "Jebran".
- Short brand everywhere (header, page title, OG, footer, clinic name): **"Dr. Ehsan Jebran"**
  (FA: «داکتر احسان جبران»). This joins the name patients say with the domain.
- Full name **Dr. Mohammad Ehsan Wardak** stays as the hero H1 and in About.
- JSON-LD `alternateName`: "Dr. Ehsan", "Dr. Jebran", "Dr. Wardak", "Mohammad Ehsan Jebran".
- Farsi copy uses «داکتر» (Afghan usage) rather than «دکتر» in new/changed strings.

## Visual direction (frontend-design pass)

**Who and what it's for:** patients and families in Kabul, mostly on mid-range Android phones,
often on slow mobile data, often reading Dari first. They know *where it hurts*, not the name
of the operation. The page's job is to answer "can he operate on this?" and then get them
to WhatsApp or call.

**What changes and why:** the current look (navy + teal, animated ECG line, floating crosses,
gradient icon tiles, identical rounded cards, hover-lift, fade-ins) is the generic
"medical template" look. The ECG is also a **cardiology** symbol, and heart surgery is the one
thing he doesn't do. All of it goes.

### Tokens
| Name | Hex | Use | Contrast |
|---|---|---|---|
| Scrub | `#1E5B52` | primary: buttons, headings, dark bands (operating-room drape green) | 7.85:1 with white |
| Lapis | `#23408E` | links, focus ring on light (Badakhshan lapis, a local reference) | 9.57:1 on white |
| Ink | `#14211F` | body text | 16.6:1 |
| Steel | `#5B6B69` | secondary text | 5.6:1 on white, 5.2:1 on Ward |
| Ward | `#F4F7F6` | page background (cool, clinical; not cream) | — |
| Mint | `#9FE3D0` | focus ring on dark Scrub bands only | 5.4:1 on Scrub |
WhatsApp button uses Scrub + the WhatsApp glyph (recognised by the icon, not by bright green).
Tailwind tokens `primary/accent/muted/ink` are remapped to these, so existing classes keep working.

**Type:** one family for both scripts: **IBM Plex Sans** + **IBM Plex Sans Arabic** (Persian
supported, matching weights, so EN and FA pages look like the same site). Weights 400/500/600
only. Scale 1.25 (14·16·20·25·31·39 px). Body 16–17px; line-height 1.55 (EN), 1.8 (FA).
Measure ≤ 70ch. Sentence case everywhere, no all-caps labels, no eyebrow labels, no
single-word colour accents in headlines. Replaces Manrope + Space Grotesk + Vazirmatn
(3 font downloads become 2).

**Alignment:** start-aligned throughout (left in EN, right in FA). No centred section
headers; centred text is only used for the closing CTA band.

### The one memorable thing: "Where does it hurt?" body map
In the Surgical Procedures section: a simple single-line SVG figure (front view; not an
anatomical illustration) with tappable regions: **neck** (thyroid) · **chest** (lung hydatid)
· **abdomen** (appendix, gallbladder, liver hydatid, ulcer/obstruction, volvulus) · **groin**
(hernia, hydrocele/varicocele) · **arms & hands** (fractures, tendons) · **hips & legs**
(hip fracture, nailing, external fixation) · **feet** (clubfoot, diabetic foot) · **skin & soft
tissue** (abscess, burns/grafts, lumps, pilonidal, anal conditions, as a chip, not on the
figure). Choosing a region filters the procedure list beside it and shows "Send a photo of
your X-ray or report on WhatsApp". "All" is the default, so **all 22 procedures are always in
the page's HTML** (search engines, no-JS). Regions are real `<button>`s with
`aria-pressed`. The list is announced with `aria-live`. Each procedure stays tagged
Orthopedic / General.
This is the only animated moment: the chosen region fills with Scrub (150ms; instant with
reduced motion). Everything else is still.

```
Mobile (375)                         Desktop (1280)
┌──────────────────────┐   ┌────────────────────────────────────────────┐
│ Dr. Ehsan Jebran  ☰  │   │ Dr. Ehsan Jebran   Surgery About Clinic  دری [Call]│
├──────────────────────┤   ├──────────────────────┬─────────────────────┤
│ [photo, 4:5]         │   │ Dr. Mohammad Ehsan   │                     │
│ Dr. Mohammad Ehsan   │   │ Wardak               │     [photo 4:5]     │
│ Wardak               │   │ Orthopedic & general │                     │
│ Orthopedic & general │   │ surgeon, Kabul       │                     │
│ surgeon, Kabul       │   │ ● Open today 5:30–8pm│                     │
│ ● Open today 5:30–8pm│   │ [WhatsApp] [Call]    │                     │
│ [WhatsApp] [Call]    │   ├──────────┬───────────┴─────────────────────┤
├──────────────────────┤   │  ( )     │ Where does it hurt?             │
│ Where does it hurt?  │   │  /|\     │ [All][Neck][Abdomen][Groin]...  │
│ [All][Neck][Abdomen] │   │  / \     │ Hernia repair      General       │
│ [Arms][Legs][Skin]…  │   │ body map │ Repair of a bulge in the groin  │
│ ── list ──           │   │          │ Hip fracture surgery  Orthopedic│
│ Hernia repair        │   │          │ ...                             │
│ ...                  │   └──────────┴─────────────────────────────────┘
├──────────────────────┤
│ sticky [WhatsApp][Call]
```
On mobile the figure is hidden. Region chips do the filtering (the figure would be too small
to tap accurately).

**Procedure list, not cards:** a plain two-line list (name, plain-language line,
specialty tag) separated by hairlines. 22 cards would be a wall. Cards are kept only for the
two location blocks, where they are real objects (a place you go).

**Restraint:** removed: the animated canvas, gradient bars above headings, gradient icon tiles,
hover-lift, fade-ins, the gradient quote box. One radius scale: 6px controls, 12px containers.
No shadows except the sticky bar.

### Plan review (generic-default check)
- *Navy + teal "trust" palette* is what any clinic template gets, so it was replaced with scrub green
  and lapis, both taken from his work and his city.
- *Card grid for services/procedures* is the SaaS-card default, so it was replaced with a filterable list.
- *Centred headings with gradient underline bars* are template chrome, so the page is now start-aligned.
- *Body map* was kept. It is sometimes a gimmick, but here it matches how patients think
  (by body part) and works across literacy levels and both languages.

## Additional improvements found in review
1. **WhatsApp first.** Make WhatsApp the primary CTA (hero, sticky bar) with Call second;
   it's how Kabul patients reach doctors and lets them send X-rays and reports.
2. **"Send your X-ray or report"** prompt on WhatsApp CTAs near the procedures, with a
   localized prefilled message ("Salaam Dr. Sahib, I'd like to ask about…").
3. **Open-now status in Kabul time.** Compute against `Asia/Kabul` (UTC+4:30), not the
   visitor's timezone (many visitors are diaspora family in other time zones): "Open now",
   "Opens today at 5:30 PM", or "Opens tomorrow at 5:30 PM". Hours come from structured
   content (`open: "17:30", close: "20:00"`), not a free-text string.
4. **Diaspora visitors.** One line in Contact: "Calling from abroad? Use WhatsApp."
5. **Performance:** remove the canvas animation (it runs at 60fps forever); serve the hero photo
   as WebP with explicit width/height (prevents layout shift); load 2 font families instead of 3,
   subset weights; preconnect to fonts.
6. **Remove unverifiable content:** the "Medical Philosophy" quote is written as his
   words, so keep it only if he approves the wording (otherwise drop it). No testimonials, prices, or
   success rates.
7. **What to bring:** a short list in Clinic: previous X-rays/scans, reports, medication list.
   Useful and specific to a surgical consult.
8. **SEO:** `<html lang>`/`dir` switch already exists. Add `hreflang`-style alternate meta for
   FA, a Dari meta description, and procedure names in JSON-LD `availableService`
   (`MedicalProcedure`).
9. **Content model:** `procedures[]` items carry `{ id, name, plain, specialty, regions[] }`,
   `locations[]` carry `{ type: clinic|hospital, name, address?, hours?, coords? }`, and hours
   are structured. Update template + guide.
10. **Tests:** body-map filter (choosing "Groin" shows hernia and hydrocele and hides the clubfoot
    procedure), open-now logic with a fixed clock at Kabul times, RTL has no `flex-row-reverse`.

## Language (decided)
- **Dari is the default** for first-time visitors (no stored choice): `lang="fa-AF"`, `dir="rtl"`.
  A stored choice in localStorage still wins. Initial HTML (`index.html`) ships `lang="fa-AF" dir="rtl"`
  to avoid an LTR flash.
- Toggle labels: «دری» / "English". Internal code key stays `fa`.
- User-friendly, modern, mobile-first: design starts at 360px; tap targets ≥44px; sticky
  WhatsApp/Call bar on mobile; no hover-only affordances.

## Verification
- `npm test` passes (update `App.test.js` for new headings; add tests: procedures section renders
  22 items in EN and FA; no "24/7" text anywhere; `dir="rtl"` set in Farsi).
- `npm run build` succeeds.
- Visual check in browser at 375px and 1280px, EN and FA.
