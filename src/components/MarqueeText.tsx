import React, { useRef, useEffect, useState } from "react";

interface MarqueeTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // pixels per second
  style?: React.CSSProperties;
  title?: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  children,
  className = "",
  speed = 35,
  style,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (container && text) {
      const overflow = text.scrollWidth > container.offsetWidth;
      setShouldAnimate(overflow);
      setDistance(text.scrollWidth - container.offsetWidth);
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, maxWidth: "100%" }}
      title={title}
    >
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap"
        style={
          shouldAnimate
            ? {
                animation: `marquee ${
                  distance / speed
                }s linear infinite alternate`,
                willChange: "transform",
              }
            : undefined
        }
      >
        {children}
      </span>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${distance}px); }
          }
        `}
      </style>
    </div>
  );
};

export default MarqueeText;
