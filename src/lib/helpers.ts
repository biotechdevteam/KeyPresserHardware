export const extractUsername = (
  url: string | undefined
): string | undefined => {
  if (!url) return undefined;

  // This regex will match anything that follows the .com/ part of the URL
  const matches = url.match(/(?:https?:\/\/)?(?:www\.)?[^\/]+\.com\/([^\/]+)/);

  return matches && matches[1] ? `@${matches[1]}` : undefined;
};

export const extractDomain = () => {
  if (typeof window !== "undefined") {
    // Access the full URL from the window object
    // const { protocol, host } = window.location;
    // return `${protocol}//${host}`; // Extract the domain
  }
  return "https://www.biotecuniverse.org";
};
