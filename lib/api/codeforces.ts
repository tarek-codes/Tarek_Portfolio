// API Types -> Pera :)
export interface CodeforcesRating {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface CodeforcesSubmission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    type: string;
    rating?: number;
    tags: string[];
  };
  author: {
    members: Array<{ handle: string }>;
  };
  programmingLanguage: string;
  verdict: string;
  testset: string;
}

export interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  avatar: string;
  titlePhoto: string;
}

// Fetch functions
export async function getCodeforcesRating(
  handle: string,
): Promise<CodeforcesRating[]> {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.rating?handle=${handle}`,
    );
    const data = await response.json();

    if (data.status === "OK") {
      return data.result;
    }
    throw new Error(data.comment || "Failed to fetch rating");
  } catch (error) {
    console.error("Error fetching Codeforces rating:", error);
    return [];
  }
}

export async function getCodeforcesSubmissions(
  handle: string,
): Promise<CodeforcesSubmission[]> {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`,
    );
    const data = await response.json();

    if (data.status === "OK") {
      return data.result;
    }
    throw new Error(data.comment || "Failed to fetch submissions");
  } catch (error) {
    console.error("Error fetching Codeforces submissions:", error);
    return [];
  }
}

export async function getCodeforcesUser(
  handle: string,
): Promise<CodeforcesUser | null> {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`,
    );
    const data = await response.json();

    if (data.status === "OK" && data.result.length > 0) {
      return data.result[0];
    }
    throw new Error(data.comment || "Failed to fetch user");
  } catch (error) {
    console.error("Error fetching Codeforces user:", error);
    return null;
  }
}

// Stats calculation functions
export function calculateProblemStats(submissions: CodeforcesSubmission[]) {
  const solvedProblems = new Set<string>();
  const attemptedProblems = new Set<string>();
  const verdictCount: Record<string, number> = {};
  const difficultyCount: Record<string, number> = {};
  const tagCount: Record<string, number> = {};
  const languageCount: Record<string, number> = {};

  submissions.forEach((submission) => {
    const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
    attemptedProblems.add(problemKey);

    // Count verdicts
    verdictCount[submission.verdict] =
      (verdictCount[submission.verdict] || 0) + 1;

    // Count languages
    languageCount[submission.programmingLanguage] =
      (languageCount[submission.programmingLanguage] || 0) + 1;

    if (submission.verdict === "OK") {
      solvedProblems.add(problemKey);

      // Count difficulty (rating)
      if (submission.problem.rating) {
        const rating = submission.problem.rating.toString();
        difficultyCount[rating] = (difficultyCount[rating] || 0) + 1;
      }

      // Count tags
      submission.problem.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  return {
    solvedProblems: solvedProblems.size,
    attemptedProblems: attemptedProblems.size,
    verdictCount,
    difficultyCount,
    tagCount,
    languageCount,
  };
}



