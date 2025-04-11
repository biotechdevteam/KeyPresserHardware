"use client";
import { Metadata } from "next";
import CustomError from "./CustomError";

// Define metadata as a function since it’s dynamic
export async function generateMetadata({
  error,
}: {
  error?: Error | string;
}): Promise<Metadata> {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "An unexpected error occurred";

  return {
    title: "Error ~ BioTec Universe",
    description: `Something went wrong on BioTec Universe: ${errorMessage}. Please try again later.`,
    metadataBase: new URL("https://biotecuniverse.org"),
    openGraph: {
      title: "Error ~ BioTec Universe",
      description: `Something went wrong: ${errorMessage}.`,
      url: "https://biotecuniverse.org/error",
      siteName: "BioTec Universe",
      images: [
        {
          url: "/images/logo.png",
          width: 1200,
          height: 630,
          alt: "BioTec Universe Error",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Error ~ BioTec Universe",
      description: `Something went wrong: ${errorMessage}.`,
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
}

export default function Error({ error }: { error: Error | string }) {
  return <CustomError error={error} />;
}
