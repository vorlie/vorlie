export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
}

export interface BlogPostFull extends BlogPost {
  content: string;
}
