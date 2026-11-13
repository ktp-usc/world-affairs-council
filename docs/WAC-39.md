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
node --test tests/landing-page.test.cjs
npx tsc --noEmit
npx eslint app/page.tsx components/newsletter-signup.tsx sanity/schemaTypes/landingPage.ts sanity/landingPageStructure.ts sanity/lib/landing-page.ts sanity/structure.ts sanity.config.ts
npm run build
```

The content checks evaluate the GROQ query against seeded documents and an uploaded image, exercise fallback/empty-list behavior, and render the page with edited content and an event limit. The build requires access to the existing Google Fonts and Sanity services.

## Prepared pull request

Title: **WAC-39: Landing page in sanity**

The PR description is in `docs/WAC-39-pr.md`. The branch remains local until a push is requested; a GitHub PR requires the branch to exist on GitHub.
