// GitHub API integration for fetching repository stats 🫠

export interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  html_url: string;
  homepage: string | null;
  updated_at: string;
}

export async function getGitHubRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-Website",
    };

    // Add authentication if available (optional)
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers,
      },
    );

    if (!response.ok) {
      // Check if rate limited
      if (response.status === 403 || response.status === 429) {
        console.warn(
          `GitHub API rate limit reached for ${owner}/${repo}. Using fallback data.`,
        );
        return null;
      }

      // Log error but don't throw
      console.error(
        `GitHub API error for ${owner}/${repo}:`,
        response.status,
        response.statusText,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching GitHub repo ${owner}/${repo}:`, error);
    return null;
  }
}

export async function getVSCodeExtensionStats(extensionId: string) {
  try {
    const response = await fetch(
      `https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;api-version=3.0-preview.1",
        },
        body: JSON.stringify({
          filters: [
            {
              criteria: [
                {
                  filterType: 7,
                  value: extensionId,
                },
              ],
            },
          ],
          flags: 914,
        }),
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.error("VS Code Marketplace API error:", response.status);
      return null;
    }

    const data = await response.json();
    const extension = data.results?.[0]?.extensions?.[0];

    if (!extension) return null;

    type ExtensionStat = {
      statisticName: string;
      value: number;
    };

    const downloadStat = extension.statistics?.find(
      (stat: ExtensionStat) => stat.statisticName === "install",
    );

    return {
      downloads: downloadStat?.value || 0,
      rating:
        extension.statistics?.find(
          (stat: ExtensionStat) => stat.statisticName === "averagerating",
        )?.value || 0,
      ratingCount:
        extension.statistics?.find(
          (stat: ExtensionStat) => stat.statisticName === "ratingcount",
        )?.value || 0,
    };
  } catch (error) {
    console.error("Error fetching VS Code extension stats:", error);
    return null;
  }
}



