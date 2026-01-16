export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const method = url.searchParams.get("method");
  const user = url.searchParams.get("user");
  const limit = url.searchParams.get("limit") || "10";

  if (!method || !user) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Get API key from environment variables (Secrets)
  const apiKey = context.env.LASTFM_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API Key not configured in Cloudflare" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${user}&api_key=${apiKey}&format=json&limit=${limit}`;

  try {
    const response = await fetch(lastFmUrl);
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch from Last.fm" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
