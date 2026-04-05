# Template-Club-Arcade

A slick, single-page scrolling website that doesn’t just sit there looking pretty
it *moves*, it *vibes*, it *flexes*.

Built with **React + Vite + TypeScript + Tailwind** and sprinkled with **Framer Motion** so your UI has that smooth butter glide instead of PowerPoint energy.

The current content? Just filler.
Think of this as a blank arcade cabinet waiting for your game cartridge.

---
## Spotted In The Wild

This template didn’t stay in the lab for long.
It’s already out there, shape-shifting into different identities depending on who’s driving.

Different vibes. Same engine.

*  Horizon - Cloud Computing Club → https://horizon-cc.github.io/Horizon/

----

## Quick Start (aka “let’s not overthink this”)

**You’ll need:** Node.js 18+ (ancient relics not supported)

```bash
git clone <your-repo-url>
cd Template-club-arcade
npm install
npm run dev
```

Now open your browser and boom, you’re in.

Want to build it like a responsible adult?

```bash
npm run build
npm run preview
```

---

## Image Optimization (aka stop nuking performance)

* If your image is 500KB+, it’s not an asset, it’s a liability
* Convert everything to WebP. JPEG is on life support (yeah, I dont follow my preaching)
* If the image displays at 300px, don’t ship a 2000px monster
* Aim for <200KB. Your users are not here to download wallpapers
* Use loading="lazy" unless it’s above-the-fold (don’t be that guy)
* Compress your images using Squoosh or TinyPNG
* Raw exports from AI/tools = instant pain. Optimize or perish

---

## Where The Magic Lives (aka “what do I edit?”)

This project is built so you don’t go digging through 47 folders just to change one sentence.

Here’s your control panel:

* **Page layout / section order:** `src/App.tsx`
  → rearrange like LEGO

* **Hero section (first impression = everything):** `src/pages/hero.tsx`
  → headline, buttons, vibe check

* **Navbar links:** `src/components/NavBar.tsx`
  → don’t leave your socials in 2012

* **About section:** `src/data/aboutdata.tsx`
  → tell your story (or fake one, no judgement)

* **Partners:** `src/data/partnerdata.tsx`
  → real or fictional, we support both

* **Achievements:** `src/data/achievementdata.tsx`
  → flex responsibly

* **Projects:** `src/data/projectdata.tsx`
  → your actual work goes here pls

* **Team / members:** `src/data/leadmembersdata.tsx`
  → assemble the squad

* **Contact section:** `src/pages/contact.tsx`
  → make it easy for people to reach you, don’t ghost

💡 Pro tip:
Don’t like a section?
Delete it from `App.tsx` and move on with your life.

---

## Images (two paths, choose your fighter)

### 1) `public/` → quick and dirty

Drop files in `public/` and call them like:

```
/image.png
```

Perfect for:

* favicon
* static stuff you don’t want to think about

---

### 2) `src/assets/` → the “I care about optimization” route

This is the good stuff. Vite will optimize, hash, and make your images behave.

**Workflow:**

1. Drop images in `src/assets/images/**`
2. Update `src/data/images.tsx`
3. Use them in your data files

Where things go:

* Projects → `src/assets/images/projects/`
* About → `src/assets/images/about/`
* Partners → `src/assets/images/partners/`
* Footer logo → `src/assets/images/footer/`

⚡ Lazy hack:
Keep the same filenames and just replace the files. Done.

---

## Make It Yours (don’t ship the demo, please)

Here’s your glow-up checklist:

* [ ] Rewrite the Hero (`hero.tsx`) → brand, tagline, energy
* [ ] Remove/reorder sections in `App.tsx`
* [ ] Replace all demo text (seriously… all of it)
* [ ] Swap images with your own or AI-generated ones
* [ ] Update `index.html` (title + favicon)

If it still looks like a template after this… that’s on you

---

## Deploy (aka “release it into the wild”)

Already wired for GitHub Pages:

```bash
npm run deploy
```

Then go to:
**GitHub → Settings → Pages**

* Source: `Deploy from a branch`
* Branch: `gh-pages`

And you’re live. No rituals required.

---

## License

MIT
Do whatever you want, just don’t act like you built React.

