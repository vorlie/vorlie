import React from "react";
import { motion } from "framer-motion";

interface ProjectProps {
  title: string;
  desc: string;
  links: { href: string; text: string }[];
  languages: string[];
  languageIcons?: React.ReactNode[];
  view?: "grid" | "list";
  mainLink?: string;
}

const Project: React.FC<ProjectProps> = ({
  title,
  desc,
  links,
  languages,
  languageIcons,
  view = "grid",
  mainLink,
}) => {
  const isList = view === "list";

  const handleCardClick = () => {
    if (mainLink) {
      window.open(mainLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className={`
        bg-m3-surface-container border border-m3-outline/10 rounded-[24px] 
        hover:bg-m3-on-surface/5 transition-all duration-300 group 
        flex overflow-hidden relative
        ${mainLink ? "cursor-pointer hover:border-m3-primary/30 hover:shadow-lg hover:shadow-m3-primary/5" : "cursor-default border-m3-outline/10"}
        ${isList ? "flex-row items-center p-4 gap-6" : "flex-col p-6 h-full"}
      `}
    >
      {/* Click Feedback Overlay */}
      {mainLink && (
        <div className="absolute inset-0 bg-m3-primary/0 group-hover:bg-m3-primary/[0.02] transition-colors pointer-events-none" />
      )}

      <div className={`${isList ? "flex-grow" : "flex-grow mb-4"} relative z-10`}>
        <h3 className={`font-bold text-m3-on-surface tracking-tight group-hover:text-m3-primary transition-colors ${isList ? "text-lg mb-1" : "text-xl mb-2"}`}>
          {title}
        </h3>
        <p className={`text-m3-on-surface-variant leading-relaxed font-medium ${isList ? "text-sm line-clamp-1" : "text-sm line-clamp-3"}`}>
          {desc}
        </p>
      </div>

      <div className={`${isList ? "flex flex-row items-center gap-6 shrink-0" : "w-full pt-3"} relative z-20`}>
        {!isList && <hr className="border-t border-m3-outline/10 mb-5" />}
        
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${isList ? "order-1" : "mb-5"}`}>
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-m3-primary hover:text-m3-primary/80 font-bold transition-colors whitespace-nowrap py-1"
              >
                {link.text}
              </a>
              {index < links.length - 1 && (
                <span className="text-m3-on-surface-variant/30" aria-hidden="true">
                  &bull;
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={`flex flex-wrap gap-1.5 ${isList ? "order-2" : ""}`}>
          {languages.map((lang, index) => (
            <div
              key={lang}
              className="flex items-center gap-1.5 bg-m3-primary/5 text-m3-primary px-3 py-1 rounded-full text-[11px] font-bold border border-m3-primary/10 whitespace-nowrap group-hover:bg-m3-primary/10 transition-colors"
            >
              {languageIcons && languageIcons[index] && (
                <span className="inline-block w-3.5 h-3.5 opacity-70">
                  {languageIcons[index]}
                </span>
              )}
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
