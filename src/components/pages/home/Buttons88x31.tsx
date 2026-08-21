import { useState } from "react";

const friendButtons = [
  {
    href: "https://vorlie.pl/",
    imgSrc: "/images/vorlie.png",
    alt: "vorlie.pl",
  },
  {
    href: "https://uwu.gal/about-us",
    imgSrc: "https://uwu.gal/button.png",
    alt: "uwu.gal",
  },
  {
    href: "https://byeoon.dev/",
    imgSrc: "/images/byoon.png",
    alt: "byeoon.dev",
  },
  {
    href: "https://pre1ude.dev",
    imgSrc: "https://pre1ude.dev/blankie.png",
    alt: "pre1ude.dev",
  },
  {
    href: "https://deepy.me/",
    imgSrc: "/images/deepy.png",
    alt: "deepy.me",
  },
  {
    href: "https://specifix.dev/",
    imgSrc: "/images/specifix.png",
    alt: "specifix.dev",
  },
  {
    href: "https://megu.dev/",
    imgSrc: "https://uwu.gal/static/images/friends/megudev.png",
    alt: "megu.dev",
  },
  {
    href: "https://kyuqdev.pages.dev/",
    imgSrc: "https://kyuqdev.pages.dev/referer/banner.png",
    alt: "kyuqdev.pages.dev",
  },
  {
    href: "https://port19.xyz/",
    imgSrc:
      "https://raw.githubusercontent.com/port19x/port19.xyz/refs/heads/master/static/buttons/port19.gif",
    alt: "port19.xyz",
  },
];

const myButtonCode =
  '<a href="https://vorlie.pl/" target="_blank"><img src="https://vorlie.pl/images/vorlie.png" alt="vorlie button" width="88" height="31" loading="lazy" /></a>';

export default function Buttons88x31() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(myButtonCode);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="buttons88">
      <div className="buttons88__header">
        <div>
          <span className="section-eyebrow">THE INTERNET</span>
          <h2>Friends &amp; cool people</h2>
        </div>

        <span className="buttons88__count">
          {friendButtons.length} sites
        </span>
      </div>

      <p className="buttons88__description">
        Little corners of the internet I like visiting.
      </p>

      <div className="buttons88__grid">
        {friendButtons.map((button) => (
          <a
            key={button.href}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="buttons88__button"
            title={button.alt}
          >
            <img
              src={button.imgSrc}
              alt={button.alt}
              width={88}
              height={31}
              loading="lazy"
            />
          </a>
        ))}
      </div>

      <div className="buttons88__footer">
        <span>Want to link back?</span>

        <button type="button" onClick={handleCopy}>
          {copied ? "Copied!" : "Get my button"}
        </button>
      </div>
    </section>
  );
}