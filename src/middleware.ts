import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except /api, /_next, /favicon.ico, /sitemap.xml, and /robots.txt
  matcher: ["/((?!api|_next|favicon.ico|sitemap.xml|robots.txt).*)"],
};
