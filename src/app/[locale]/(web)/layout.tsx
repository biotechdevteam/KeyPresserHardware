import { Metadata } from "next";
import Footer from "@/components/footer/Container";
import NavBar from "@/components/nav-bar/NavBar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import CookieConsent from "@/components/Cookies/CookieConsent";
import Error from "@/app/[locale]/error";
import SubscribeDialog from "@/components/speed-dial/SubscribeDialogue";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "BioTec Universe ~ Bio-Technology Association Cameroon",
  description:
    "Discover BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by 2024/2025 Master's graduates from the University of Buea’s Biochemistry Department.",
  keywords: [
    "biotechnology",
    "BioTec Universe",
    "Cameroon",
    "science",
    "technology",
    "biochemistry",
    "Buea",
    "University of Buea",
  ],
  metadataBase: new URL("https://biotecuniverse.org"),
  icons: {
    icon: "/favicon-48x48.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/site.webmanifest",
  generator: "Next.js",
  applicationName: "BioTec Universe",
  referrer: "origin-when-cross-origin",
  authors: [
    { name: "Nkengbeza Derick Ajong" },
    {
      name: "Nyochembeng Enzo Nkengafack",
      url: "https://nyochembeng-enzo-01.vercel.app/",
    },
  ],
  creator: "Ngameleu Siatag Williams Anderson",
  publisher: "Nyochembeng Enzo Nkengafack",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/home",
    languages: {
      "en-US": "/en-US",
      "fr-FR": "/fr-FR",
    },
  },
  openGraph: {
    type: "website",
    url: "https://biotecuniverse.org/",
    title: "BioTec Universe ~ Bio-Technology Association Cameroon",
    description:
      "Join BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by 2024/2025 Master's graduates from the University of Buea.",
    siteName: "BioTec Universe",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "BioTec Universe Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioTec Universe ~ Bio-Technology Association Cameroon",
    description:
      "Discover BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by University of Buea graduates.",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return (
      <div className="flex flex-col min-h-screen">
        <header>
          <NavBar aboutData={aboutData} />
        </header>

        <main className="flex-grow mt-24">
          {children}
          <Analytics />
          <SpeedInsights />
          <CookieConsent />
          <SubscribeDialog />
          <ScrollToTopButton />
        </main>

        <footer>
          <Footer aboutData={aboutData} />
        </footer>
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={
          error.message ||
          "Failed to load data at root layout. Please try again."
        }
      />
    );
  }
}
