# HomeGlow — Cleaning & Interior Design Service

A responsive HTML, CSS and JavaScript mini-project for CSE-2340 MP3–MP4.

## Features
- Service sections for home cleaning, room decoration and move-in refresh.
- Task-based illustrative male/female team categories.
- Decor inspiration fetched from DummyJSON using `fetch()` and `async/await`.
- Search and price sorting; API loading, error and empty states.
- Booking form with date/time selection and validation.
- Booking requests saved in `localStorage`, restored after refresh, and removable.
- Contact phone/email placeholders (replace before publishing).

## Run locally
Open `index.html` in a browser. If your browser blocks local requests, use VS Code **Live Server**:
1. Open this folder in VS Code.
2. Install the “Live Server” extension.
3. Right-click `index.html` → **Open with Live Server**.

Internet is required for the DummyJSON API and remote photos.

## API
`https://dummyjson.com/products/category/home-decoration?limit=20`

The displayed BDT amount is an illustrative conversion (API USD price × 110), not a live exchange rate.

## Before publishing
Replace `+8801700000000` and `hello@homeglow.example` with real contact details. Booking is a browser-side demo only; it does not send bookings to a server or email. Team categories are sample content.

## MP3–MP4 checklist
- [x] DOM manipulation and dynamic rendering
- [x] `addEventListener()`, arrays, objects, `filter()`, `forEach()`
- [x] External API with `fetch()`, `async/await`
- [x] Loading, error and empty states
- [x] Local Storage persistence
