---
title: "Dynamic SEO Metadata for SPAs using Cloudflare Pages"
date: "2026-01-17"
tags: ["typescript", "cloudflare", "seo", "webdev"]
excerpt: "Learn how to use Cloudflare Pages Functions to inject dynamic OpenGraph and Meta tags into a Single Page Application for better social media previews."
---

# Dynamic SEO Metadata for SPAs using Cloudflare Pages Functions

If you've ever shared a link to your Single Page Application (SPA) on Discord, Twitter, or LinkedIn, only to see a generic "Home" title and no description, you've hit a common snag. Since SPAs render content in the browser, social media bots-which don't usually run JavaScript-just see your empty `index.html` shell.

In this post, I’ll show you how I solved this for my site using **Cloudflare Pages Functions** to intercept requests and inject dynamic metadata before the HTML even reaches the user.

## The Problem
A typical SPA has one `index.html`. Whether you visit `/blog` or `/projects`, the server sends the exact same file. Search engines and social crawlers need unique `<title>` and `<meta>` tags to display pretty previews (OpenGraph/Twitter cards).

## The Solution: Middleware Injection
I wrote a Cloudflare Pages Function (middleware) that:
1.  **Intercepts** the incoming request.
2.  **Identifies** the route (path).
3.  **Fetches** the correct metadata (either from a static map or a JSON file).
4.  **Injects** that data into the HTML string using regex before serving it.

### The Implementation

Here is the TypeScript logic used in the Cloudflare Worker:

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

// 1. Define your static route metadata
const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Home | vorlie",
    description: "My website with coding projects, tech stack, and interests.",
  },
  "/specs": {
    title: "PC Specs | vorlie",
    description: "My computer specifications and setup details.",
  },
  // ... add more routes here
};

export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Pass through assets (images, CSS, JS) so we don't process them
  if (
    path.startsWith("/api/") ||
    path.match(/\.(png|jpg|jpeg|gif|ico|svg|js|css|json|woff|woff2|ttf)$/)
  ) {
    return context.env.ASSETS.fetch(context.request);
  }

  let title = "vorlie";
  let description = "My personal corner of the internet.";

  // 2. Handle Dynamic Routes (e.g., Blog Posts)
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      // We fetch our posts.json to find the matching title/excerpt
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
      console.error("Metadata injection failed:", e);
    }
  } else {
    // 3. Handle Static Routes
    const meta = routeMetadata[path] || routeMetadata[path.replace(/\/$/, "")];
    if (meta) {
      title = meta.title;
      description = meta.description;
    }
  }

  // 4. Fetch the original index.html and inject tags
  const response = await context.env.ASSETS.fetch(context.request);
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("text/html")) {
    const html = await response.text();
    
    // Injecting into the HTML via Regex
    const injectedHtml = html
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${description.replace(/"/g, "&quot;")}" />`
      )
      // Repeat for OpenGraph and Twitter tags...
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);

    return new Response(injectedHtml, {
      headers: response.headers,
    });
  }

  return response;
};

```

## Key Highlights

### 1. Handling Dynamic Content

For my blog, I don't want to hardcode every post. The code looks for a `posts.json` file in my assets. When someone visits `/blog/some-cool-post`, the worker reads that JSON, finds the post by its slug, and uses its title for the preview.

### 2. Efficiency

The script ignores static assets (images, fonts, etc.) immediately. This ensures that the middleware doesn't add latency to loading your site’s actual resources.

### 3. Safety First

I used `.replace(/"/g, "&quot;")` when injecting descriptions. This prevents a description with a quote in it from breaking the HTML attribute syntax.

## Conclusion

By moving the metadata logic to the "Edge" (Cloudflare's servers), we get the best of both worlds: the speed and feel of a Single Page App with the SEO power of a server-rendered site.

Now, when I share my **Iota Player** or a new **Blog Post**, the preview looks exactly how it should!


