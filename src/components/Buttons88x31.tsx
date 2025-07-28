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
    <section className="my-12 text-left">
      {" "}
      <h2 className="text-2xl font-semibold mb-6 text-white">My Friends</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {friendButtons.map((button) => (
          <a
            key={button.href}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-200"
            title={button.alt}
          >
            <img
              src={button.imgSrc}
              alt={button.alt}
              width="88"
              height="31"
              loading="lazy"
              className="block"
            />
          </a>
        ))}
      </div>
      <div className="mb-4">
        <button
          onClick={handleCopyClick}
          className="bg-blue-400 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md shadow transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
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
