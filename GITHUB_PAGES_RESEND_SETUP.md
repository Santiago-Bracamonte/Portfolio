# GitHub Pages + Resend (Form Contact)

GitHub Pages is static, so `api/contact.js` does not run there.
Use the included Cloudflare Worker as your backend endpoint.

## 1) Deploy the Worker

```bash
npm create cloudflare@latest
# or install wrangler globally if you already use it
npm i -g wrangler

cd cloudflare
wrangler login
wrangler deploy
```

This prints a URL like:

`https://portfolio-contact.<subdomain>.workers.dev`

Your form endpoint will be:

`https://portfolio-contact.<subdomain>.workers.dev/api/contact`

## 2) Configure Worker secrets

Run these from the `cloudflare/` folder:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_TO_EMAIL
wrangler secret put CONTACT_FROM_EMAIL
wrangler secret put ALLOWED_ORIGIN
```

Recommended values:
- `CONTACT_TO_EMAIL`: your inbox email
- `CONTACT_FROM_EMAIL`: `Portfolio Contact <onboarding@resend.dev>` (or your verified domain)
- `ALLOWED_ORIGIN`: your GitHub Pages URL, for example `https://your-user.github.io`

## 3) Point frontend to Worker URL

Edit [js/contact-config.js](js/contact-config.js) and set:

```js
window.CONTACT_API_URL = "https://portfolio-contact.<subdomain>.workers.dev/api/contact";
```

## 4) Commit and push

```bash
git add .
git commit -m "Use Cloudflare Worker for contact form on GitHub Pages"
git push
```

## Notes
- If you see `Request failed`, open browser DevTools Network tab and inspect the `POST` to your worker URL.
- If Resend says domain not verified, use `onboarding@resend.dev` or verify your domain in Resend.
