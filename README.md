# Yujun Zhou Portfolio

A personal portfolio for Yujun Zhou, focused on data science, AI product building, applied economics, selected projects, and published research. Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and plain CSS.

## Features

- **About**: Profile, strengths, and testimonials
- **Projects**: Built products with concise descriptions, stack chips, and links
- **Research and published work**: Publications with citation counts, code links, and article links
- **Skills**: Key technical proficiencies
- **Contact**: Email contact
- **Responsive Design**: Mobile-friendly and accessible UI
- **Static Export**: Configured for static site export and deployment (e.g., Vercel)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

3. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

   Note: stop `npm run dev` before running `npm run build`. This avoids mixed Next dev/build cache output in `.next/`.

## Project Structure

- `src/app/` – Main app, pages, and layout
- `src/app/about/` – About section
- `src/app/projects/` – Projects showcase
- `src/app/components/` – Navbar, Skills, Contact components
- `src/lib/portfolio.ts` – Portfolio data for about, projects, skills, research, and contact
- `public/profile.jpg` – Active profile image
- `DESIGN.md` – Typography, spacing, color, and layout guidance
- `archive/legacy-2026-04-14/` – Old generated output, starter assets, unused config, and legacy deployment files

## Deployment

This project is configured for static export and can be deployed to [Vercel](https://vercel.com/) or any static hosting provider.

## License

This project is for personal and demonstration purposes.
