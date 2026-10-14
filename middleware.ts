import { clerkMiddleware } from "@clerk/nextjs/server";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { isClerkConfigured } from "@/lib/integrations/env";

const withClerk = clerkMiddleware();

/**
 * Clerk only runs when its keys are present. Without this guard a deployment
 * that has no auth credentials — which is the normal state of the public
 * stream-first site — would fail every request, including the homepage.
 *
 * Routes are not protected here on purpose: API handlers check `auth()`
 * themselves so they can answer 401 in JSON rather than middleware's redirect.
 */
export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!isClerkConfigured()) {
    return NextResponse.next();
  }
  return withClerk(request, event);
}

export const config = {
  matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
