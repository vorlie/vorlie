import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { BlogPost } from "../types/blog";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadPosts = useCallback(
    async (pageNum: number, tag: string | null = null) => {
      setLoading(true);
      try {
        const tagParam = tag ? `&tag=${tag}` : "";
        const response = await fetch(
          `/api/blog?page=${pageNum}&limit=6${tagParam}`,
        );

        // If API fails (local dev), use mock data
        if (!response.ok) {
          console.warn("API not available, using local data");

          const mockPosts: BlogPost[] = [
            {
              slug: "material-3-theming",
              title: "Building a Dynamic Material 3 Theme System",
              date: "2026-01-16",
              tags: ["webdev", "material-design", "tutorial"],
              excerpt:
                "How I implemented Material You theming that extracts colors from my wallpaper and applies them across the entire website.",
              readingTime: 2,
            },
            {
              slug: "welcome",
              title: "Welcome to My Blog",
              date: "2026-01-17",
              tags: ["announcement", "meta"],
              excerpt:
                "The first post on my new blog. Here's what you can expect from this space.",
              readingTime: 1,
            },
          ];

          const filteredPosts = tag
            ? mockPosts.filter((p) => p.tags.includes(tag))
            : mockPosts;

          if (pageNum === 1) {
            setPosts(filteredPosts);
          } else {
            setPosts((prev) => [...prev, ...filteredPosts]);
          }

          setHasMore(false);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (pageNum === 1) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Initial load
  useEffect(() => {
    loadPosts(1, selectedTag);
  }, [selectedTag]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      loadPosts(page, selectedTag);
    }
  }, [page]);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setPage(1);
    setPosts([]);
  };

  return (
    <div className="py-12 px-4 sm:px-6 animate-in fade-in duration-700">
      <SEO
        title="Blog"
        description="Thoughts on dev, linux & tech"
        url="https://vorlie.pl/blog"
      />

      <div className="max-w-6xl mx-auto bg-m3-surface-container rounded-[32px] p-4 md:p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-black text-m3-primary tracking-tighter uppercase italic mb-2">
            Blog
          </h1>
          <p className="text-m3-on-surface-variant font-bold opacity-60 uppercase tracking-[0.2em] text-sm">
            Thoughts on dev, linux & tech
          </p>
        </header>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-m3-primary text-m3-on-primary shadow-lg"
                    : "bg-m3-surface-container text-m3-on-surface-variant hover:bg-m3-primary-container"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-m3-surface-container rounded-[32px] p-8 border border-m3-outline/10 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-grow">
                  <h2 className="text-2xl md:text-3xl font-black text-m3-on-surface tracking-tight mb-2 group-hover:text-m3-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-m3-on-surface-variant opacity-60">
                    <time className="font-bold uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <span className="font-bold">
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-m3-on-surface-variant leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-m3-primary/10 text-m3-primary rounded-full text-xs font-black uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        {hasMore && <div ref={observerTarget} className="h-20"></div>}

        {/* End of Posts */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-12">
            <p className="text-m3-on-surface-variant font-bold opacity-60 uppercase tracking-widest text-sm">
              You've reached the end
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-black text-m3-on-surface-variant opacity-40 uppercase tracking-tight">
              No posts found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
