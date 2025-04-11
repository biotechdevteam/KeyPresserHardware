import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "i.ibb.co",
      "placehold.co",
      "example.com",
      "img.freepik.com",
      "toukobanix.org",
    ],
  },
};

export default withNextIntl(nextConfig);
