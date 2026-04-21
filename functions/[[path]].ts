/* eslint-disable @typescript-eslint/no-explicit-any */

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
  let image = "https://vorlie.pl/images/favicon.png";
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
        }
      }
    } catch (e) {
      console.error("Blog metadata fetch failed:", e);
    }
  }

  // 4. Clips dynamic
  else if (path.startsWith("/clips")) {
    let clipId: string | null = null;

    if (path === "/clips") {
      clipId = url.searchParams.get("id");
    } else {
      clipId = path.split("/")[2];
    }

    if (clipId) {
      try {
        const clipsRes = await fetch("https://api.vorlie.pl/clips.json");

        if (clipsRes.ok) {
          const clips: any[] = await clipsRes.json();
          const clip = clips.find((c) => c.id === clipId);

          if (clip) {
            title = `${clip.title} | vorlie`;
            description = clip.description; // ← THIS is what Discord needs
            image = clip.thumbnailUrl;
            videoUrl = clip.videoUrl;

            isYouTube =
              videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

            console.log("Clip metadata applied:", clipId);
          } else {
            console.log("Clip not found:", clipId);
          }
        }
      } catch (e) {
        console.error("Clip metadata fetch failed:", e);
      }
    }
  }

  // 5. Static routes fallback
  else {
    const meta = routeMetadata[path] || routeMetadata[path.replace(/\/$/, "")];

    if (meta) {
      title = meta.title;
      description = meta.description;
    }
  }

  // 6. Fetch base HTML
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

  // 7. HTMLRewriter
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
        el.setAttribute("content", url.href);
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
    .on('meta[name="twitter:card"]', {
      element(el: Element) {
        el.setAttribute("content", videoUrl ? "player" : "summary_large_image");
      },
    });

  // Inject video tags
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

  // 8. Disable cache for embeds (VERY IMPORTANT)
  return new Response(transformed.body, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-cache, no-store, must-revalidate",
    },
    status: response.status,
  });
};
