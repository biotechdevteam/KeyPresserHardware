import { Metadata } from "next";
import Custom404 from "../not-found";

export const metadata: Metadata = {
  title: "404 ~ Page Not Found ~ BioTec Universe",
  description:
    "Oops! The page you’re looking for doesn’t exist on BioTec Universe. Return to our homepage to explore more.",
  metadataBase: new URL("https://biotecuniverse.org"),
  alternates: {
    canonical: "/404", // Optional; could be omitted since it’s a catch-all
  },
  openGraph: {
    title: "404 ~ Page Not Found ~ BioTec Universe",
    description:
      "Oops! The page you’re looking for doesn’t exist on BioTec Universe.",
    url: "https://biotecuniverse.org/404",
    siteName: "BioTec Universe",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "BioTec Universe 404",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "404 ~ Page Not Found ~ BioTec Universe",
    description:
      "Oops! The page you’re looking for doesn’t exist on BioTec Universe.",
    images: ["/images/logo.png"],
    creator: "@BioTecUniverse",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CatchAllPage() {
  return <Custom404 />;
}
