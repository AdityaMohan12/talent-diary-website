import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Caveat,
} from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const SITE = "https://talentdiary.in";

export const metadata: Metadata = {
  // Apex, matching the 308 in vercel.json that sends www to apex. Google
  // indexed the www URL, so its favicon fetch was landing on a redirect rather
  // than the icon. Pointing the canonical at the host the server actually
  // serves lets Google consolidate onto one place and read the icon directly.
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  title: "Talent Diary | Startup hiring done right",
  description:
    "Talent Diary fills niche tech and non-tech roles for high-growth startups with a deeply vetted shortlist in under 30 days. Built by operators who hired at Unacademy, Interview Kickstart, 91Springboard and Awign.",
  applicationName: "Talent Diary",
  // Declared explicitly rather than left to the app-directory file convention.
  // That convention appends a build hash to the URL, so every deploy minted a
  // new favicon URL and Google's favicon cache never had a stable target.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Talent Diary",
    title: "Talent Diary | Startup hiring done right",
    description:
      "A deeply vetted shortlist in under 30 days, for niche tech and non-tech roles at high-growth startups.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talent Diary | Startup hiring done right",
    description:
      "A deeply vetted shortlist in under 30 days, for niche tech and non-tech roles at high-growth startups.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${caveat.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
