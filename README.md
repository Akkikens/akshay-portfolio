<h1 align="center">akshaykalapgar.com</h1>

<p align="center">
  <a href="https://akshaykalapgar.com" target="_blank">akshaykalapgar.com</a> is the portfolio of Akshay Kalapgar,
  AI agent engineer. Built with <a href="https://nextjs.org/" target="_blank">Next.js 16</a> and deployed on
  <a href="https://vercel.com/" target="_blank">Vercel</a> as a fully static export.
</p>

## The design

Apple-style liquid glass: a soft luminous background with slowly drifting color fields, layered
translucent glass panels, one coral accent, and a matching dark mode that follows the visitor's
system setting. No WebGL and no video. Full spec: [SPEC.md](./SPEC.md). Tokens:
[app/globals.css](./app/globals.css).

## Pages

- `/` the one-page portfolio: hero with portrait, About, Experience, case-study links, Projects,
  Open source, Credentials, Testimonials, Apps and Contact
- `/work/` case studies index, plus `/work/goldi/`, `/work/mcp-servers/` and `/work/wingline/`
  (content in [lib/caseStudies.ts](./lib/caseStudies.ts))
- `/privacy-policy/`

All copy lives in [lib/content.ts](./lib/content.ts) and [lib/caseStudies.ts](./lib/caseStudies.ts).

## SEO

- Per-page titles, descriptions and canonicals; Open Graph and Twitter cards with a build-time
  1200x630 share image ([lib/ogImage.tsx](./lib/ogImage.tsx))
- JSON-LD: Person, WebSite and ProfilePage on the homepage
  ([lib/jsonld.ts](./lib/jsonld.ts)); Article and BreadcrumbList on each case study
- `sitemap.xml` and `robots.txt` generated at build time; [public/llms.txt](./public/llms.txt)
  for language models
- **IndexNow:** the key is `0c929924cfbeb3ef9338c2ae3dadce00`, served at
  `https://akshaykalapgar.com/0c929924cfbeb3ef9338c2ae3dadce00.txt`
  (`public/0c929924cfbeb3ef9338c2ae3dadce00.txt`, also `site.indexNowKey` in
  [lib/site.ts](./lib/site.ts)). To ping after a deploy:

  ```bash
  curl -s "https://api.indexnow.org/indexnow" -H "Content-Type: application/json" -d '{
    "host": "akshaykalapgar.com",
    "key": "0c929924cfbeb3ef9338c2ae3dadce00",
    "keyLocation": "https://akshaykalapgar.com/0c929924cfbeb3ef9338c2ae3dadce00.txt",
    "urlList": ["https://akshaykalapgar.com/", "https://akshaykalapgar.com/work/"]
  }'
  ```

Copy rule: no em dashes or spaced dashes in anything a visitor or crawler reads. Use periods,
commas, colons or a middle dot.

## Stack

- Next.js 16 (App Router, `output: "export"`), React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` tokens, no config file)
- framer-motion 12 and Lenis smooth scrolling
- Geist and Geist Mono via `next/font`

## Development

```bash
npm install
npm run dev      # dev server on :3000
npm run build    # static export to out/
npm run lint
```

The previous site (v1) is preserved under [`legacy/`](./legacy/) for reference and is excluded
from the build.

## License

Open source, and you're welcome to learn from the code. If you reuse substantial parts, a credit
link back is appreciated.

## Author

**Akshay Kalapgar** · [GitHub](https://github.com/Akkikens) · [LinkedIn](https://www.linkedin.com/in/akshaykalapgar/) · [X](https://x.com/akshaykalapgar)
