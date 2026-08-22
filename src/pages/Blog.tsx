import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import type { BlogPost } from "../types/blog";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const response = await fetch("/blog/posts.json");

        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`);
        }

        const data = (await response.json()) as BlogPost[];

        if (!cancelled) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  );

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <main className="page blog-page">
      <header className="page-header">
        <div>
          <div className="page-header__eyebrow">Writing</div>
          <h1 className="page-header__title">Blog</h1>
          <p className="page-header__description">
            Thoughts on development, Linux, technology, and whatever I happen to
            be tinkering with.
          </p>
        </div>
      </header>

      {tags.length > 0 && (
        <div className="blog-tags">
          <button
            type="button"
            className={
              selectedTag === null ? "blog-tag blog-tag--active" : "blog-tag"
            }
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>

          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={
                selectedTag === tag ? "blog-tag blog-tag--active" : "blog-tag"
              }
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="blog-state">
          <span className="blog-state__spinner" />
          Loading posts...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="blog-state">
          <span className="material-symbols-rounded">article</span>
          <p>No posts found.</p>
        </div>
      ) : (
        <div className="blog-list">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card__content">
                <div className="blog-card__meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>

                  <span>·</span>

                  <span>{post.readingTime} min read</span>
                </div>

                <h2 className="blog-card__title">{post.title}</h2>

                <p className="blog-card__excerpt">{post.excerpt}</p>

                <div className="blog-card__tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>

              <span className="material-symbols-rounded blog-card__arrow">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
