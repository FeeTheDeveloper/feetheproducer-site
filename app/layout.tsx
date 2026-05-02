import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SplashScreen } from "@/components/ui/splash-screen";
import { SITE } from "@/lib/site";

import "./globals.css";

const openGraphImage = {
  url: SITE.images.logo,
  width: 1280,
  height: 1280,
  alt: `${SITE.name} logo`
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  logo: `${SITE.url}${SITE.images.logo}`,
  sameAs: Object.values(SITE.social)
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: {
    "@type": "Organization",
    name: SITE.legalName
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Fee The Producer",
    "buy beats",
    "music licensing",
    "beat store",
    "exclusive beats",
    "premium beats",
    "veteran-owned music brand"
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Music",
  alternates: {
    canonical: SITE.url
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: "en_US",
    images: [openGraphImage]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: "@feetheproducer",
    site: "@feetheproducer",
    images: [SITE.images.logo]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [{ url: SITE.images.logo, type: "image/png" }],
    apple: SITE.images.logo
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-bone antialiased">
        <JsonLd data={[organizationStructuredData, websiteStructuredData]} />
        <SplashScreen />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widerx focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
