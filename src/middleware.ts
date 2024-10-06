import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match to all paths
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
