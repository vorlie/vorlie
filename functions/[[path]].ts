/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

// Static Route Metadata Map
const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Home | vorlie",
    description: "My personal corner of the internet.",
  },
  "/specs": {
    title: "PC Specs | vorlie",
    description: "My computer specifications, peripherals, and setup details.",
  },
  "/clips": {
    title: "Clips | vorlie",
    description:
      "A collection of my gaming clips, highlights, and funny moments.",
  },
  "/project/iota-player": {
    title: "Iota Player | vorlie",
    description:
      "A modern, lightweight, and beautiful music player for Windows built with Python.",
  },
  "/music": {
    title: "Music | vorlie",
    description:
      "Check out what I'm listening to! Real-time stats from Last.fm.",
  },
  "/rat": {
    title: "Rats | vorlie",
    description: "A gallery of rats.",
  },
  "/colors": {
    title: "Colors | vorlie",
    description:
      "Material 3 Dynamic Color Palette and WCAG 2.1 contrast checker.",
  },
  "/scanner": {
    title: "Scanner | vorlie",
    description: "QR Code and Barcode Scanner utility.",
  },
  "/miko/privacy-policy": {
    title: "Privacy Policy | vorlie",
    description: "Privacy Policy for Miko and vorlie services.",
  },
  "/miko/terms-of-service": {
    title: "Terms of Service | vorlie",
    description: "Terms of Service for Miko and vorlie services.",
  },
  "/verify": {
    title: "Verify | vorlie",
    description: "Verification page.",
  },
  "/blog": {
    title: "Blog | vorlie",
    description: "Thoughts on dev, linux & tech",
  },
  "/gallery": {
    title: "Gallery | vorlie",
    description: "A collection of my Cyberpunk 2077 photomode shots.",
  },
};

export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Pass through API requests and static assets (images, js, css, etc.)
  if (
    path.startsWith("/api/") ||
    path.match(/\.(png|jpg|jpeg|gif|ico|svg|js|css|json|woff|woff2|ttf)$/)
  ) {
    return context.env.ASSETS.fetch(context.request);
  }

  // 2. Determine Metadata
  let title = "vorlie";
  let description = "My personal corner of the internet.";
  let image = "https://vorlie.pl/images/favicon.png"; // Default image
  let videoUrl = ""; // For video embeds
  let isYouTube = false;

  // Check for Dynamic Blog Post
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      // Fetch posts.json from the same origin (it's a static asset)
      const postsReq = new Request(`${url.origin}/blog/posts.json`);
      const postsRes = await context.env.ASSETS.fetch(postsReq);

      if (postsRes.ok) {
        const posts: any[] = await postsRes.json();
        const post = posts.find((p) => p.slug === slug);
        if (post) {
          title = `${post.title} | vorlie's blog`;
          description = post.excerpt || description;
        }
      }
    } catch (e) {
      console.error("Failed to fetch blog posts for metadata injection:", e);
    }
  } else if (path.startsWith("/clips")) {
    let clipId = null;
    if (path === "/clips") {
      clipId = url.searchParams.get("id");
    } else {
      clipId = path.split("/")[2];
    }
    if (clipId) {
      try {
        const clipsReq = new Request(`https://api.vorlie.pl/clips.json`);
        const clipsRes = await fetch(clipsReq);
        if (clipsRes.ok) {
          const clips: any[] = await clipsRes.json();
          const clip = clips.find((c) => c.id === clipId);
          if (clip) {
            title = `${clip.title} | vorlie`;
            description = clip.description;
            image = clip.thumbnailUrl;
            videoUrl = clip.videoUrl;
            isYouTube =
              !!videoUrl &&
              (videoUrl.includes("youtube.com") ||
                videoUrl.includes("youtu.be"));
          }
        }
      } catch (e) {
        console.error("Failed to fetch clips for metadata:", e);
      }
    }
  } else {
    // Check Static Routes
    const meta = routeMetadata[path] || routeMetadata[path.replace(/\/$/, "")];
    if (meta) {
      title = meta.title;
      description = meta.description;
    }
  }

  // 3. Fetch index.html
  const response = await context.env.ASSETS.fetch(context.request);

  // If not an HTML page (e.g. 404 handled by spa fallback), just return
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  // 4. Inject Metadata
  const html = await response.text();

  // Simple regex replacements with more flexible matching
  let injectedHtml = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content=".*?"\s*\/?>/,
      `<meta name="description" content="${description.replace(/"/g, "&quot;")}" />`,
    )
    .replace(
      /<meta property="og:title" content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />`,
    )
    .replace(
      /<meta property="og:description" content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />`,
    )
    .replace(
      /<meta property="og:image" content=".*?"\s*\/?>/,
      `<meta property="og:image" content="${image}" />`,
    )
    .replace(
      /<meta property="og:url" content=".*?"\s*\/?>/,
      `<meta property="og:url" content="${url.href}" />`,
    )
    .replace(
      /<meta property="og:type" content=".*?"\s*\/?>/,
      `<meta property="og:type" content="${isYouTube ? "website" : videoUrl ? "video.other" : "website"}" />`,
    )
    .replace(
      /<meta property="twitter:title" content=".*?"\s*\/?>/,
      `<meta property="twitter:title" content="${title.replace(/"/g, "&quot;")}" />`,
    )
    .replace(
      /<meta property="twitter:description" content=".*?"\s*\/?>/,
      `<meta property="twitter:description" content="${description.replace(/"/g, "&quot;")}" />`,
    )
    .replace(
      /<meta property="twitter:url" content=".*?"\s*\/?>/, // Note: twitter:url wasn't in index.html but good to handle if added
      `<meta property="twitter:url" content="${url.href}" />`,
    );

  // Add video meta tags for clips
  if (videoUrl && !isYouTube) {
    injectedHtml = injectedHtml.replace(
      "</head>",
      `<meta property="og:video" content="${videoUrl}" />
<meta property="og:video:type" content="video/mp4" />
</head>`,
    );
  }

  return new Response(injectedHtml, {
    headers: response.headers,
    status: response.status,
  });
};
