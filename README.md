# Studio Glow

Create a premium 3D portfolio website for a Graphic Designer. Use React + Tailwind and JavaScript/JSX only; do NOT use TypeScript. The site should feel like a high-end creative studio portfolio, visually impressive and production-ready.

Design direction:
- Dark near-black background with tasteful off-white typography and vivid electric accent gradients.
- Strong 3D visual language: floating abstract 3D geometric forms, glassmorphism cards, subtle depth/parallax, perspective grids, soft glow, layered shadows, and scroll-based motion. Prefer CSS 3D/transforms and lightweight animation; avoid heavy 3D dependencies unless truly needed.
- Typography should be modern/editorial with very large display headlines and clean readable body text.
- Smooth micro-interactions: magnetic-looking buttons, hover tilt on project cards, animated underline, image reveal, subtle cursor-follow glow, and section entrance animations.
- Fully responsive across mobile, tablet, desktop. Keep interactions touch-friendly on mobile.
- Make accessibility and performance good: semantic HTML, readable contrast, reduced-motion support, optimized lazy-loaded project imagery/placeholders.

Pages/sections:
1. Hero: designer name placeholder "Mannu Khan", title "Graphic Designer & Visual Creative", short punchy intro, primary CTA "View My Work", secondary CTA "Let's Work Together". Include an impressive animated 3D centerpiece on the right/behind the hero.
2. Selected Work: 6 project cards with large visual mockups/placeholders and categories such as Brand Identity, Packaging, Social Media, Poster Design, UI Visuals, 3D Product Art. Each card should have hover depth and a visible case-study affordance.
3. About: concise designer bio, skill tags, tools (Adobe Photoshop, Illustrator, After Effects, Figma, Blender), and a stats row such as 5+ Years Experience, 100+ Projects, 40+ Happy Clients (editable placeholder content).
4. Services: Brand Identity, Social Media Design, Packaging Design, Poster & Campaign Design, UI/Visual Design, 3D Product Visualization.
5. Process: Discover → Concept → Design → Refine → Deliver, shown as an engaging timeline.
6. Testimonials: 3 polished testimonial cards with placeholder names/roles.
7. CTA contact section with email placeholder, "Start a Project" button, and social links placeholders (Instagram, Behance, Dribbble, LinkedIn).
8. Footer with simple navigation and copyright.

Add a sticky transparent navbar with logo/name and links to Work, About, Services, Process, Contact. Include an active-section indicator.

Content should be easy to edit from one data/config area where practical. Use reusable components. Include a small floating availability badge like "Available for select projects".

Make the initial homepage visually complete rather than a wireframe. Use polished placeholder images from reliable public image URLs only where needed; otherwise create CSS-based abstract 3D visuals so the design does not depend on missing local assets.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/de2f5e4c-f568-40c7-9647-e0a39204dfc6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
