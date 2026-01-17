interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

// Static Route Metadata Map
const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Home | vorlie",
    description: "My website with coding projects, tech stack, and interests in games, music, and anime.",
  },
  "/specs": {
    title: "PC Specs | vorlie",
    description: "My computer specifications, peripherals, and setup details.",
  },
  "/clips": {
    title: "Clips | vorlie",
    description: "A collection of my gaming clips, highlights, and funny moments.",
  },
  "/project/iota-player": {
    title: "Iota Player | vorlie",
    description: "A modern, lightweight, and beautiful music player for Windows built with Python.",
  },
  "/music": {
    title: "Music | vorlie",
    description: "Check out what I'm listening to! Real-time stats from Last.fm.",
  },
  "/rat": {
    title: "Rats | vorlie",
    description: "A gallery of rats.",
  },
  "/colors": {
    title: "Colors | vorlie",
    description: "Material 3 Dynamic Color Palette and WCAG 2.1 contrast checker.",
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
  let description = "vorlie - Personal website, developer portfolio, and blog.";
  let image = "https://vorlie.pl/images/favicon.png"; // Default image

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
          // You could extract an image from frontmatter if you had one
        }
      }
    } catch (e) {
      console.error("Failed to fetch blog posts for metadata injection:", e);
    }
  } else {
    // Check Static Routes
    // Handle trailing slash consistency if needed, strictly matching for now
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
  
  // Simple regex replacements
  const injectedHtml = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${url.href}" />`
    )
    .replace(
      /<meta property="twitter:title" content=".*?" \/>/,
      `<meta property="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`
    )
    .replace(
      /<meta property="twitter:description" content=".*?" \/>/,
      `<meta property="twitter:description" content="${description.replace(/"/g, '&quot;')}" />`
    )
    .replace(
      /<meta property="twitter:url" content=".*?" \/>/,
      `<meta property="twitter:url" content="${url.href}" />`
    );

  return new Response(injectedHtml, {
    headers: response.headers,
    status: response.status,
  });
};
