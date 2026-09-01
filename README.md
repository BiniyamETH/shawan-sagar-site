# Shawan Sagar — Real Estate site

A futuristic, animation-heavy **34-page** site for **Shawan Sagar, Real Estate
Sales Representative (HomeLife Today Realty Ltd., Brokerage — Toronto)**.

- **Design** modelled on <https://insync-landingpage.vercel.app/>
- **Copy & contact details** based on <https://biniyameth.github.io/Shawan-Sagar/>
- Pure HTML / CSS / vanilla JS. No build step — every `.html` file is hand-edited directly.

---

## Run it

Serve the folder (the pages fetch nothing cross-page, but the JS files load with
a cache-buster, so a static server is cleanest):

```
python -m http.server 8000
# then visit http://localhost:8000
```

or use the VS Code "Live Server" extension.

---

## The 34 pages

The nav links go to real, separate pages:

| Nav             | File                | |
|-----------------|---------------------|-|
| (logo)          | `index.html`        | full landing page |
| What I Do       | `what-i-do.html`    | + 15 guide pages (`buyers`, `sellers`, `market-evaluation`, `staging`, `mortgages`, `negotiation`, `closing-day`, `pricing-your-home`, `first-time-buyers`, `selling-process`, `moving-checklist`, `relocating-to-the-gta`, `downsizing`, `investment-properties`, `testimonials`) |
| How It Works    | `how-it-works.html` | |
| About           | `about.html`        | |
| Homes           | `homes.html`        | the homes for sale — cards + photo-carousel popup (from `js/config.js`) |
| Areas           | `areas.html`        | + 10 area pages (`area-toronto.html` … `area-brampton.html`) |
| FAQ             | `faq.html`          | |
| Contact         | `contact.html`      | + `thank-you.html` |

Every page shares one header, footer (full site map), and set of effects.

### Editing pages

There's no generator — each `.html` file is the real, final page. Edit it
directly and refresh the browser; every page shares `css/styles.css` and
`js/main.js`, so a shared style/behaviour change is one edit in those files.

---

## Adding / updating homes for sale + their photos

**You do NOT need Netlify or any special host for this.** The data is one file,
`js/listings.js`. Updating photos = change that file (and add image files to
`/assets`), then get those onto wherever the site lives.

### Option A — the form (`admin.html`)

Open **`admin.html`** in a browser (double-click it, or Live Server). It works
entirely on your own computer.

1. **+ Add a home** → fill status / price / address / beds / baths / type / description
2. **+ Add photos from computer** → pick photo files (auto-shrunk, no separate upload)
   — or **+ Add photo by link** for a URL / an `/assets` filename
3. Reorder with **★ ‹ › ✕** (★ = cover)
4. **💾 Save** → first time it asks which file, pick `js/listings.js`; after that
   it's one click (Chrome/Edge; Firefox/Safari download it instead)

### Option B — by hand

Edit **`js/listings.js`** — each `{ }` block is one home:

```js
{
  status: "For sale",                       // For sale | Sold | Pending | Leased
  price: "$1,199,000",
  address: "42 Maple Grove Ave, North York",
  beds: 4, baths: 3, type: "Detached",
  blurb: "Renovated 4-bed on a 40-ft lot, walk to Yonge & Sheppard.",
  photos: [                                  // first = cover; add as many as you like
    "assets/42-maple-1.jpg",
    "https://example.com/some-photo.jpg"
  ],
  video: ""
}
```

Put photo files in **`/assets`** first, then reference them by name. Save +
refresh — the site updates, no rebuild.

### Getting the change onto the live site

Whatever the change, the updated `js/listings.js` (and any new files in
`/assets`) has to reach the host:

| Host type | How |
|-----------|-----|
| Shared hosting (GoDaddy, Bluehost, Hostinger, cPanel…) | web **File Manager** or an FTP app (FileZilla) — upload the changed files |
| GitHub Pages | GitHub website → **Add file → Upload files** into `assets/`, edit `js/listings.js` in place, commit |
| Cloudflare Pages / Netlify / Vercel | drag the folder onto their upload page, or push to the connected repo |
| Not online yet | nothing to do — just open `index.html` |

Netlify only removes that last upload step (see below) — it isn't required.

## Other media — `js/config.js`

| Setting        | What it controls                                                        |
|----------------|-----------------------------------------------------------------------|
| `heroSlides[]` | the hero background — cross-fades through this list of house **video clips** (or photos), `heroSlideSeconds` each, slow zoom |
| `heroSlideSeconds` / `heroClipSpeed` | how long each clip stays (default 7s) and its playback rate (default 1.5×) |
| `heroImage` / `heroVideo` | only used if `heroSlides` is emptied out (single photo, optional clip) |
| `enquireBg`    | **background photo** behind the "Get your free evaluation" form       |
| `formEndpoint` | where the enquiry form sends (`""` = opens the visitor's email app)  |

`heroSlides` entries are a photo URL or `{ video, poster }` for a clip — files in
`/assets` or any `https://` link. The `poster` shows instantly while its clip loads,
and also becomes the fallback if the clip ever fails to load.

> **Editing note:** `config.js` loads with a cache-buster, so a normal refresh
> shows your changes. If you ever still see the old media, hard-refresh (Ctrl+Shift+R).

## The enquiry form

The "07 — Enquire" section has a real form (name, email, phone, buy/sell,
area, message). Out of the box, submitting it opens the visitor's email app
with everything pre-filled, addressed to `Infodhakaauto@gmail.com` — no backend
needed. To receive submissions straight to an inbox instead, make a free
[Formspree](https://formspree.io) form and set `formEndpoint` in `js/config.js`
to its URL.

---

## Change the text

Page copy is hand-edited straight in each `.html` file — no generator, no
regeneration step. Phone / email appear as:

- `tel:+14168760773` and the visible `416.876.0773`
- `mailto:Infodhakaauto@gmail.com`
- office `416.298.3200`, fax `416.298.3440`

---

## Optional: Netlify — skip the upload step

Everything above works without Netlify. Netlify (free) just removes the "upload
the changed file" step: deploy the folder once (drag-and-drop, or connect a Git
repo) and Shawan gets a **visual admin that publishes on save**:

1. Add **[Decap CMS](https://decapcms.org)** (formerly Netlify CMS) — one small
   `admin/` folder + a `config.yml` describing the "Homes for sale" fields
   (status, price, address, beds, baths, photos…).
2. Turn on Netlify **Identity** + **Git Gateway** so he logs in at
   `yoursite.com/admin/`.
3. He fills the form, **drags photos straight in**, clicks **Publish** — Decap
   commits the change and Netlify rebuilds the site automatically. Photos are
   stored as real files, not embedded.

This would replace `admin.html` with a login-protected version. Ask and I'll
wire it up once the site is on Netlify.

Netlify also gives you **Netlify Forms** for free — point the enquiry form at it
instead of email/Formspree.

---

## Project structure

```
admin.html            form to add/edit the homes for sale (private, works offline)
index.html + 33 more .html   the real pages — hand-edit directly
css/styles.css         design system, layout, animations
js/config.js           hero / enquire-background / form media
js/listings.js         >>> the homes for sale <<<
js/main.js             reveals, particles, cursor, tilt, carousel, form
assets/                drop your own images / videos here
```

---

## Notes

- Respects `prefers-reduced-motion` — heavy effects (particles, custom cursor,
  parallax, hero video) switch off automatically for users who ask for that.
- Fully responsive with a slide-in mobile menu.
- The featured captions ("Sold · North York", etc.) and stock imagery are
  **placeholders** — replace them with real listings before going live.
