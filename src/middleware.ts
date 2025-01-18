import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)", // Skip static assets and internals
    "/(api|trpc)(.*)", // Always protect API routes
    "/profile", // Explicitly include the /profile route
  ],
};
