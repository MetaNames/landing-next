import { getMetaNamesStats } from "@/lib/metanames";

export async function GET() {
  const stats = await getMetaNamesStats();
  return Response.json(stats);
}
