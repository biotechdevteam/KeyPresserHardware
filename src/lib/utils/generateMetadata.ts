import type { Metadata } from "next";
import { getDynamicMetadata } from "./metadataUtils";

export async function generateMetadata({
  params,
}: {
  params: { route: string };
}): Promise<Metadata> {
  const route = params.route || "/"; // Use '/' if route is undefined
  const metadata = await getDynamicMetadata(route); // Fetch metadata dynamically

  if (!metadata) {
    return {
      title: "BioTec Universe",
      description: "BioTec Universe is a biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    icons: metadata.icons,
    manifest: metadata.manifest,
  };
}
