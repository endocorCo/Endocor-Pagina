# ENDOCOR — Premium Digital Studio

## Project Structure

```
endocor/
├── index.html      ← Main HTML — edit content here
├── style.css       ← All styles — edit colors/layout here
├── script.js       ← All logic — edit portfolio projects here
├── vercel.json     ← Vercel deployment config
└── README.md       ← This file
```

No build step required. No dependencies. No Node.js.
Pure HTML + CSS + JS — deploys instantly.

---

## Deploy to Vercel via GitHub

### Step 1 — Create GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it `endocor` (or any name)
4. Set it to **Public** or **Private**
5. Click **Create repository**

### Step 2 — Upload files
Upload all four files directly through the GitHub web interface:
- `index.html`
- `style.css`
- `script.js`
- `vercel.json`

Or use Git:
```bash
git init
git add .
git commit -m "Initial deploy"
git remote add origin https://github.com/YOUR_USERNAME/endocor.git
git push -u origin main
```

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `endocor` repository
4. Leave all settings as default (Vercel detects static automatically)
5. Click **Deploy**

Your site will be live at `https://endocor.vercel.app` (or your custom domain).

---

## Adding Portfolio Projects

Open `script.js` and find the `projects` array near the top:

```js
const projects = [
  {
    title:    'MARARE',
    category: 'E-Commerce de Lujo',
    url:      'https://tu-sitio.com',  // ← paste the live URL here
    desc:     'Descripción breve del proyecto'
  },
  // add more objects here...
];
```

Set `url` to the live site URL. Leave `url` empty (`''`) to show a placeholder slot.
After editing, commit and push — Vercel redeploys automatically.

---

## Fonts

Loaded from **Google Fonts CDN** — no local font files needed.
- **Michroma** — display / headings
- **Outfit** — body text

Internet connection required for fonts to load correctly.

---

## Color Tokens (edit in `style.css`)

| Token       | Value     | Usage                    |
|-------------|-----------|--------------------------|
| `--bg`      | `#F8FAFC` | Main background          |
| `--surface` | `#FFFFFF` | Cards and panels         |
| `--navy`    | `#1B232B` | Headings, primary text   |
| `--petrol`  | `#2F3E46` | Secondary text           |
| `--steel`   | `#5B6670` | Body text                |
| `--mist`    | `#8896A2` | Captions, muted labels   |
| `--sage`    | `#8DA67A` | Primary accent           |
| `--sage-l`  | `#A3B18A` | Light sage fills         |
| `--sand`    | `#E6DCC6` | Warm accent              |

---

© 2025 ENDOCOR. All rights reserved.
