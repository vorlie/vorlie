import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
        const response = await fetch(`/blog/posts/${slug}.md`);
        if (!response.ok) { setError(true); return; }

        const text = await response.text();
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = text.match(frontmatterRegex);
        if (!match) { setError(true); return; }

        const frontmatterText = match[1];
        const content = match[2];
        const frontmatter: any = {};
        frontmatterText.split("\n").forEach((line) => {
          const [key, ...valueParts] = line.split(":");
          if (key && valueParts.length > 0) {
            let value = valueParts.join(":").trim().replace(/^["']|["']$/g, "");
            if (value.startsWith("[") && value.endsWith("]")) {
              frontmatter[key.trim()] = value.slice(1, -1).split(",").map((v: string) => v.trim().replace(/^["']|["']$/g, ""));
            } else {
              frontmatter[key.trim()] = value;
            }
          }
        });

        const wordCount = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);
        const contentWithoutFirstH1 = content.replace(/^#\s+.+$/m, "").trim();

        setPost({
          slug: slug || "",
          title: frontmatter.title || "Untitled",
          date: frontmatter.date || new Date().toISOString(),
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          excerpt: frontmatter.excerpt || "",
          readingTime,
          content: contentWithoutFirstH1,
        });
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-m3-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <span className="material-symbols-rounded text-7xl text-m3-on-surface-variant opacity-20">
          article
        </span>
        <h1 className="text-4xl font-black text-m3-on-surface-variant opacity-40 uppercase tracking-tight">
          Post Not Found
        </h1>
        <Link
          to="/blog"
          className="flex items-center gap-2 bg-m3-primary text-m3-on-primary px-6 py-3 rounded-full font-black uppercase tracking-tighter shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        url={`https://vorlie.pl/blog/${post.slug}`}
        publishedTime={post.date}
        tags={post.tags}
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-m3-on-surface-variant font-black text-sm uppercase tracking-wider hover:text-m3-primary transition-colors duration-300 group"
          >
            <span className="material-symbols-rounded text-[18px] transition-transform duration-300 group-hover:-translate-x-1">
              arrow_back
            </span>
            Blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 pb-8 border-b border-m3-outline/10"
        >
          <h1 className="text-4xl md:text-6xl font-black text-m3-on-surface tracking-tighter mb-5 leading-[1.05]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-m3-on-surface-variant opacity-60 mb-6">
            <time className="font-black uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="opacity-50">•</span>
            <span className="font-black">{post.readingTime} min read</span>
          </div>

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
        </motion.header>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="m3-card p-6 sm:p-10"
        >
          <article className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 flex items-center justify-between gap-4 pt-8 border-t border-m3-outline/10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-m3-primary/10 text-m3-primary border border-m3-primary/20 px-5 py-2.5 rounded-full font-black uppercase tracking-tighter text-sm hover:bg-m3-primary hover:text-m3-on-primary transition-all duration-300"
          >
            <span className="material-symbols-rounded text-[16px]">arrow_back</span>
            More Posts
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
            {post.readingTime} min read • {new Date(post.date).getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
