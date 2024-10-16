import "../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "./storeProvider";
import ClientLayout from "./ClientLayout";
import { ViewTransitions } from "next-view-transitions";

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
