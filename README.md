# Litchee Lab Interactive Homepage

An interactive Homepage and presentation map for `litchee.site`.

## Included

- Flat-colour and watercolour Fab Lab maps
- Five interactive hotspots: Learners, Educators, Public, Research and About
- 45% focused map + 55% translucent story panel
- Slide navigation, keyboard controls and presentation mode
- Responsive mobile layout
- Replaceable links for future Notion-backed pages

## Edit content and links

All five chapters, slide copy, hotspot positions and target links are collected
in the `sections` array near the top of `app/page.tsx`. Change each `href` to
the final `litchee.site/...` or Notion-backed URL when those pages are ready.

## Run locally

```bash
npm install
npm run dev
```

Then open the address printed in the terminal.
