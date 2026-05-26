// LeetCode API Types
export interface LeetCodeStats {
  totalSolved: number;
  ranking: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

// Fallback data for when API is unavailable
const FALLBACK_DATA: LeetCodeStats = {
  totalSolved: 200, // Update this manually when needed
  ranking: 0,
  easySolved: 120,
  mediumSolved: 60,
  hardSolved: 20,
};

const LEETCODE_STATS_QUERY = `query userProfile($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
    profile {
      ranking
    }
  }
}`;

export async function getLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: LEETCODE_STATS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`LeetCode GraphQL returned ${response.status}`);
      return FALLBACK_DATA;
    }

    const result = await response.json();
    const stats =
      result?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
    const ranking = result?.data?.matchedUser?.profile?.ranking || 0;

    const counts = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking,
    };

    for (const row of stats) {
      switch (row.difficulty?.toLowerCase()) {
        case "all":
          counts.totalSolved = row.count || 0;
          break;
        case "easy":
          counts.easySolved = row.count || 0;
          break;
        case "medium":
          counts.mediumSolved = row.count || 0;
          break;
        case "hard":
          counts.hardSolved = row.count || 0;
          break;
      }
    }

    return counts;
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return FALLBACK_DATA;
  }
}

export async function fetchLeetCodeStatsServer(
  username: string,
): Promise<LeetCodeStats | null> {
  return getLeetCodeStats(username);
}
