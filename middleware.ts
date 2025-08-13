import {
  auth,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

// Define routes that need authentication protection
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

// Define public routes that should be accessible without auth
const isPublicRoute = createRouteMatcher([
  "/",
  "/home(.*)",
  "/about(.*)",
  "/cart(.*)",
  "/contact(.*)",
  "/doors(.*)",
  "/properties(.*)",
  "/order-confirmation(.*)",
  "/news(.*)",
  "/listings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect routes that are explicitly marked as protected
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  // Let Next.js handle 404s for routes that don't exist
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
