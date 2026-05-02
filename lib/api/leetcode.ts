// LeetCode API Types
export interface LeetCodeStats {
  totalSolved: number;
  ranking: number;
}

// Using alfa-leetcode-api hosted endpoint
const LEETCODE_API_BASE = "https://alfa-leetcode-api.onrender.com";

// Fallback data for when API is rate-limited
const FALLBACK_DATA: LeetCodeStats = {
  totalSolved: 200, // Update this manually when needed
  ranking: 0,
};

export async function getLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  try {
    const response = await fetch(`${LEETCODE_API_BASE}/${username}/solved`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    // If rate limited (429) or other errors, use fallback data
    if (!response.ok) {
      if (response.status === 429) {
        console.warn("LeetCode API rate limit reached. Using fallback data.");
        return FALLBACK_DATA;
      }
      console.error(`LeetCode API returned ${response.status}`);
      return FALLBACK_DATA;
    }

    const data = await response.json();

    // Transform API response to our stats format
    return {
      totalSolved: data.solvedProblem || 0,
      ranking: data.ranking || 0,
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return FALLBACK_DATA;
  }
}



