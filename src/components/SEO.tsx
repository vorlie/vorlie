import React from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "vorlie's personal website - developer, linux enthusiast, and tech lover.",
  image = "https://vorlie.pl/images/favicon.png", // Ensure you have a default OG image
  url = typeof window !== "undefined" ? window.location.href : "https://vorlie.pl",
  type = "website",
  publishedTime,
  tags,
}) => {
  const siteTitle = "vorlie";
  const fullTitle = `${title} | ${siteTitle}`;

  // Ensure absolute URL for image
  const fullImage = image.startsWith("http") ? image : `https://vorlie.pl${image}`;

  return (
    <>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />

      {/* Article Specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {tags && tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </>
  );
};

export default SEO;
