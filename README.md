# Frontline Lawyers — website

The Frontline Lawyers site (the "Blue Edition" design), built as a fast static site.
No frameworks and no npm packages to install: one small Node build script turns the
content files into plain HTML pages.

## Pages

- Home, Our expertise (all 16 practice areas, filterable), one page per practice area
- Our firm (Adam Ashley), Our approach, Your questions (searchable), Contact
- Privacy, Legal information, 404, enquiry thank-you page

## Editing content

Most text lives in JSON, so you rarely need to touch the HTML templates.

| What | File |
| --- | --- |
| Phone, email, address, locations, featured areas | `src/data/site.json` |
| Practice areas (headline, overview, help list, checklist, FAQs, related) | `src/data/practice-areas.json` |
| Questions page | `src/data/questions.json` |
| Page layouts | `src/templates/pages.mjs` |
| Header, footer, shared blocks | `src/templates/partials.mjs` |
| Styles | `src/assets/css/styles.css` |
| Menus, accordions, filters, form | `src/assets/js/main.js` |

## Run it locally

Needs Node 18 or newer.

```bash
npm run dev        # builds into dist/ and serves http://localhost:4321
npm run build      # build only
```

## Deploy on Netlify

`netlify.toml` already sets the build command (`npm run build`) and publish folder (`dist`).

1. In Netlify: **Add new site → Import an existing project → GitHub** and pick this repo.
2. Leave the build settings as detected and deploy.
3. To swap it onto frontlinelawyers.com.au, point the existing site at this repo instead
   (Site configuration → Build & deploy → Link repository) so the domain stays put.

### Contact form

The enquiry form uses **Netlify Forms** (form name `contact`, with a honeypot for spam).
After the first deploy, go to **Forms → Form notifications → Add notification → Email** and
set it to `adam@frontlinelaw.com.au` so every enquiry lands in his inbox.

### Old links

`netlify.toml` 301-redirects the previous site's URLs (`/about-adam`, `/faqs`,
`/practice-areas/...` and so on) to the matching new pages, so Google results and
saved links keep working.

## Credits

Fonts: Playfair Display and DM Sans (SIL Open Font License, files in `src/assets/fonts`).
Some icon shapes are adapted from Lucide (ISC licence). Landscape, courthouse and room
images are illustrative.
