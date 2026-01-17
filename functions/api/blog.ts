export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const tag = url.searchParams.get("tag");

  try {
    // Fetch the pre-generated posts.json
    const postsResponse = await fetch(new URL('/blog/posts.json', url.origin));
    
    if (!postsResponse.ok) {
      throw new Error('Failed to load posts.json');
    }
    
    const allPosts = await postsResponse.json();

    // Filter by tag if provided
    let filteredPosts = tag 
      ? allPosts.filter((p: any) => p.tags.includes(tag))
      : allPosts;

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
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600" // Cache for 1 hour
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
