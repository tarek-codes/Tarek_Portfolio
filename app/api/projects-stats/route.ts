import { NextResponse } from "next/server";
import { PROJECTS } from "@/lib/constants";
import { getGitHubRepo, getVSCodeExtensionStats } from "@/lib/api/github";

type ProjectStats = {
  stars: number;
  forks: number;
  language: string;
  downloads?: number;
};

function createFallbackStats(): Record<string, ProjectStats> {
  return PROJECTS.reduce<Record<string, ProjectStats>>((acc, project) => {
    acc[project.title] = {
      stars: 0,
      forks: 0,
      language: "",
    };
    return acc;
  }, {});
}

export async function GET() {
  const fallback = createFallbackStats();

  try {
    const entries = await Promise.all(
      PROJECTS.map(async (project) => {
        const base = { ...fallback[project.title] };

        if (project.githubRepo) {
          const [owner, repo] = project.githubRepo.split("/");
          const repoData = await getGitHubRepo(owner, repo);

          if (repoData) {
            base.stars = repoData.stargazers_count;
            base.forks = repoData.forks_count;
            base.language = repoData.language || "";
          }
        }

        if (project.extensionId) {
          const extensionData = await getVSCodeExtensionStats(
            project.extensionId,
          );
          if (extensionData) {
            base.downloads = extensionData.downloads;
          }
        }

        return [project.title, base] as const;
      }),
    );

    const stats = Object.fromEntries(entries);

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Projects stats API error:", error);

    return NextResponse.json(fallback, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    });
  }
}



