import { Metadata } from "next";
import Footer from "@/components/footer/Container";
import NavBar from "@/components/nav-bar/NavBar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import CookieConsent from "@/components/Cookies/CookieConsent";
import Error from "@/app/[locale]/error";
import SubscribeDialog from "@/components/speed-dial/SubscribeDialogue";

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
  manifest: "/site.webmanifest",
  generator: "Next.js",
  applicationName: "bt-verse",
  referrer: "origin-when-cross-origin",
  keywords: ["biotechnology", "universe", "science", "technology"],
  authors: [
    { name: "Nkengbeza Derick Ajong", url: "http://" },
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
  metadataBase: new URL("https://biotecuniverse.com"),
  alternates: {
    canonical: "/home",
    languages: {
      "en-US": "/en-US",
      "fr-FR": "/fr-FR",
    },
  },
  openGraph: {
    images: "../../../../public/images/logo.png",
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
