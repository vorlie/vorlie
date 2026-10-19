/* eslint-disable @typescript-eslint/no-explicit-any */

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

interface RouteMetadata {
  title: string;
  description: string;
  image?: string;
}

const DEFAULT_IMAGE = "https://vorlie.pl/favicon.png";

// Static Route Metadata Map
const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Home | vorlie",
    description: "My personal corner of the internet.",
  },
  "/music": {
    title: "Music | vorlie",
    description:
      "Check out what I'm listening to! Real-time stats from Last.fm.",
  },
  "/about": {
    title: "About | vorlie",
    description: "A little about me and my work.",
  },
  "/projects": {
    title: "Projects | vorlie",
    description: "A collection of my projects.",
  },
  "/motion": {
    title: "Motion | vorlie",
    description: "A collection of my motion graphics projects.",
  },
  "/motion/anm-new-2026": {
    title: "ANM New 2026 — Music Visualizer | vorlie",
    description:
      "A music visualizer for Arcando & IRAH's Killer Instinct, featuring a red audio-reactive spectrum, manually timed lyrics, and beat-driven effects.",
    image: "https://gallery.vorlie.pl/share/1792410950933-upload.png",
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

  // 1. Pass through API & static assets
  if (
    path.startsWith("/api/") ||
    path.match(/\.(png|jpg|jpeg|gif|ico|svg|js|css|json|woff|woff2|ttf)$/)
  ) {
    return context.env.ASSETS.fetch(context.request);
  }

  // 2. Defaults
  let title = "vorlie";
  let description = "My personal corner of the internet.";
  let image = DEFAULT_IMAGE;
  let videoUrl = "";
  let isYouTube = false;

  // 3. Blog dynamic
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);

  if (blogMatch) {
    const slug = blogMatch[1];

    try {
      const postsReq = new Request(`${url.origin}/blog/posts.json`);
      const postsRes = await context.env.ASSETS.fetch(postsReq);

      if (postsRes.ok) {
        const posts: any[] = await postsRes.json();
        const post = posts.find((p) => p.slug === slug);

        if (post) {
          title = `${post.title} | vorlie's blog`;
          description = post.excerpt || description;

          if (post.image) {
            image = post.image;
          }
        }
      }
    } catch (e) {
      console.error("Blog metadata fetch failed:", e);
    }
  } else {
    // 4. Static routes
    const meta = routeMetadata[path] || routeMetadata[path.replace(/\/$/, "")];

    if (meta) {
      title = meta.title;
      description = meta.description;
      image = meta.image || DEFAULT_IMAGE;
    }
  }

  // 5. Fetch base HTML
  const response = await context.env.ASSETS.fetch(context.request);

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  const finalType = isYouTube
    ? "website"
    : videoUrl
      ? "video.other"
      : "website";

  // 6. Update metadata
  let rewriter = new HTMLRewriter()
    .on("title", {
      element(el) {
        el.setInnerContent(title);
      },
    })
    .on('meta[name="description"]', {
      element(el: Element) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[property="og:title"]', {
      element(el: Element) {
        el.setAttribute("content", title);
      },
    })
    .on('meta[property="og:description"]', {
      element(el: Element) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[property="og:image"]', {
      element(el: Element) {
        el.setAttribute("content", image);
      },
    })
    .on('meta[property="og:url"]', {
      element(el: Element) {
        el.setAttribute("content", `${url.origin}${path}`);
      },
    })
    .on('meta[property="og:type"]', {
      element(el: Element) {
        el.setAttribute("content", finalType);
      },
    })
    .on('meta[name="twitter:title"]', {
      element(el: Element) {
        el.setAttribute("content", title);
      },
    })
    .on('meta[name="twitter:description"]', {
      element(el: Element) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[name="twitter:image"]', {
      element(el: Element) {
        el.setAttribute("content", image);
      },
    })
    .on('meta[name="twitter:card"]', {
      element(el: Element) {
        el.setAttribute("content", "summary_large_image");
      },
    });

  // 7. Inject video tags
  if (videoUrl && !isYouTube) {
    rewriter = rewriter.on("head", {
      element(el: Element) {
        el.append(
          `<meta property="og:video" content="${videoUrl}">
           <meta property="og:video:type" content="video/mp4">`,
          { html: true },
        );
      },
    });
  }

  const transformed = rewriter.transform(response);

  // 8. Preserve response headers and disable caching
  const headers = new Headers(response.headers);
  headers.set("cache-control", "no-cache, no-store, must-revalidate");

  return new Response(transformed.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
};
