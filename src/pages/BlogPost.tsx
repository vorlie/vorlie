// src/pages/BlogPost.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import { BlogPostFull } from "../types/blog";

import "highlight.js/styles/github-dark.css";

function parsePost(slug: string, content: string): BlogPostFull | null {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!match) {
    return null;
  }

  const frontmatter: Record<string, string> = {};

  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    frontmatter[key] = value;
  }

  const contentBody = match[2].replace(/^#\s+.+$/m, "").trim();

  const tags = (frontmatter.tags ?? "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);

  const wordCount = contentBody.split(/\s+/).length;

  return {
    slug,
    title: frontmatter.title ?? "Untitled",
    date: frontmatter.date ?? new Date().toISOString(),
    tags,
    excerpt: frontmatter.excerpt ?? "",
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    content: contentBody,
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadPost() {
      setLoading(true);

      try {
        const response = await fetch(`/blog/posts/${slug}.md`);

        if (!response.ok) {
          return;
        }

        const content = await response.text();

        const parsed = parsePost(slug!, content);

        if (!cancelled) {
          setPost(parsed);
        }
      } catch (error) {
        console.error("Failed to load blog post:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="page blog-post-page">
        <div className="blog-state">
          <span className="blog-state__spinner" />
          Loading post...
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="page blog-post-page">
        <div className="blog-state">
          <span className="material-symbols-rounded">article</span>

          <h1>Post not found</h1>

          <Link to="/blog" className="button button--primary">
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page blog-post-page">
      <Link to="/blog" className="blog-post__back">
        <span className="material-symbols-rounded">arrow_back</span>
        Blog
      </Link>

      <header className="blog-post__header">
        <div className="page-header__eyebrow">Writing</div>

        <h1>{post.title}</h1>

        <div className="blog-post__meta">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <span>·</span>

          <span>{post.readingTime} min read</span>
        </div>

        <div className="blog-post__tags">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <article className="blog-post__content markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <footer className="blog-post__footer">
        <Link to="/blog" className="button button--secondary">
          <span className="material-symbols-rounded">arrow_back</span>
          More posts
        </Link>

        <span>
          {post.readingTime} min read · {new Date(post.date).getFullYear()}
        </span>
      </footer>
    </main>
  );
}
