import type { Metadata } from "next";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "./storeProvider";
import ClientLayout from "./ClientLayout";
import { ViewTransitions } from "next-view-transitions";
import { StepProvider } from "@/contexts/ApplicationStepContext";

export const metadata: Metadata = {
  title: "Biotech Universe Group",
  description:
    "A biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
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
  // <meta name="apple-mobile-web-app-title" content="BT Verse" />
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale: params.locale });

  return (
    <ViewTransitions>
      <html lang={params.locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            <ClientLayout>
              <StoreProvider>
                <main className="bg-background">{children}</main>
              </StoreProvider>
            </ClientLayout>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
