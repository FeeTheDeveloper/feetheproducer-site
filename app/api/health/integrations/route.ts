import { integrationStatus } from "@/lib/integrations/env";
import { json } from "@/lib/integrations/responses";

export const dynamic = "force-dynamic";

/**
 * Reports which integrations have credentials in this environment. Returns
 * booleans and the *names* of missing variables only — never a value.
 */
export async function GET() {
  return json({ integrations: integrationStatus() });
}
