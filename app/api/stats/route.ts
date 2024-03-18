import { getMetaNamesStats } from "@/lib/metanames";

export async function GET() {
  const stats = await getMetaNamesStats();
  return Response.json(stats, { headers: { "Cache-Control": "max-age=600" } });
}
