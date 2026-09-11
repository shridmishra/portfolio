import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "../context/provider";
import { ConditionalHeader } from "@/src/components/layout";

const info = {
  name: "Shrid Mishra",
  twitter: "@ShridMishra",
  description:
    "Design Engineer & Full-Stack Developer specializing in crafting captivating digital experiences, sleek user interfaces, and modern web applications.",
  url: "https://shrid.site",
  image: "https://shrid.site/assets/preview.png", 
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || info.url;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${info.url}/#person`,
      "name": info.name,
      "jobTitle": "Design Engineer & Full-Stack Developer",
      "url": info.url,
      "image": `${info.url}/assets/me.jpg`,
      "sameAs": [
        "https://twitter.com/shridmishra",
        "https://in.pinterest.com/shridmishra/_created/",
        "https://github.com/shridmishra"
      ],
      "knowsAbout": [
        "Design Engineering",
        "Full-Stack Development",
        "Frontend Engineering",
        "Next.js",
        "React",
        "TypeScript",
        "UI/UX Design"
      ],
      "description": info.description
    },
    {
      "@type": "WebSite",
      "@id": `${info.url}/#website`,
      "url": info.url,
      "name": "Shrid Mishra",
      "publisher": {
        "@id": `${info.url}/#person`
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shrid Mishra - Design Engineer & Full-Stack Developer",
    template: `%s | ${info.name}`,
  },
  description: info.description,
  keywords: [
    "Shrid Mishra",
    "Design Engineer",
    "Frontend Engineer",
    "Pinterest shridmishra",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: info.name, url: info.url }],
  creator: info.name,
  publisher: info.name,

  // Open Graph (for WhatsApp, LinkedIn, Discord, Facebook)
  openGraph: {
    type: "website",
    url: info.url,
    title: "Shrid Mishra - Design Engineer & Full-Stack Developer",
    description: info.description,
    siteName: info.name,
    images: [
      {
        url: info.image,
        width: 1200,
        height: 630,
        alt: `${info.name} Portfolio Preview`,
      },
    ],
  },

  // Twitter Card (Twitter/X)
  twitter: {
    card: "summary_large_image",
    site: info.twitter, 
    creator: info.twitter,
    title: "Shrid Mishra - Design Engineer & Full-Stack Developer",
    description: info.description,
    images: [info.image],
  },

  // Favicons / web manifest
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon/site.webmanifest", rel: "manifest" }
    ]
  },

  // SEO
  alternates: { canonical: "./" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, noimageindex: false },
  },
};

export const viewport: Viewport = {
  initialScale: 0.9,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
