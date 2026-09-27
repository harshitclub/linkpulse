# ⚡ LinkPulse Frontend

A simple, minimalist URL shortener and click analytics dashboard built with **Next.js** and **Vanilla CSS** (Shadcn-inspired aesthetic, default Light mode).

---

## 🎨 Design System

- **Default Light Theme**: Crisp, high-contrast monochrome design (`#ffffff` background with `#09090b` accents and `#e4e4e7` borders).
- **Minimal Border Radius**: Sharp `4px` corners matching modern UI aesthetics (Shadcn / Vercel style).
- **Pure Vanilla CSS**: Styled completely in `app/globals.css` without external UI frameworks.
- **Beginner Friendly**: Simple React state (`useState`, `useEffect`), clean folder structure, and easy-to-read code.

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── globals.css           # Vanilla CSS design system (Light/Dark themes)
│   ├── layout.js             # Root layout with default Light theme
│   └── page.js               # Main Dashboard page
├── components/
│   ├── Navbar.jsx            # Top navigation bar with live API status
│   ├── CreateLinkForm.jsx    # Form to create shortened links
│   ├── LinkCard.jsx          # Single link item with copy, analytics, & delete
│   └── AnalyticsModal.jsx    # Analytics breakdown (browsers, OS, referrers, history)
├── services/
│   └── api.js                # Simple fetch wrapper for the backend API
└── README.md
```

---

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. Open **[http://localhost:3000](http://localhost:3000)** in your browser.
