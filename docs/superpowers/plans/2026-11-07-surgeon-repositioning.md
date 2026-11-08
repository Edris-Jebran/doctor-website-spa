# Surgeon Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild drjebran.com as a Dari-first, mobile-first site for an orthopedic & general surgeon, with a "Where does it hurt?" procedure finder, and fix every design-critique finding.

**Architecture:** Same single-page CRA + Tailwind 3 app. All copy moves into `src/data/siteContent.json` (`fa` + `en`); components only read content. Two pure utilities (`clinicHours`, `contactLinks`) carry the logic that gets unit tests; one shared `Icon` component replaces emoji.

**Tech Stack:** React 19, react-scripts 5 (Jest + Testing Library), Tailwind 3 + @tailwindcss/forms, Google Fonts (IBM Plex Sans, IBM Plex Sans Arabic).

**Spec:** `docs/superpowers/specs/2026-11-07-surgeon-repositioning-design.md`

## Global Constraints
- No new npm dependencies. No routes/pages, no backend.
- Colours (tailwind `theme.extend.colors`): `primary:#1E5B52` (Scrub), `lapis:#23408E`, `ink:#14211F`, `steel:#5B6B69`, `muted:#F4F7F6` (Ward), `mint:#9FE3D0`. Delete the old `accent` value; alias `accent` → `#1E5B52` only if needed during migration, removed by Task 9.
- Fonts: IBM Plex Sans (EN) and IBM Plex Sans Arabic (FA), weights 400/500/600 only. Type scale 14·16·20·25·31·39px. Body line-height 1.55 EN / 1.8 FA. Measure ≤70ch.
- Radii: 6px controls (`rounded-md`), 12px containers (`rounded-xl`). Shadows only on the mobile sticky bar.
- Start-aligned text everywhere (no centred section headers); sentence case; no all-caps, no eyebrow labels, no emoji, no `→` in button text.
- RTL: never use `flex-row-reverse`, `left-*`/`right-*`, `ml-*`/`mr-*`, `text-left`/`text-right` for direction; use `start-*`/`end-*`, `ms-*`/`me-*`, `text-start`, and rely on `dir`.
- Default language `fa` (Dari), `lang="fa-AF"`, `dir="rtl"`; stored choice in localStorage key `doctor_website_language` wins. Toggle labels «دری» / "English".
- Brand: short name "Dr. Ehsan Jebran" / «داکتر احسان جبران»; H1 full name "Dr. Mohammad Ehsan Wardak" / «داکتر محمد احسان وردک». New Dari strings use «داکتر».
- Phone `+93789158627` (display `+93 78 915 8627`). Tap targets ≥44px.
- Never render: "24/7", "emergency care available", reply-time promises, spine/joint replacement/cardiac/neuro procedures.
- Only animation: body-map region fill, 150ms, disabled under `prefers-reduced-motion`.

## Review Focus
1. **Visitor outside Kabul** (e.g. browser in America/New_York): open-now status must be computed in Asia/Kabul → test in Task 2 with fixed UTC instants.
2. **Just before/after the boundary** (17:29, 17:30, 19:59, 20:00 Kabul) → boundary tests in Task 2 (open is `[17:30, 20:00)`).
3. **Stale stored language** (`localStorage` holds `"en"` or garbage like `"de"`) → `"en"` respected, garbage falls back to `fa`; test in Task 1.
4. **Region with toggling** (tap Groin, then tap Groin again, or tap All) → returns to all 22; test in Task 6.
5. **Clipboard unavailable** (http, old Android WebView) → Copy button must not claim "Copied"; test in Task 8.

---

### Task 1: Content model, Dari default, branch

**Files:**
- Modify: `src/data/siteContent.json`, `src/context/LanguageContext.jsx`, `public/index.html` (`<html>` tag only), `src/App.js`
- Modify: `src/data/siteContent.template.json` (untracked `template/` copy too), `template/doctor-template.md`
- Test: `src/context/LanguageContext.test.jsx`

**Interfaces:**
- Produces: `useLanguage(): { lang: 'fa'|'en', isRTL: boolean, content: Content, setLang(l), toggleLanguage() }` (keep `currentLanguage` as an alias of `lang` until Task 9 removes callers).
- Produces `Content` shape (both languages identical keys):
  ```
  brand: { short, full }
  hero: { title, specialty, location, imageUrl, imageAlt }
  regions: [{ id: 'neck'|'chest'|'abdomen'|'groin'|'arms'|'legs'|'feet'|'skin', label }]
  procedures: [{ id, name, plain, specialty: 'orthopedic'|'general', regions: RegionId[] }]   // exactly 22
  consultations: [{ id, name, plain }]   // 3: assessment/second opinion, pre-op planning, post-op follow-up & wound care
  about: { bio, credentials[], highlights: [{ title, text }] }   // 3 highlights; no philosophy quote
  locations: [{ type: 'clinic'|'hospital', name, address?, coords?, note }]
  hours: { open: '17:30', close: '20:00', days: 'daily', tz: 'Asia/Kabul' }
  whatToBring: string[]
  contact: { phone: '+93789158627', phoneDisplay: '+93 78 915 8627', whatsapp: '93789158627', email, socialLinks, whatsappMessage, whatsappXrayMessage, abroadNote, emergencyNote }
  ui: { ...every remaining label used by components }
  ```
- Region mapping (fixed by spec): ORIF→arms,legs · nailing→legs · hip fracture→legs · external fixation→arms,legs · closed reduction→arms,legs · debridement/osteomyelitis→arms,legs,skin · amputation/diabetic foot→legs,feet · tendon/ligament→arms,feet · clubfoot→feet · bone cyst/tumour/implant removal→arms,legs · appendectomy→abdomen · hernia→abdomen,groin · cholecystectomy→abdomen · hydatid→abdomen,chest · thyroid→neck · emergency laparotomy→abdomen · volvulus→abdomen · haemorrhoids/fissure/fistula→skin · pilonidal→skin · hydrocele/varicocele→groin · breast lump/soft-tissue mass→chest,skin · abscess/burns/grafts→skin.

- [ ] **Step 1:** `git checkout -b feat/surgeon-repositioning`
- [ ] **Step 2: Write failing tests** in `LanguageContext.test.jsx`:
  - `defaults to Dari with no stored choice` → `lang === 'fa'`, `isRTL === true`, `document.documentElement.lang === 'fa-AF'`, `dir === 'rtl'`.
  - `respects stored English` → storage `"en"` ⇒ `lang === 'en'`, `dir === 'ltr'`, `lang attr 'en'`.
  - `ignores garbage stored value` → storage `"de"` ⇒ `lang === 'fa'`.
  - `content has 22 procedures in both languages with identical ids and regions`.
  - `no forbidden copy` → `JSON.stringify(siteContent)` does not match `/24\/7|۲۴\/۷|under 10 minutes|Specialized in General Medicine/i`.
- [ ] **Step 3:** Run `CI=true npx react-scripts test --watchAll=false src/context` → FAIL.
- [ ] **Step 4:** Rewrite `siteContent.json` to the shape above (EN plain-language lines per spec, e.g. hernia "Repair of a bulge in the groin or belly"; Dari translations using «داکتر»). Move `<html>` lang/dir sync from `App.js` into `LanguageProvider` (sets `fa-AF`/`en`). Set `<html lang="fa-AF" dir="rtl">` in `index.html`. Update template JSON + guide for the new fields.
- [ ] **Step 5:** Run tests → PASS.
- [ ] **Step 6:** Commit `feat: surgeon content model and Dari default`.

### Task 2: Kabul-time opening status

**Files:** Create `src/utils/clinicHours.js`; Test `src/utils/clinicHours.test.js`

**Interfaces:**
- Produces: `getOpenStatus(now: Date, hours: Content['hours']) -> { state: 'open'|'later'|'tomorrow', open: '17:30', close: '20:00' }`. Uses `Intl.DateTimeFormat('en-GB', { timeZone: hours.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })` to read Kabul wall time. Open interval is `[open, close)`.
- Produces: `formatTime(hhmm: string, lang) -> string` ("5:30 PM" / «۵:۳۰ عصر», Persian digits for fa).

- [ ] **Step 1: Failing tests** (Kabul = UTC+4:30):
  - `2026-11-07T12:59:00Z` (17:29 Kabul) → `later`; `13:00Z` (17:30) → `open`; `15:29Z` (19:59) → `open`; `15:30Z` (20:00) → `tomorrow`; `03:00Z` (07:30) → `later`.
  - Same instants give same results with `process.env.TZ` irrelevance: assert by constructing dates via `Date.UTC`, not local constructors.
  - `formatTime('17:30','en') === '5:30 PM'`; `formatTime('20:00','fa') === '۸:۰۰ شب'`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS. **Step 5:** Commit `feat: Kabul-time open status`.

### Task 3: Design tokens, fonts, global CSS, remove background canvas

**Files:** Modify `tailwind.config.js`, `src/index.css`, `src/App.css`, `src/App.js`, `public/index.html` (font preconnect + `<link>`); Delete `src/components/MedicalBackground.jsx` and `src/logo.svg` (unused). (`FallbackMap.jsx` is deleted in Task 8.)

**Interfaces:**
- Produces CSS components: `.btn` (min-h 44px, rounded-md, font-medium, inline-flex, gap-2), `.btn-primary` (bg-primary text-white), `.btn-secondary` (border-primary text-primary bg-white), `.btn-on-dark` (bg-white text-primary). `.section` (py-16 sm:py-20), `.container-page` (max-w-6xl mx-auto px-5 sm:px-6), `.h2` (text-[25px] sm:text-[31px] font-semibold text-primary).
- Focus: `:focus-visible { outline: 3px solid #23408E; outline-offset: 2px }`; `.on-dark :focus-visible { outline-color: #9FE3D0 }`.
- `body` font: `'IBM Plex Sans', 'IBM Plex Sans Arabic', system-ui, sans-serif`; `[dir=rtl] body` puts Plex Arabic first, line-height 1.8. Remove global `overflow-wrap:anywhere` rule; add `.break-anywhere` utility for emails/URLs only. Remove `.animate-fade-in`, `.rtl` font-feature block. `@media (prefers-reduced-motion: reduce) { *{transition-duration:0s!important; scroll-behavior:auto!important} }`.
- Fonts link: `family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap`, with `preconnect` to fonts.googleapis.com and fonts.gstatic.com; remove the CSS `@import`.

- [ ] **Step 1:** Apply tokens/CSS; remove `<MedicalBackground />` from `App.js`; body background `#F4F7F6`.
- [ ] **Step 2:** `npm run build` → "Compiled successfully" (warnings allowed only from untouched files).
- [ ] **Step 3:** Commit `style: surgical palette, Plex type, remove ECG canvas`.

### Task 4: Icons, contact links, Header, LanguageToggle, StickyCTA

**Files:** Create `src/components/Icon.jsx`, `src/utils/contactLinks.js`; Modify `Header.jsx`, `LanguageToggle.jsx`, `StickyCTA.jsx`, `ScrollToTopButton.jsx`; Test `src/utils/contactLinks.test.js`, `src/components/Header.test.jsx`

**Interfaces:**
- `Icon({ name: 'phone'|'whatsapp'|'map'|'clock'|'copy'|'check'|'menu'|'close'|'arrow-up'|'facebook'|'instagram'|'hospital'|'clinic'|'xray', className })` → inline SVG with `aria-hidden="true"` `focusable="false"`.
- `telHref(contact) -> 'tel:+93789158627'`; `whatsappHref(contact, message: string) -> 'https://wa.me/93789158627?text=' + encodeURIComponent(message)`.
- Header nav links: `#surgery`, `#about`, `#locations`, `#contact` with `content.ui` labels; brand link shows `content.brand.short`; Call button `.btn-primary` compact. LanguageToggle is a text button («دری»/"English", `lang` attr on the label, aria-label "Switch to English"/«تغییر به دری»), min 44×44.
- StickyCTA: WhatsApp first (`.btn-primary`), Call second (`.btn-secondary`), shadow, safe-area padding.

- [ ] **Step 1: Failing tests:** `telHref` has no spaces; `whatsappHref` round-trips Dari text via `decodeURIComponent`; Header renders brand «داکتر احسان جبران» by default and toggle button named "Switch to English"; clicking it shows "Dr. Ehsan Jebran".
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (mobile menu keeps existing focus/Escape behaviour; menu items ≥44px). **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: header, sticky WhatsApp-first CTA, SVG icons`.

### Task 5: Hero

**Files:** Modify `src/components/Hero.jsx`; Add `public/images/doctorEhsanPhoto-a.webp` (960×1280, `cwebp -q 78`); Test `src/components/Hero.test.jsx`

**Interfaces:** Consumes `content.hero`, `content.brand`, `getOpenStatus`, `formatTime`, `whatsappHref`, `telHref`.

Layout per spec wireframe: photo first on mobile (4:5, `<picture>` webp + jpeg, `width=960 height=1280`, `fetchpriority="high"`), H1 full name, specialty line ("Orthopedic & general surgeon, Kabul"), one quiet line "Surgeon since the late 1980s · Operates at Mawla Ali Hospital" (use a plain comma in FA), status line with dot: open → "Open now until 8:00 PM", later → "Opens today at 5:30 PM", tomorrow → "Opens tomorrow at 5:30 PM". CTAs WhatsApp (primary) + Call (secondary), text link to `#surgery`. Light background (Ward); no gradients; remove placeholder `onError`. Status re-evaluated each minute via `setInterval(60000)`.

- [ ] **Step 1: Failing tests** with `jest.useFakeTimers().setSystemTime(Date.UTC(2026,10,7,13,10))`: heading level 1 contains «داکتر محمد احسان وردک»; status text contains «باز است»; link named WhatsApp has `href` starting `https://wa.me/93789158627`.
- [ ] **Step 2:** FAIL → **Step 3:** implement → **Step 4:** PASS. **Step 5:** Commit `feat: surgeon hero with Kabul open status`.

### Task 6: Procedures section with body map

**Files:** Create `src/components/Procedures.jsx`, `src/components/BodyMap.jsx`; Test `src/components/Procedures.test.jsx`

**Interfaces:**
- `BodyMap({ regions, active: RegionId|null, onSelect(id) })`: single-stroke front-view SVG (viewBox `0 0 200 440`), stroke `#1E5B52` 2px, regions neck/chest/abdomen/groin/arms/legs/feet as `<g role="button" tabIndex=0 aria-pressed aria-label>` with Enter/Space handling; active fill `#1E5B52` at 0.85 opacity, `transition: fill-opacity 150ms`. Hidden below `md` (`hidden md:block`).
- `Procedures()`: `<section id="surgery">`, h2 «جراحی‌هایی که داکتر انجام می‌دهد» / "Operations he performs"; chip row (`role="group"`, buttons with `aria-pressed`) = All + 8 regions (skin is chip-only); selecting the active region again returns to All. List `<ul aria-live="polite">` of filtered procedures: name (font-medium), plain line (text-steel), specialty tag text (Orthopedic/General) – hairline separators, no cards. Under the list: `.btn-primary` WhatsApp using `contact.whatsappXrayMessage`, label "Send a photo of your X-ray or report".
- Initial render (All) includes all 22 `<li>`.

- [ ] **Step 1: Failing tests** (render in `en`): 22 list items initially; click chip "Groin" ⇒ items include "Hernia repair" and "Hydrocele and varicocele repair", exclude "Clubfoot correction", Groin `aria-pressed="true"`; click "Groin" again ⇒ 22; click "Neck" ⇒ exactly 1 item; X-ray CTA href contains `wa.me`.
- [ ] **Step 2:** FAIL → **Step 3:** implement → **Step 4:** PASS. **Step 5:** Commit `feat: where-does-it-hurt procedure finder`.

### Task 7: Consultations + About

**Files:** Create `src/components/Consultations.jsx`; Delete `src/components/Services.jsx`; Modify `src/components/About.jsx`; Test `src/components/About.test.jsx`

- Consultations: compact section after Procedures, h2 "Clinic visits", 3 items from `content.consultations` as a 3-column list (1 col mobile), no icons tiles, no emergency block.
- About: start-aligned; bio, credentials list, 3 `highlights` (plain heading + text, no gradient icon tiles, no quote box). All copy from content (delete hard-coded getters).

- [ ] **Step 1: Failing test:** rendering full `App` contains no text matching `/24\/7|Emergency Care Available/` and About renders 3 highlight headings.
- [ ] **Step 2:** FAIL → **Step 3:** implement → **Step 4:** PASS. **Step 5:** Commit `feat: clinic visits and surgeon about section`.

### Task 8: Locations, Contact, Footer

**Files:** Rewrite `src/components/ClinicInfo.jsx` as `Locations.jsx` (`#locations`); Modify `ContactForm.jsx` → rename `Contact.jsx`, `Footer.jsx`; Delete `FallbackMap.jsx`; Test `src/components/Contact.test.jsx`

- Locations: two cards. Clinic: name, address, hours via `formatTime`, single lazy map (IntersectionObserver as today, placeholder box until visible; iframe `title` from `ui.mapTitle`), one Directions `.btn-primary` + Copy address `.btn-secondary`, "What to bring" list. Hospital card: «شفاخانه مولا علی» / "Mawla Ali Hospital", note "Operations are performed here", no map.
- Contact: WhatsApp + Call buttons, phone with Copy, `abroadNote`, `emergencyNote`; Copy status in `<span aria-live="polite">`. Copy uses `navigator.clipboard?.writeText`; on missing API or rejection show `ui.copyFailed` ("Couldn't copy. Press and hold the number to copy it.") — never "Copied".
- Footer: brand short name, address/hours/phone from content, social links with `aria-label` "Facebook"/"Instagram", 44px targets, `.on-dark` class, email with `.break-anywhere`.

- [ ] **Step 1: Failing tests:** with `navigator.clipboard` undefined, clicking Copy shows the copyFailed text and not "Copied"; with a resolving mock, shows "Copied"; footer links named "Facebook" and "Instagram" exist; no element text contains "Need Directions".
- [ ] **Step 2:** FAIL → **Step 3:** implement → **Step 4:** PASS. **Step 5:** Commit `feat: locations, contact and footer rework`.

### Task 9: SEO, cleanup, RTL guard, full verification

**Files:** Modify `public/index.html`, `public/manifest.json` (name/short_name, `theme_color:#1E5B52`), `src/App.js` (section order: Hero, Procedures, Consultations, About, Locations, Contact, Footer), `src/App.test.js`, `tailwind.config.js` (remove `accent` alias); Create `src/rtl.guard.test.js`

- index.html: `<title>` "Dr. Ehsan Jebran – Orthopedic & General Surgeon in Kabul"; Dari + English meta descriptions (Dari as `description`, English as `og:description:en` not needed — use `og:locale fa_AF` + `og:locale:alternate en_US`); OG/Twitter titles updated; `theme-color #1E5B52`. JSON-LD `@type: "Physician"`, `name`, `alternateName` ["Dr. Ehsan","Dr. Jebran","Dr. Wardak","Mohammad Ehsan Jebran"], `medicalSpecialty` ["Surgical","Orthopedic"], `hospitalAffiliation {"@type":"Hospital","name":"Mawla Ali Hospital","address":{"addressLocality":"Kabul","addressCountry":"AF"}}`, `availableService`: 22 `MedicalProcedure` names (EN), `openingHours "Mo-Su 17:30-20:00"`, telephone `+93789158627`. GA `page_title` updated. Remove the "emergency medical services" wording.
- RTL guard test: read every file in `src/components/*.jsx` via `fs` and assert none matches `/flex-row-reverse|\b(ml|mr|pl|pr)-\d|\b(left|right)-\d|text-(left|right)\b/`.
- App test: default render has heading «جراحی‌هایی که داکتر انجام می‌دهد»; after toggling to English, heading "Operations he performs".

- [ ] **Step 1:** Write guard + App tests → run → FAIL where old classes remain.
- [ ] **Step 2:** Fix remaining offenders; remove `currentLanguage` alias usages; update head.
- [ ] **Step 3:** `CI=true npm test -- --watchAll=false` → all PASS. `npm run build` → "Compiled successfully". `npm run check:secrets` → passes.
- [ ] **Step 4:** Visual check (`npm start`) at 375px and 1280px in Dari and English: no horizontal scroll, sticky bar doesn't cover content, focus ring visible on header/footer, body map filters on desktop, chips on mobile. Screenshot both languages.
- [ ] **Step 5:** Commit `feat: surgeon SEO, RTL guard, final cleanup`.
