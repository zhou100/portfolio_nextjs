# Welcome to HolyHub

HolyHub is a curated showcase of generative AI applications, where cutting-edge tools meet creative problem-solving. Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/), this site highlights innovative projects, technical skills, and provides a platform for exploring the latest in generative AI.

## Features

- **About**: Introduction and mission statement
- **Projects**: Curated generative AI applications, each with descriptions, tech stack, source code, and live demos or publication links
- **Skills**: Key technical proficiencies in AI, machine learning, and software development
- **Contact**: Email contact for collaboration or inquiries
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

## Project Structure

- `src/app/` – Main app, pages, and layout
- `src/app/about/` – About section
- `src/app/projects/` – Projects showcase
- `src/app/components/` – Navbar, Skills, Contact components
- `src/lib/portfolio.ts` – Data for about, projects, skills, and contact
- `public/` – Static assets
- `infrastructure/` – Deployment and monitoring configs (Vercel, New Relic)

## Deployment

This project is ready for static export and can be deployed to [Vercel](https://vercel.com/) or any static hosting provider.

## License

This project is for personal and demonstration purposes.
