import { Metadata } from "next";
import Footer from "@/components/footer/Container";
import NavBar from "@/components/nav-bar/NavBar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import CookieConsent from "@/components/Cookies/CookieConsent";

export const metadata: Metadata = {
  title: "BioTec Universe",
  description:
    "BioTech Universe is a biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
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
  appleWebApp: {
    title: "BT Verse",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/apple-touch-icon.png",
      {
        url: "/apple-touch-icon.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  manifest: "/site.webmanifest",
  generator: "Next.js",
  applicationName: "bt-verse",
  referrer: "origin-when-cross-origin",
  keywords: ["biotech", "universe", "science"],
  authors: [
    { name: "Nkengbeza Derick Ajong", url: "http://"},
    { name: "Nyochembeng Enzo Nkengafack", url: "https://nyochembeng-enzo-01.vercel.app/" },
  ],
  creator: "Ngameleu Siatag Williams Anderson",
  publisher: "Nyochembeng Enzo Nkengafack",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://biotecuniverse.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr-FR': '/fr-FR',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>

      <main className="flex-grow mt-24">
        {children}
        <CookieConsent />
        <ScrollToTopButton />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
