export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;

  language: string | null;
  topics: string[];

  stargazers_count: number;
  forks_count: number;

  archived: boolean;
  fork: boolean;
  private: boolean;

  created_at: string;
  updated_at: string;
  pushed_at: string | null;
}