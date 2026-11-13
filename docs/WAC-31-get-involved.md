# WAC-31 part 2: Get Involved pages

Each Get Involved page is a single document under **Studio > Get Involved**: Get Involved, Become a Member, Be a Guest, Volunteer, Ways to Give, and Sponsor a Speaker. Editors can change the banner text and photo, section headings, paragraphs, lists, photos and captions, and the member quote. Array order controls display order, and an empty list hides that list. Layout, buttons and section order stay in code.

Any field left empty shows the current copy from `app/get-involved/_data/get-involved-content.ts`. If Sanity can't be reached, the pages show that copy too. Published changes appear within 60 seconds.

These stay in code because other pages use them too:

- Guest fees and arrival time (also on the speaker pages)
- Wild Apricot and Google Form links (also on Join and in the forms)
- Council phone, email and mailing address (also in the footer)
- The speaker schedule and sponsor form on Sponsor a Speaker (from WAC-17)
- The events list on Be a Guest (Studio > Event)

## Content transfer before release

`sanity/seed/wac31-get-involved.ndjson` contains today's exact copy for all six pages. Its photos point at the files in `public/`, and the import uploads them. Nothing on the live dataset changes until someone runs the import.

From the repo root, with the Sanity CLI logged in:

```powershell
npx sanity dataset import sanity/seed/wac31-get-involved.ndjson production --missing
```

`--missing` skips any page document that already exists, so running it twice is safe.

## Verification

Checked locally: TypeScript, lint, and Sanity schema validation. All six queries were run against the seed file, and every text field matches today's copy. Screenshots of all six pages at desktop and phone width were compared against main with Sanity unreachable. Text and layout are identical, apart from sub-pixel anti-aliasing where a sentence used to be split around a value.

To check after import: open each page in Studio, change a heading, publish, and confirm the page updates within a minute.
