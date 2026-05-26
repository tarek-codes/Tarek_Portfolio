import { NextResponse } from "next/server";
import { fetchLeetCodeStatsServer } from "@/lib/api/leetcode";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const stats = await fetchLeetCodeStatsServer(username);
    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("LeetCode stats API error:", error);
    const fallbackStats = await fetchLeetCodeStatsServer(username);
    return NextResponse.json(fallbackStats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    });
  }
}
