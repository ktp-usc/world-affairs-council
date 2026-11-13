# WAC-39: Landing page in sanity

Based on main at `958440e` (including the updated program gallery photos).

Open `/studio` and select **Landing Page**. Each section opens its own single document with the current main content prefilled:

- **Hero slideshow:** slide order, photos, descriptions, headings, body copy, buttons, slideshow label and timing. The first slide supplies the page's H1.
- **Programs & photos:** multiline heading, introduction, program links, all-programs link, photo order, images and descriptions.
- **Upcoming events:** heading, calendar link, card count, details link text and empty-state message/link. **Landing Page > Events** opens the existing shared event records for titles, dates, times, locations and registration links.
- **About the Council:** photo, image description, mission, heading, paragraphs and links. Report and national-network links follow About Us by default; select “Use destination above” to override a link here.
- **Newsletter signup:** heading, description, open/close button text, accessible form labels and the HTTPS signup form URL. The existing lazy-loading form and anchor behavior are preserved.
- **Sponsors & supporters:** heading, introduction, sponsor order, names, logos, image descriptions and optional website links.
- **Member shortcut:** visibility, text and destination.

**Header Menu (shared)** opens the existing header editor. The header and footer remain the shared site shell; the new documents control the landing page's main content. Event records and the shared About Us report/network links retain their existing sources.

Upload an image to replace a preserved site image. An uploaded image takes precedence over “Existing image path”; removing the upload restores that path. The initial public images are optimized copies of the photos on current main, including the WAC-35 gallery.

Publish a section to make it visible on the website. Published content is checked every 60 seconds; drafts are not shown. Missing documents or fields retain the original landing content, including during a landing-content fetch failure. Empty link, paragraph and sponsor lists remain empty. The hero and photo slideshows require at least one image.

## Initial content

No live dataset is changed by this branch, build, or tests. Creating a section through its folder entry prefills it from `sanity/defaults/landing-page.json`; publish it when ready. Landing documents are excluded from the new-document menu and cannot be duplicated or deleted through the Studio actions.

For an optional bulk transfer into a reviewed dataset, `sanity/seed/wac39.ndjson` contains the same seven singleton documents with stable IDs and image paths. Run the following from an authenticated checkout only when ready to publish that content:

```powershell
npx sanity dataset import sanity/seed/wac39.ndjson <dataset>
```

Do not add `--replace` unless intentionally overwriting previously edited landing documents. The import publishes the seed content. It is not required for editing through Studio.

## Validation

```powershell
npm test
npx tsc --noEmit
npx eslint app/page.tsx components/newsletter-signup.tsx sanity/schemaTypes/landingPage.ts sanity/landingPageStructure.ts sanity/lib/landing-page.ts sanity/structure.ts sanity.config.ts
npm run build
```

The checks open the actual Sanity structure, resolve all seven initial-value templates, validate good and invalid documents with Sanity's validator, evaluate every editable field through GROQ, check uploads on all four image surfaces, exclude unpublished drafts, and exercise fallback/empty-list behavior. They also render edited page content and test the newsletter and carousel interactions. The build requires access to the existing Google Fonts and Sanity services.

## Regression audit

Result: 47 automated checks passed, together with TypeScript, changed-file lint, schema extraction, and the production build. Run `npm test` to repeat the full checked-in suite.

The first browser audit reproduced `List items with same ID found (landingEvents)`. The Upcoming events singleton and the shared Events records had the same sibling navigation ID. Schema extraction and the earlier page-rendering tests did not exercise this navigation. The shared-records entry now uses `landingEventRecords`; `landingEvents` still opens the same settings document, preserving its ID and saved content. The new real Structure Builder test fails on the original code and passes after the fix.

After rebuilding, all seven section editors opened with their prefilled fields, and the shared Events and Header Menu entries also opened successfully. The page was checked at 1280px and 390px without horizontal overflow or broken loaded images. All 16 unique landing images returned HTTP 200 both directly and through Next image optimization. The slideshow controls and newsletter toggle worked in the browser; the real external newsletter form loaded without submitting it.

The read-only production audit also found separate setup/content conditions:

- No landing-section documents were published or saved as drafts. Editors therefore see prefilled new documents, and the website displays the intended fallback until sections are edited and published.
- There were 34 published event records, but none met all the shared query's required fields (`slug.current`, `date`, `start`, `end`, `kind`). This explains the homepage's empty event message. Complete and publish valid event records using the existing Event editor; do not guess missing schedules or overwrite existing records.
- Sanity allowed `http://localhost:3000` and `http://localhost:3333`. The earlier `http://127.0.0.1:3039` preview was blocked by CORS. Use an allowed local origin; deployment origins must also be registered before using embedded Studio there.
- The PR's Vercel preview redirected to Vercel sign-in. Its deployed editor could not be tested from the signed-out session.

No live records, uploads, origin settings, or subscriptions were changed. Actual saving/publishing and server cache propagation after a real publication remain untested against production; document validation and published-query behavior were verified with isolated data instead. Form submission was not tested. Full repository lint reported 12 existing unused-variable warnings and no errors.

## Original pull request

Title: **WAC-39: Landing page in sanity**

The original change was merged in [PR #42](https://github.com/ktp-usc/world-affairs-council/pull/42). The navigation regression fix and expanded tests are on `WAC-39-fix-landing-page-sanity`.
