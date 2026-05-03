import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ingenioushub.com"),
  title: {
    default: "Ingenious Hub — Energize Your Brand",
    template: "%s · Ingenious Hub",
  },
  description:
    "We turn brands into growth engines. Branding, websites, and performance marketing built to win attention, earn trust, and drive measurable revenue.",
  keywords: [
    "branding agency Jaipur",
    "digital marketing agency",
    "UI/UX design",
    "performance marketing",
    "PR agency India",
    "Ingenious Hub",
  ],
  openGraph: {
    title: "Ingenious Hub — We turn brands into growth engines.",
    description:
      "Branding, websites, and performance marketing built to drive measurable revenue.",
    url: "https://ingenioushub.com",
    siteName: "Ingenious Hub",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingenious Hub — We turn brands into growth engines.",
    description:
      "Branding, websites, and performance marketing built to drive measurable revenue.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ingenious Hub",
  url: "https://ingenioushub.com",
  logo: "https://ingenioushub.com/favicon.svg",
  slogan: "Energize Your Brand",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2-TA-8, Sector 2, Jawahar Nagar",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302004",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/ingenious-hub",
    "https://instagram.com/ingenioushub",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <FloatingCTA />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
