import { NextResponse } from "next/server";

import type { IntegrationName } from "@/lib/integrations/env";

const NO_STORE = { "cache-control": "no-store" } as const;

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

/** An integration this route needs has no credentials in this environment. */
export function integrationUnavailable(integration: IntegrationName) {
  return json(
    {
      error: "integration_unavailable",
      integration,
      message: `${integration} is not configured in this environment.`,
    },
    503,
  );
}

export function unauthorized() {
  return json({ error: "unauthorized" }, 401);
}

export function badRequest(message: string) {
  return json({ error: "bad_request", message }, 400);
}

export function serverError(message = "Unexpected error.") {
  return json({ error: "server_error", message }, 500);
}
