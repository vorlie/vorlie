// src/components/Buttons88x31.tsx
import React, { useState } from "react";

const friendButtons = [
  {
    href: "https://vorlie.pl/",
    imgSrc: "/images/vorlie.png",
    alt: "vorlie.pl button",
  },
  {
    href: "https://uwu.gal/about-us",
    imgSrc: "https://uwu.gal/button.png",
    alt: "uwu.gal button",
  },
  {
    href: "https://byeoon.dev/",
    imgSrc: "/images/byoon.png",
    alt: "byeoon.dev button",
  },
  {
    href: "https://pre1ude.dev",
    imgSrc: "https://pre1ude.dev/blankie.png",
    alt: "pre1ude.dev button",
  },
  {
    href: "https://deepy.me/",
    imgSrc: "/images/deepy.png",
    alt: "deepy.me button",
  },
  {
    href: "https://specifix.dev/",
    imgSrc: "/images/specifix.png",
    alt: "specifix.dev button",
  },
  {
    href: "https://megu.dev/",
    imgSrc: "https://uwu.gal/static/images/friends/megudev.png",
    alt: "megu.dev button",
  },
  {
    href: "https://dvop.fyi/",
    imgSrc: "https:///dvop.fyi/images/frank.png",
    alt: "dvop.fyi button",
  },
  {
    href: "https://kick.com/osysiak07",
    imgSrc: "/images/osysiak07.png",
    alt: "kick.com/osysiak07 button",
  }
];

const myButtonCode =
  '<a href="https://vorlie.pl/" target="_blank"><img src="https://vorlie.pl/images/vorlie.png" alt="vorlie button" width="88" height="31" loading="lazy" /></a>';

const Buttons88x31: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(myButtonCode);
      console.log("Button code copied to clipboard!");
      setNotificationText("Button code copied to clipboard!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Error copying button code: ", error);
      setNotificationText("Failed to copy button code.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <section className="my-10 text-left">
      {" "}
      <h2 className="text-2xl font-bold mb-6 text-m3-on-surface tracking-tight">My Friends</h2>
      <div className="flex flex-wrap gap-3 mb-8">
        {friendButtons.map((button) => (
          <a
            key={button.href}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            title={button.alt}
          >
            <img
              src={button.imgSrc}
              alt={button.alt}
              width="88"
              height="31"
              loading="lazy"
              className="block rounded-[8px] shadow-sm border border-m3-outline/10"
            />
          </a>
        ))}
      </div>
      <div className="mb-4">
        <button
          onClick={handleCopyClick}
          className="bg-m3-primary-container text-m3-on-primary-container text-sm font-bold px-6 py-2.5 rounded-full hover:bg-m3-primary hover:text-m3-on-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer border border-m3-primary/20"
        >
          Copy my button code
        </button>
      </div>
      <div
        role="status"
        aria-live="polite"
        className={`
                    fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50
                    px-4 py-2 rounded-md shadow-lg text-sm font-medium
                    transition-opacity duration-300 ease-in-out
                    ${
                      showNotification
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }
                    ${
                      notificationText.includes("Failed")
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }
                `}
      >
        {notificationText}
      </div>
    </section>
  );
};

export default Buttons88x31;
