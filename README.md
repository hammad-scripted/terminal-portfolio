# Mohammad Hammad Ansari — Terminal Portfolio

A responsive, interactive terminal-style developer portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The site includes real project links, live GitHub and LeetCode telemetry, an interactive command prompt, and a downloadable résumé.

## Highlights

- Interactive commands: `help`, `about`, `stack`, `projects`, `github`, `leetcode`, `resume`, `contact`, `theme`, and `clear`
- Responsive CRT-inspired terminal interface with green and amber display modes
- Career, stack, selected projects, live coding activity, résumé, and contact sections
- GitHub contribution streak and activity graph for `hammad-scripted`
- LeetCode stats and heatmap for `hammad_codes`
- Accessible keyboard-friendly command input and reduced-motion support
- Automatic GitHub Pages deployment on every push to `main`
- Social preview metadata and branded Open Graph image

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run build
npm run build:pages
npm run lint
```

## Deploy to GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`. It builds the static site and publishes `pages-dist` whenever `main` is updated.

1. Push the repository to GitHub as `hammad-scripted/terminal-portfolio`.
2. Open **Repository → Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for `Deploy portfolio to GitHub Pages` to finish.
5. The default URL will be `https://hammad-scripted.github.io/terminal-portfolio/`.

The static build uses relative asset paths, so the same output works at the repository URL and at a custom domain.

## Connect a GoDaddy domain

Assume the purchased domain is `example.com`. GitHub recommends configuring the custom domain in GitHub before adding DNS records.

### 1. Add the domain in GitHub

Go to **Repository → Settings → Pages → Custom domain**, enter `www.example.com`, and select **Save**.

Because this project deploys through a custom GitHub Actions workflow, a `CNAME` file is not required; GitHub stores the domain in the Pages settings.

### 2. Add records in GoDaddy

Open **GoDaddy Domain Portfolio → your domain → DNS → Add New Record** and add these records:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 1 hour |
| A | `@` | `185.199.109.153` | 1 hour |
| A | `@` | `185.199.110.153` | 1 hour |
| A | `@` | `185.199.111.153` | 1 hour |
| CNAME | `www` | `hammad-scripted.github.io` | 1 hour |

Important: the `www` CNAME points to `hammad-scripted.github.io`, without `https://` and without `/terminal-portfolio`. Remove or replace any conflicting GoDaddy parking records for `@` or `www`, but do not change MX records used by email.

If you only want `portfolio.example.com`, add one CNAME with name `portfolio` and value `hammad-scripted.github.io`, then enter `portfolio.example.com` as the custom domain in GitHub Pages.

### 3. Finish HTTPS setup

DNS propagation can take up to 24–48 hours. When GitHub shows the DNS check as successful, enable **Enforce HTTPS** in the Pages settings. GitHub will automatically redirect between the apex domain and `www` when both are configured correctly.

Official references: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub Actions publishing](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [GoDaddy A records](https://www.godaddy.com/help/add-or-edit-an-a-record-42546), and [GoDaddy CNAME records](https://www.godaddy.com/en-au/help/add-a-cname-record-19236).

## Project structure

```text
app/                         Next.js page, metadata, and styles
static-site/                 Static GitHub Pages entry
public/                      Résumé, profile photo, and social image
.github/workflows/           Automatic Pages deployment
vite.pages.config.ts         Static build configuration
```

## Personal links

- GitHub: https://github.com/hammad-scripted
- LeetCode: https://leetcode.com/u/hammad_codes/
- LinkedIn: https://www.linkedin.com/in/mohammad-hammad-64ba2b229/
- Email: hammad.scripted@gmail.com

## License

MIT
