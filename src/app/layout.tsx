import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { getSite } from '@/lib/portfolio';
import './globals.css';

const sourceSans = Source_Sans_3({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Senior Data Scientist`,
    template: `%s · ${site.name}`,
  },
  description:
    'Experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Senior Data Scientist`,
    description:
      'Experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Senior Data Scientist`,
    description:
      'Experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body>
        <a className="skiplink" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
