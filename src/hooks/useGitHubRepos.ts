import { useEffect, useState } from "react";
import { GitHubRepository } from "../types/github";

const GITHUB_USERNAME = "vorlie";

interface UseGitHubReposResult {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
}

export function useGitHubRepos(): UseGitHubReposResult {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        );

        if (!response.ok) {
          throw new Error(
            `GitHub API returned ${response.status} ${response.statusText}`,
          );
        }

        const data: GitHubRepository[] = await response.json();

        setRepositories(
          data.filter((repo) => !repo.private && !repo.fork && !repo.archived),
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch GitHub repositories.",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchRepositories();
  }, []);

  return {
    repositories,
    loading,
    error,
  };
}