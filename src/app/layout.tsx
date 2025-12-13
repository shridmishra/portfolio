import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "../context/provider";
import { ConditionalHeader } from "@/src/components/layout";

const info = {
  name: "Shrid",
  twitter: "@ShridMishra",
  description:
    "Design Engineer specializing in creating captivating digital experiences with a focus on aesthetics and functionality.",
  url: "https://shrid.in",
  image: "https://shrid.in/assets/preview.png", 
};

export const metadata: Metadata = {
  metadataBase: new URL(info.url),
  title: {
    default: `${info.name} - Design Engineer`,
    template: `%s | ${info.name}`,
  },
  description: info.description,
  keywords: [
    "Shrid Mishra",
    "Design Engineer",
    "Frontend Engineer",
    "LinkedIn shridmishra",
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
    title: `${info.name} | Full-Stack Developer`,
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
    title: `${info.name} | Full-Stack Developer`,
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
  alternates: { canonical: info.url },
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
