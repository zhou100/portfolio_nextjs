import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { getOgImage, getSite } from '@/lib/portfolio';
import './globals.css';

// Self-hosted (Fontsource, OFL-1.1): the build no longer fetches from Google Fonts,
// whose extensionless font URLs break the Next 14.1 Google font loader.
const sourceSans = localFont({
  src: './fonts/source-sans-3-latin-wght-normal.woff2',
  weight: '200 900',
  display: 'swap',
  variable: '--font-sans',
});

// Body and headings below the home hero. Variable weight and optical size.
const sourceSerif = localFont({
  src: [
    { path: './fonts/source-serif-4-latin-opsz-normal.woff2', style: 'normal' },
    { path: './fonts/source-serif-4-latin-opsz-italic.woff2', style: 'italic' },
  ],
  weight: '200 900',
  display: 'swap',
  variable: '--font-serif',
});

// Labels, dates, status and figure numbers.
const plexMono = localFont({
  src: [
    { path: './fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500' },
  ],
  display: 'swap',
  variable: '--font-mono',
});

const site = getSite();

const description =
  'Metric design and evaluation for AI products: what the evidence supports, and what it does not.';

const ogImage = getOgImage();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Senior Data Scientist`,
    template: `%s · ${site.name}`,
  },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Senior Data Scientist`,
    description,
    url: '/',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Senior Data Scientist`,
    description,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable} ${plexMono.variable}`}>
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
