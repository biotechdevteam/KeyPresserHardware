import { withNextVideo } from "next-video/process";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com", "i.ibb.co", "placehold.co", "img.freepik.com"],
  },
};

export default withNextVideo(withNextIntl(nextConfig));