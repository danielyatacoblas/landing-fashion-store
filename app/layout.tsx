import type { Metadata, Viewport } from 'next';
import { Archivo, Hanken_Grotesk } from 'next/font/google';
import './globals.css';

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' });
const text = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-text', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://landing-fashion-store-danielyatacoblas-projects.vercel.app'),
  title: 'QAYTU — Alpaca teñida con plantas de los Andes',
  description: 'Prendas de alpaca teñidas con cochinilla, qolle y chilca, tejidas a mano y rastreables hasta quien las hizo. Demo de portafolio de Daniel Yataco.',
  openGraph: {
    title: 'QAYTU — Alpaca teñida con plantas de los Andes',
    description: 'Elige el tinte y conoce de dónde viene tu prenda.',
    images: ['/img/hero.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#f2eee9', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${text.variable}`}>
      <body>{children}</body>
    </html>
  );
}
