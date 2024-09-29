import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
  },
  // Enabling static export
  output: "export",
  // Base path is useful if you're deploying to a subpath in a domain
  basePath: "",
  // Disable server-side features to allow for static export
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
