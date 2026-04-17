# Buffy the Buffalo — BG Parks Chatbot
## Deployment Guide

---

## What's in this package

```
buffy-vercel/
├── api/
│   └── chat.js                ← The server (handles API calls + web search)
├── public/
│   └── widget-snippet.html    ← The widget — demo page + embed code for bgparks.org
├── vercel.json                ← Vercel config (don't change this)
├── package.json               ← Project info (don't change this)
└── README.md                  ← You are here
```

---

## Step 1 — Create a GitHub repo

1. Go to **github.com** → click **+** → **New repository**
2. Name it `buffy-bgparks`, set to **Private**, click **Create**
3. On the repo page click **"uploading an existing file"**
4. Drag in everything inside the `buffy-vercel` folder (all files + the `api/` and `public/` subfolders)
5. Click **Commit changes**

---

## Step 2 — Deploy to Vercel

1. Go to **vercel.com** → **Add New Project** → **Import Git Repository**
2. Connect your GitHub account and select `buffy-bgparks`
3. Click **Deploy** — done in ~30 seconds
4. Copy your URL (e.g. `https://buffy-bgparks.vercel.app`)

---

## Step 3 — Add your Anthropic API key

1. In Vercel go to your project → **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key (starts with `sk-ant-...`)
   - Check all three boxes: Production, Preview, Development
3. Click **Save**
4. Go to **Deployments → Redeploy** so it picks up the key

---

## Step 4 — Test your demo

Visit `https://your-project.vercel.app/widget-snippet.html` in your browser.
Buffy should appear in the bottom-right corner and respond to questions.
This URL is your shareable demo link — send it to anyone!

---

## Step 5 — Embed on bgparks.org

1. Open `public/widget-snippet.html` in a text editor
2. Find this line near the bottom:
   ```
   const API_URL = 'https://YOUR_VERCEL_URL.vercel.app/api/chat';
   ```
3. Replace `YOUR_VERCEL_URL` with your actual Vercel project URL
4. Copy everything between `<!-- START WIDGET -->` and `<!-- END WIDGET -->`
5. Paste it into your site's HTML just before the closing `</body>` tag
6. Add this to your site's `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
   ```
7. Save and publish — Buffy is live on bgparks.org!

---

## How web search works

When a visitor asks something specific, Buffy automatically searches bgparks.org
and answers from the live site. No manual updates needed — if your website
changes, Buffy reflects it automatically.

---

## Costs

- **Vercel:** Free (hobby tier is more than enough)
- **Anthropic API:** ~$0.003 per conversation
- A busy day with 100 conversations ≈ $0.30

---

## Questions?

Reach out to whoever set this up, or visit docs.anthropic.com for API docs.
