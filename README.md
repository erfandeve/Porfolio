# Amirreza Khoshniat — Virology Portfolio

A trilingual (English / Deutsch / فارسی), 3D portfolio site for **Amirreza Khoshniat, M.Sc. in Medical Virology**.
Built with React 19, Vite, three.js / react-three-fiber and Framer Motion.

![stack](https://img.shields.io/badge/React-19-39ff14?style=flat-square) ![stack](https://img.shields.io/badge/three.js-r185-39ff14?style=flat-square)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5187
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## What is in the site

| Section | Content |
| --- | --- |
| Hero | Animated 3D virion (icosahedral capsid, glycoprotein spikes, RNA genome, orbiting satellite particles) |
| About | Portrait, biography, quick facts, key figures |
| Research | Four research focus areas + animated 3D double helix |
| Publications | 4 entries, filterable (journal articles / congress abstracts), each with its DOI or Civilica link |
| Experience | 6 laboratory and teaching positions on a glowing timeline |
| Education | B.Sc. Laboratory Sciences, M.Sc. Medical Virology |
| Skills | 4 groups × 4 techniques with animated proficiency bars |
| Talks & Courses | Congress presentations + workshops and certificates |
| Languages | Persian and English, per-skill rings |
| Contact | Email, phone, LinkedIn, address, CV download, mail-to contact form |

## Editing the content

All text lives in two files, and every string is an object with `en`, `de` and `fa` keys:

- `src/data/profile.js` — name, role, contact details, biography, research focus, headline figures
- `src/data/cv.js` — education, experience, publications, talks, courses, skills, languages

UI chrome (menu labels, buttons, form labels) lives in `src/i18n/strings.js`.

Adding a publication is one object in the `publications` array:

```js
{
  id: 'my-paper',
  kind: 'journal',            // 'journal' | 'congress'
  title: { en: '…', de: '…', fa: '…' },
  venue: { en: '…', de: '…', fa: '…' },
  date:  { en: '…', de: '…', fa: '…' },
  year: '2026',
  link: 'https://doi.org/…',
  linkLabel: 'doi.org/…',
  summary: { en: '…', de: '…', fa: '…' },
  tags: ['influenza', 'ngs'],
}
```

## Assets

- `public/amirreza.png` — portrait (transparent background)
- `public/AmirrezaKhoshniat-CV.pdf` — CV offered as a download
- `public/virus.svg` — favicon and loader mark

## Language & direction

The language is detected from the browser and stored in `localStorage`. Choosing **FA** switches
`<html dir>` to `rtl`; the layout uses CSS logical properties, so every section mirrors automatically,
and the typeface switches to Vazirmatn.

## 3D scene notes

`src/three/` holds the WebGL work:

- `Virion.jsx` — capsid lattice, coiled RNA genome, instanced spikes, fresnel envelope shader
- `ParticleField.jsx` — drifting aerosol particles
- `OrbitingVirions.jsx` — satellite particles
- `HeroScene.jsx` — canvas, lighting, bloom / chromatic aberration / vignette, quality tiers
- `HelixScene.jsx` — double helix used in the research section

Quality degrades automatically on small screens and slow devices (fewer spikes and particles,
lower DPR, post-processing switched off), and all motion respects `prefers-reduced-motion`.

## Deploying

The output in `dist/` is fully static — Netlify, Vercel, GitHub Pages or any web host will serve it:

```bash
npm run build
# then upload the dist/ folder
```

---

# راهنمای فارسی

پورتفولیوی سه‌بعدی و سه‌زبانه (انگلیسی، آلمانی، فارسی) برای **امیررضا خوش‌نیت، کارشناسی ارشد ویروس‌شناسی پزشکی**.

## اجرا

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:5187` را باز کنید.

## ویرایش محتوا

تمام متن‌ها در دو فایل زیر قرار دارد و هر رشته سه حالت `en` و `de` و `fa` دارد:

- `src/data/profile.js` — نام، عنوان، اطلاعات تماس، بیوگرافی، زمینه‌های پژوهشی و آمار
- `src/data/cv.js` — تحصیلات، سوابق شغلی، مقالات، ارائه‌ها، دوره‌ها، مهارت‌ها و زبان‌ها

برچسب‌های رابط کاربری (منو، دکمه‌ها، فرم) در `src/i18n/strings.js` است.

برای افزودن مقاله تازه کافی است یک شیء جدید به آرایه‌ی `publications` اضافه کنید و لینک DOI یا سیویلیکا را در فیلد `link` بگذارید.

## خروجی نهایی

```bash
npm run build
```

پوشه‌ی `dist/` را روی هر هاست استاتیک (مثل Netlify یا Vercel) آپلود کنید.

---

## Deploying to Vercel

The repository is a plain Vite app, so Vercel detects everything automatically:

1. **Import the repo** at [vercel.com/new](https://vercel.com/new) → pick `erfandeve/Porfolio`.
2. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`, install `npm install`.
3. Press **Deploy** — no environment variables are needed.

Every push to `main` redeploys automatically.
