# WAC-31: About Us and Events

About Us is a single document at **Studio > About Us**. Editors can change its heading, tagline, mission, introduction and origins paragraphs, images, national network copy and link, statistics, annual reports (upload a PDF or use an existing URL), and history timeline. Array order controls display order. Empty arrays remove a list. Until a field is populated, the original About Us copy is used.

**Studio > Event** controls the homepage upcoming cards, guest event list and month calendar, speaker detail pages, and automatic registration links from the Distinguished Speaker Series schedule. New slugs work without rebuilding. Dates and times are Eastern time; enter times as `10:00 AM`. Speaker Series and Global Speaker events have guest detail pages. Book Club and Student events appear on the homepage and link to their program pages. Uploaded speaker photos override the preserved local photo path.

Existing Speaker registration overrides still take precedence for the registration embed; the Event registration link is used when no override exists. Updates are checked every 60 seconds. Deleted events disappear rather than returning from a hardcoded list. Community and News routes and navigation links have been removed, including links in previously saved header menus.

## Content transfer before release

`sanity/seed/wac31.ndjson` contains the existing About Us content and 16 events copied from main, including slugs, dates, biographies, registration URLs, and local image paths. No live dataset changes are made by the code or build.

After reviewing the content, import it into the intended dataset from this checkout using an authenticated Sanity CLI:

```powershell
npx sanity dataset import sanity/seed/wac31.ndjson <dataset> --missing
```

`--missing` preserves existing documents with the same IDs. Review any existing Event documents before import to avoid duplicate events with the same slug under different IDs. Old sample events without a slug, type, and start/end times are excluded from the public listings until completed. The event listings intentionally have no static fallback: import these records before deploying this branch. The About Us document ID must be `aboutPage`; use the dedicated Studio entry to edit it.

## Verification

Completed locally: production build, TypeScript check, Sanity schema extraction, seed/query checks for all 16 events (including deletion and empty-list behavior), and HTTP checks for the homepage, About Us, guest listing, and both removed routes. About Us was also checked in the browser. Live edits and populated event-page rendering remain to be checked after content import.

Check `/about`, `/`, `/get-involved/guests` (list and calendar), and a speaker page such as `/get-involved/guests/warrick`. Confirm the preserved Wild Apricot registration still loads. Publish an Event edit and an About Us edit in a test dataset and allow up to a minute for them to appear. Confirm `/news` and `/about/community` return 404.
