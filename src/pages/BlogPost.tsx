import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { BlogPostFull } from "../types/blog";
import SEO from "../components/SEO";
import "highlight.js/styles/tokyo-night-dark.css";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch the markdown file directly
        const response = await fetch(`/blog/posts/${slug}.md`);

        if (!response.ok) {
          setError(true);
          return;
        }

        const text = await response.text();

        // Parse frontmatter manually (simple version)
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = text.match(frontmatterRegex);

        if (!match) {
          setError(true);
          return;
        }

        const frontmatterText = match[1];
        const content = match[2];

        // Parse frontmatter fields
        const frontmatter: any = {};
        frontmatterText.split("\n").forEach((line) => {
          const [key, ...valueParts] = line.split(":");
          if (key && valueParts.length > 0) {
            let value = valueParts.join(":").trim();
            // Remove quotes
            value = value.replace(/^["']|["']$/g, "");
            // Parse arrays
            if (value.startsWith("[") && value.endsWith("]")) {
              frontmatter[key.trim()] = value
                .slice(1, -1)
                .split(",")
                .map((v: string) => v.trim().replace(/^["']|["']$/g, ""));
            } else {
              frontmatter[key.trim()] = value;
            }
          }
        });

        // Calculate reading time
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        // Remove the first H1 heading from content (we show title from frontmatter)
        const contentWithoutFirstH1 = content.replace(/^#\s+.+$/m, "").trim();

        setPost({
          slug: slug || "",
          title: frontmatter.title || "Untitled",
          date: frontmatter.date || new Date().toISOString(),
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          excerpt: frontmatter.excerpt || "",
          readingTime: readingTime,
          content: contentWithoutFirstH1,
        });
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-4xl font-black text-m3-on-surface-variant opacity-40 mb-4 uppercase tracking-tight">
          Post Not Found
        </h1>
        <Link
          to="/blog"
          className="bg-m3-primary text-m3-on-primary px-6 py-3 rounded-full font-black uppercase tracking-tighter shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 animate-in fade-in duration-700">
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        url={`https://vorlie.pl/blog/${post.slug}`}
        publishedTime={post.date}
        tags={post.tags}
      />

      <div className="max-w-6xl mx-auto bg-m3-surface-container rounded-[32px] p-4 md:p-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-m3-primary font-bold hover:text-m3-primary/80 transition-colors mb-8 group"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-m3-on-surface tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-m3-on-surface-variant opacity-60 mb-6">
            <time className="font-bold uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span className="font-bold">{post.readingTime} min read</span>
          </div>

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
        </header>

        {/* Post Content */}
        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Back to Blog CTA */}
        <div className="mt-16 pt-8 border-t border-m3-outline/20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-m3-primary text-m3-on-primary px-6 py-3 rounded-full font-black uppercase tracking-tighter shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            More Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
