# monicavendituoli.com

A static personal site — no build step, no framework, no dependencies. Plain HTML, one CSS file, one small JS file. Anything with a text editor can edit it.

```
/
├── index.html              About Me (home)
├── work/index.html         My Work — 4 sections
├── blog/index.html         Blog index (post list)
├── blog/_template.html     Copy this to start a new post
├── 404.html
├── robots.txt
├── sitemap.xml
├── _headers                Cloudflare Pages security + cache headers
└── assets/
    ├── css/style.css       All styling + the color palette
    ├── js/main.js          Theme toggle, mobile nav, section scrollspy
    ├── img/                Photo + favicon
    └── files/              Downloadable PDFs (résumé, work samples)
```

---

## 1. Put it on GitHub

1. Go to <https://github.com/new>, name the repo `monicavendituoli-com`, keep it **Public**, don't add a README (this folder has one).
2. On the empty-repo page, click **uploading an existing file**.
3. Drag in *the contents of this folder* — `index.html`, `assets/`, `work/`, `blog/`, and the rest. (Drag the inner files, not the enclosing folder.)
4. Commit to `main`.

If you'd rather use the command line:

```bash
cd path/to/this/folder
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/monicavendituoli-com.git
git push -u origin main
```

## 2. Deploy with Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub, pick `monicavendituoli-com`.
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Save and Deploy.** You'll get a `*.pages.dev` URL in about a minute.

## 3. Point your domain at it

Because `monicavendituoli.com` is already in your Cloudflare account, this is two clicks:

1. In the Pages project → **Custom domains** → **Set up a custom domain**.
2. Add `www.monicavendituoli.com`. Cloudflare creates the CNAME for you.
3. Add `monicavendituoli.com` too, so the apex redirects to `www`.

Every `git push` to `main` redeploys automatically. Pull requests get preview URLs.

---

## Editing the site

### Changing colors

Everything lives in the `:root` block at the top of `assets/css/style.css`. Light mode is the default; the dark values are in the two blocks right below it. Change a token in one place and it propagates.

| Token | Light | Role |
| --- | --- | --- |
| `--bg` | `#fefae0` cornsilk | Page background |
| `--text` | `#283618` dark green | Body text |
| `--accent` | `#bc6c25` tiger's eye | Links, buttons, active nav |
| `--tag-bg` | `#606c38` moss @ 12% | Tag pills, hover states |
| `--wheat` | `#dda15e` | Blockquote rules, accents |

Dark mode uses a lightened accent (`#e0a05c`) because `#bc6c25` doesn't hit 4.5:1 contrast on a dark ground.

### Adding a work sample

Open `work/index.html` and find the section you want (`id="social"`, `"ai"`, `"earned"`, `"strategy"`). Inside its `<div class="grid">`, add:

```html
<article class="card">
  <div class="card__meta">
    <time datetime="2026-03-01">March 2026</time>
    <span class="tag">Category</span>
  </div>
  <h3>Title of the piece</h3>
  <p>One or two sentences on what it was and what it did.</p>
  <div class="card__foot">
    <a class="chip-link" href="/assets/files/name-of-file.pdf" download>Download PDF</a>
  </div>
</article>
```

For a downloadable PDF, drop the file in `assets/files/` and point `href` at it with the `download` attribute.

### Adding a blog post

1. Copy `blog/_template.html` to `blog/your-post-slug/index.html`.
2. Replace every `{{PLACEHOLDER}}`.
3. Add a card at the top of the grid in `blog/index.html` linking to `/blog/your-post-slug/`.
4. Add the URL to `sitemap.xml`.

### Turning on the résumé button

The button is written but commented out on `index.html` (search for `RÉSUMÉ BUTTON`) so the live site never shows a broken download. Save your résumé as `assets/files/monica-vendituoli-resume.pdf`, then delete the two `<!--` / `-->` lines around the link.

### What's in assets/files/

| File | What it is |
| --- | --- |
| `social-content-calendar-wealth-management.pdf` | Anonymized December calendar, RIA client |
| `social-content-calendar-529-plan.pdf` | Anonymized four-channel January calendar, 529 client |
| `social-media-strategy-wealth-management.pdf` | Anonymized strategy update, RIA client |
| `social-media-software-strategy-early-stage-ria.pdf` | Anonymized six-week platform stand-up plan |
| `press-release-homepace-series-a.pdf` | Series A release you wrote |
| `press-release-trelora-expansion.pdf` | Expansion release you wrote |
| `earned-media-and-pr-portfolio.pdf` | Full compilation, contact block redacted |

The four anonymized samples were rebuilt from the originals rather than redacted, because the client names in the source PDFs were baked into screenshots. Their source HTML is not in this repo — ask if you want it back to re-edit.

---

## Notes

- **No build step and no JavaScript framework** — the site works with JS disabled apart from the theme toggle and mobile menu.
- **Fonts** are Fraunces (headings) and Inter (body), loaded from Google Fonts with `display=swap` and system-font fallbacks.
- **Accessibility:** skip link, visible focus rings, semantic landmarks, `aria-current` on the active nav item, contrast checked in both themes.
- **SEO:** per-page `<title>`/description, canonical URLs, Open Graph tags, `Person` and `BlogPosting` structured data, sitemap, robots.txt.
