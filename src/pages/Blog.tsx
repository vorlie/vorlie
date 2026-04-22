import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

        if (!response.ok) {
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

          setPosts(pageNum === 1 ? filteredPosts : (prev) => [...prev, ...filteredPosts]);
          setHasMore(false);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setPosts(pageNum === 1 ? data.posts : (prev) => [...prev, ...data.posts]);
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

  useEffect(() => { loadPosts(1, selectedTag); }, [selectedTag]);

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
    if (currentTarget) observer.observe(currentTarget);
    return () => { if (currentTarget) observer.unobserve(currentTarget); };
  }, [hasMore, loading]);

  useEffect(() => { if (page > 1) loadPosts(page, selectedTag); }, [page]);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setPage(1);
    setPosts([]);
  };

  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title="Blog"
        description="Thoughts on dev, linux & tech"
        url="https://vorlie.pl/blog"
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-m3-primary text-xs font-black uppercase tracking-[0.25em] mb-3 opacity-70">
            Writing
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            Blog
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-full mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-xl leading-relaxed">
            Thoughts on dev, linux &amp; tech. Raw notes, tutorials, and the
            occasional deep dive.
          </p>
        </motion.div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border ${
                  selectedTag === tag
                    ? "bg-m3-primary text-m3-on-primary border-m3-primary shadow-lg shadow-m3-primary/20"
                    : "bg-m3-on-surface/5 text-m3-on-surface-variant border-m3-outline/10 hover:border-m3-primary/30 hover:text-m3-primary"
                }`}
              >
                #{tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Posts Grid */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="m3-card block p-6 sm:p-8 group hover:border-m3-primary/20"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-grow">
                    <h2 className="text-xl md:text-2xl font-black text-m3-on-surface tracking-tighter mb-2 group-hover:text-m3-primary transition-colors duration-300 leading-tight">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-m3-on-surface-variant opacity-60">
                      <time className="font-black uppercase tracking-wider">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="opacity-50">•</span>
                      <span className="font-black">{post.readingTime} min read</span>
                    </div>
                  </div>
                  <span className="material-symbols-rounded text-m3-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:text-m3-primary transition-all duration-300 self-center flex-shrink-0">
                    arrow_forward
                  </span>
                </div>

                <p className="text-m3-on-surface-variant leading-relaxed mb-5 font-medium opacity-80">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-m3-primary/10 text-m3-primary rounded-lg text-[10px] font-black uppercase tracking-wider border border-m3-primary/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-m3-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {hasMore && <div ref={observerTarget} className="h-20" />}

        {!hasMore && posts.length > 0 && (
          <div className="text-center py-12">
            <p className="text-m3-on-surface-variant font-black opacity-30 uppercase tracking-[0.25em] text-xs">
              You've reached the end
            </p>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-rounded text-6xl text-m3-on-surface-variant opacity-20 mb-4 block">
              article
            </span>
            <p className="text-xl font-black text-m3-on-surface-variant opacity-30 uppercase tracking-tight">
              No posts found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
