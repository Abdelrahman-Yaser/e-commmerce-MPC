# 🛍️ Storé — Product Card UI

A responsive Product Card UI built with **React + TypeScript**, consuming data from a Node.js/Express backend API.

---

## Layout Approach

The UI follows an **editorial/luxury retail aesthetic** — inspired by high-end fashion store interfaces. The layout is built around a clean vertical hierarchy:

- **Header**: Sticky navigation bar with the store logo and a cart icon that shows a live item count badge.
- **Hero Section**: A large centered typographic headline using a serif display font (Playfair Display) paired with a sans-serif body font (DM Sans) — creating a refined editorial contrast.
- **Category Filter Bar**: A horizontal row of pill-shaped filter buttons that trigger live API calls to `/api/products?category=` — allowing users to browse by product category without a page reload.
- **Product Grid**: A CSS Grid layout using `auto-fill` with `minmax(280px, 1fr)` — cards flow naturally across any number of columns based on the available width.
- **Product Card**: Each card follows a consistent structure — image on top, content below — with the price, variant selector, and CTA button anchored to the bottom of the card using `flex-direction: column` and `margin-top: auto`.
- **Cart Sidebar**: A slide-in panel from the right that sits above a blurred overlay, keeping the user in context while reviewing their cart.

---

## Responsiveness Considerations

- **Fluid Grid**: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` ensures the product grid automatically reflows from 4 columns on desktop down to 2 or 1 column on smaller screens — no media queries needed for the grid itself.
- **Clamp Typography**: The hero title uses `clamp(2.5rem, 6vw, 4.5rem)` so the font size scales fluidly between mobile and desktop without hard breakpoints.
- **Mobile Breakpoint**: At `640px` and below, horizontal padding is reduced and the grid switches to `minmax(240px, 1fr)` to better fit smaller screens.
- **Cart Sidebar**: Uses `max-width: 95vw` so it never overflows on narrow screens.
- **Images**: All product images use `object-fit: cover` inside a fixed `aspect-ratio: 4/3` container — ensuring consistent card heights regardless of the original image dimensions.
- **Touch-friendly**: All buttons and interactive elements have adequate padding for comfortable tap targets on mobile.

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — fast development build tool
- **CSS Custom Properties** — for consistent theming
- **Context API + useReducer** — for cart state management (no external library)

---

## Run Locally

```bash
npm install
npm run dev
```

App runs at: **http://localhost:5173**

> Make sure the backend API is running on port 3001 before starting the frontend.
