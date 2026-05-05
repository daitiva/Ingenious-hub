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
    default:
      "Ingenious Hub — A creative & digital growth partner for ambitious brands",
    template: "%s · Ingenious Hub",
  },
  description:
    "Ingenious Hub is a Jaipur-based creative and digital growth studio building branding, websites, and performance systems that compound revenue for ambitious brands across India, the GCC, and beyond.",
  keywords: [
    "branding agency India",
    "creative agency Jaipur",
    "digital marketing studio",
    "growth marketing partner",
    "UI UX design agency",
    "performance marketing",
    "Ingenious Hub",
    "PR agency Jaipur",
    "brand strategy India",
    "founder branding",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Ingenious Hub — A creative & digital growth partner for ambitious brands",
    description:
      "Branding, websites, and performance — built as one engine for brands that want to dominate.",
    url: "https://ingenioushub.com",
    siteName: "Ingenious Hub",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ingenious Hub — A creative & digital growth partner for ambitious brands",
    description:
      "Branding, websites, and performance — built as one engine for brands that want to dominate.",
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
  icons: {
    icon: "/favicon.svg",
  },
};

const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ingenioushub.com#organization",
    name: "Ingenious Hub",
    legalName: "Ingenious Hub Enterprise (P) Ltd.",
    url: "https://ingenioushub.com",
    logo: "https://ingenioushub.com/favicon.svg",
    slogan: "We turn brands into growth engines.",
    foundingDate: "2016",
    description:
      "A creative & digital growth partner for ambitious brands. Branding, websites, and performance marketing as one system.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2-TA-8, Sector 2, Jawahar Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302004",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-99999-99999",
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
      "Lead Generation",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://ingenioushub.com#service",
    name: "Ingenious Hub",
    image: "https://ingenioushub.com/favicon.svg",
    priceRange: "₹₹₹",
    parentOrganization: { "@id": "https://ingenioushub.com#organization" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2-TA-8, Sector 2, Jawahar Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302004",
      addressCountry: "IN",
    },
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ingenioushub.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
];

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
