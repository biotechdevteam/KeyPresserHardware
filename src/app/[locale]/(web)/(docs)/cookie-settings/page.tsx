import { Metadata } from "next";
import CookieSettings from "@/components/Cookies/CookieSettings";

export const metadata: Metadata = {
  title: "Cookie Settings ~ BioTec Universe",
  description:
    "Manage your cookie preferences for BioTec Universe, a biotechnology association in Buea, Cameroon.",
  keywords: [
    "BioTec Universe",
    "cookie settings",
    "cookies",
    "privacy",
    "biotechnology",
    "Cameroon",
    "Buea",
    "data",
  ],
  metadataBase: new URL("https://biotecuniverse.org"),
  alternates: {
    canonical: "/cookie-settings",
    languages: {
      "en-US": "/en-US/cookie-settings",
      "fr-FR": "/fr-FR/cookie-settings",
    },
  },
  openGraph: {
    type: "website",
    url: "https://biotecuniverse.org/cookie-settings",
    title: "Cookie Settings ~ BioTec Universe",
    description:
      "Manage your cookie preferences for BioTec Universe, a biotechnology association in Buea, Cameroon.",
    siteName: "BioTec Universe",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Cookie Settings by BioTec Universe",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Settings ~ BioTec Universe",
    description:
      "Manage your cookie preferences for BioTec Universe, a biotechnology association in Buea, Cameroon.",
    images: ["/images/logo.png"],
    creator: "@BioTecUniverse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function CookiesPage() {
  return <CookieSettings />;
}
