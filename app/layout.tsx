import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SERVICES } from "@/lib/services";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Inter doubles as our display family until a premium display can be licensed.
// The CSS var name is kept distinct so the swap is one line in tailwind.config.
const displayFont = inter;

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ingenioushub.com"),
  title: {
    default: "Ingenious Hub — Strategic Branding & Digital Experience Studio",
    template: "%s · Ingenious Hub",
  },
  description:
    "A Jaipur-based strategic branding and digital-experience studio. We design the brands people choose — across edtech, D2C, fintech, healthcare, and B2B.",
  keywords: [
    "branding agency India",
    "creative agency Jaipur",
    "digital branding studio",
    "UI UX agency India",
    "brand strategy studio",
    "PR agency Jaipur",
    "Ingenious Hub",
    "website development Jaipur",
    "founder branding",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ingenious Hub — Strategic Branding & Digital Experience Studio",
    description: "We design the brands people choose.",
    url: "https://ingenioushub.com",
    siteName: "Ingenious Hub",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingenious Hub — Strategic Branding & Digital Experience Studio",
    description: "We design the brands people choose.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.svg" },
  // Address-bar tint per theme. White surface in light, warm graphite in dark.
  other: {
    "theme-color": "#FFFFFF",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#25221F" },
  ],
};

const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ingenioushub.com#organization",
    name: "Ingenious Hub",
    legalName: "Ingenious Hub Enterprise (P) Ltd.",
    url: "https://ingenioushub.com",
    logo: "https://ingenioushub.com/logo.svg",
    slogan: "We design the brands people choose.",
    foundingDate: "2016",
    description:
      "A strategic branding and digital-experience studio for ambitious brands.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-95870-15816",
        contactType: "Sales",
        email: "hello@ingenioushub.com",
        areaServed: ["IN", "AE", "GB", "US"],
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/ingenious-hub",
      "https://instagram.com/ingenioushub",
    ],
    areaServed: ["India", "United Arab Emirates", "United Kingdom", "Singapore"],
    knowsAbout: [
      "Brand Strategy",
      "Visual Identity",
      "UI/UX Design",
      "Web Development",
      "Performance Marketing",
      "Public Relations",
      "Founder Branding",
      "Advertising",
      "Creative Direction",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://ingenioushub.com#service",
    name: "Ingenious Hub",
    priceRange: "₹₹₹",
    parentOrganization: { "@id": "https://ingenioushub.com#organization" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "11",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.9124,
      longitude: 75.7873,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ingenioushub.com#website",
    url: "https://ingenioushub.com",
    name: "Ingenious Hub",
    publisher: { "@id": "https://ingenioushub.com#organization" },
    inLanguage: "en-IN",
  },
  // One Service entry per pillar — gives Google + AI surfaces a structured
  // read of what the studio offers, separately from the org schema.
  ...SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://ingenioushub.com/services#${s.id}`,
    name: s.title,
    serviceType: s.title,
    description: s.description,
    provider: { "@id": "https://ingenioushub.com#organization" },
    areaServed: ["India", "United Arab Emirates", "United Kingdom"],
    url: `https://ingenioushub.com/services#${s.id}`,
  })),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${mono.variable}`}
      style={{ ["--font-display" as string]: displayFont.style.fontFamily }}
      suppressHydrationWarning
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScroll />
          <Navbar />
          <main id="main" className="pt-[64px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {SCHEMAS.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </body>
    </html>
  );
}
