import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { Metadata } from "next";

// Function to Fetch Metadata Dynamically
export async function getDynamicMetadata(route: string): Promise<Metadata> {
  try {
    const aboutData = await fetchAboutData();

    const defaultMetadata = {
      title: aboutData?.name || "BioTec Universe",
      description:
        aboutData?.history ||
        "BioTec Universe is a biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
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
    };

    // Route-Specific Metadata
    const routeMetadata: Record<string, Partial<typeof defaultMetadata>> = {
      "/": {},
      "/about": {},
      "/contact": {},
    };

    // Combine Default Metadata with Route-Specific Overrides
    return {
      ...defaultMetadata,
      ...routeMetadata[route],
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    // Fallback Metadata in case of an error
    return {
      title: "BioTec Universe",
      description:
        "BioTec Universe is a biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
    };
  }
}
