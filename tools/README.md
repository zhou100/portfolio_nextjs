# tools

## `og-card.html`

Source for `public/og.png`, the Open Graph share image. It is not served — it is
rendered once and the PNG is committed.

To regenerate after changing the headline or palette:

1. `npm run build` and serve `out/` on `http://localhost:4321`.
2. Copy this file into the served directory (`cp tools/og-card.html out/_og.html`)
   so the font loads same-origin — a `file://` page cannot load the woff2 across
   origins.
3. Screenshot the `.og` element at 1200x630 into `public/og.png`.
4. Remove `out/_og.html`.

The `@font-face` src points at the hashed Source Sans 3 latin subset that
`next/font` emits. Check the hash in `out/_next/static/css/*.css` after a Next.js
or font upgrade; it changes.
