# Aurelia Gourmet | Imperial Handpicked Dry Fruits

Aurelia Gourmet is a high-end, premium e-commerce landing experience designed for connoisseurs of the world's finest organic dry fruits, saffron, and luxury hampers. The platform integrates high-end interactive dynamics, cinematic aesthetic styles, and optimized asset delivery for a bespoke shopping experience.

---

## 💎 Cinematic Visual Design
- **Premium Gourmet Photography**: Every card features custom-crafted, photorealistic product imagery matching modern gourmet advertising standards—rich matte-black backdrops, gold accents, and detailed food textures.
- **Interactive Micro-Animations**: Features soft, radial gold glows and cards that scale smoothly on hover to draw the user's focus.
- **Dynamic Parallax Hero**: Floating product elements (Almonds, Cashews, Saffron) shift responsively based on scroll movements to create cinematic depth.
- **E-Commerce Utility**: A sleek side-drawer shopping cart dynamically tracks quantities, updates pricing totals, and previews items with instant visual feedback.

---

## 🚀 Key Performance Features
1. **IntersectionObserver Engine**: Custom script lazy loads media elements precisely as they approach the viewport, using a smooth blur-to-focus transition to maximize visual appeal and LCP performance.
2. **Dual-Ring Magnetic Cursor**: An interactive, customized cursor system that adapts to buttons and clickable areas with magnetic snapping indicators.
3. **Responsive Typography & Architecture**: Tailored for premium layouts across mobile, tablet, and ultra-wide desktops.

---

## 📂 Project Structure
```directory
aurelia-gourmet/
├── index.html          # Core HTML architecture, meta preloads, and inline recovery scripts
├── style.css           # Vanilla CSS layout, custom animations, variables, and responsive media queries
├── script.js           # IntersectionObserver engine, dual-ring cursor logic, and cart dynamics
├── .gitignore          # File exclusions list (editor settings, temporary caches, OS-specific files)
└── images/             # Ultra-high-resolution WebP product photographs and brand assets
    ├── california-gold-almonds.webp
    ├── velvet-ivory-cashews.webp
    ├── emperor-pistachios.webp
    ├── himalayan-walnut-reserve.webp
    ├── royal-medjool-dates.webp
    ├── imperial-saffron-collection.webp
    ├── luxury-gift-hamper.webp
    ├── premium-festival-box.webp
    ├── silk-road-apothecary.webp
    └── our-story.webp
```

---

## 🛠️ Local Setup and Installation
To open and preview the website locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/aurelia-gourmet.git
   cd aurelia-gourmet
   ```
2. **Launch a Local Server**:
   Since the project relies on ES modules and WebP resource loading, run it through a local HTTP server instead of directly opening the HTML file in a browser.

   - **Python** (Built-in):
     ```bash
     python -m http.server 8000
     ```
     Access via: `http://localhost:8000`

   - **NodeJS** (via `serve` package):
     ```bash
     npx serve
     ```
     Access via: `http://localhost:3000`

---

## 🌐 Production Deployment

### Option A: GitHub Pages (Free Hosting)
1. Commit and push your code to your GitHub repository's `main` branch.
2. Navigate to your repository page on GitHub.
3. Go to **Settings** > **Pages** (under the "Code and automation" section).
4. Set the **Source** to `Deploy from a branch`.
5. Select the `main` branch and folder `/ (root)`, then click **Save**.
6. Within minutes, your site will be live at `https://YOUR_USERNAME.github.io/aurelia-gourmet/`.

### Option B: Vercel (Recommended for instant deploys)
1. Go to [Vercel](https://vercel.com/) and link your GitHub account.
2. Click **New Project** and import your `aurelia-gourmet` repository.
3. Keep default build settings (since this is a static HTML/CSS project).
4. Click **Deploy**. Vercel will automatically host the project and supply an SSL-encrypted URL.

---

## 🏆 Development Best Practices
* **Keep Images Optimized**: Always use modern image formats like `.webp` with dimensions matching the layout bounds to maintain quick page load speeds.
* **Component-Level CSS**: Keep variables inside `:root` to easily adjust primary theme colors (`#D4AF37` Gold, `#0B0B0C` Matte Black) from a single source.
* **Semantic HTML**: Maintain clean HTML tags (`<section>`, `<article>`, `<header>`, `<footer>`) to secure a top-tier SEO ranking and high accessibility.
