export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const tag = url.searchParams.get("tag");

  try {
    // In production, we'd fetch from KV or R2
    // For now, return mock data structure
    // The actual posts will be fetched client-side from /blog/posts/*.md
    
    const posts = [
      {
        slug: "material-3-theming",
        title: "Building a Dynamic Material 3 Theme System",
        date: "2026-01-16",
        tags: ["webdev", "material-design", "tutorial"],
        excerpt: "How I implemented Material You theming that extracts colors from my wallpaper and applies them across the entire website.",
        readingTime: 5
      },
      {
        slug: "welcome",
        title: "Welcome to My Blog",
        date: "2026-01-17",
        tags: ["announcement", "meta"],
        excerpt: "The first post on my new blog. Here's what you can expect from this space.",
        readingTime: 2
      }
    ];

    // Filter by tag if provided
    let filteredPosts = tag 
      ? posts.filter(p => p.tags.includes(tag))
      : posts;

    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Paginate
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    return new Response(
      JSON.stringify({
        posts: paginatedPosts,
        hasMore: startIndex + limit < filteredPosts.length,
        total: filteredPosts.length
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
