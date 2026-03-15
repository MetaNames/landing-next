import { getMetaNamesStats } from "@/lib/metanames";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const stats = await getMetaNamesStats();
    
    return Response.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "CDN-Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    
    return Response.json(
      { error: "Failed to fetch stats", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
