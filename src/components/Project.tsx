import React from "react";
interface ProjectProps {
  title: string;
  desc: string;
  links: { href: string; text: string }[];
  languages: string[];
  languageIcons?: React.ReactNode[];
}

const Project: React.FC<ProjectProps> = ({
  title,
  desc,
  links,
  languages,
  languageIcons,
}) => (
  <div className="bg-m3-surface-container border-m3-outline/5 rounded-[24px] p-6 flex flex-col h-full hover:bg-m3-on-surface/5 transition-all duration-300 group cursor-default border hover:border-m3-outline/20">
    <div className="flex-grow mb-4">
      <h3 className="text-xl font-bold text-m3-on-surface mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-m3-on-surface-variant leading-relaxed font-medium">{desc}</p>
    </div>

    <div>
      <hr className="border-t border-m3-outline/10 my-4" />
      <div className="flex flex-wrap justify-between items-center gap-y-3 text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-m3-primary hover:text-m3-primary/80 font-bold transition-colors"
              >
                {link.text}
              </a>
              {index < links.length - 1 && (
                <span className="text-m3-on-surface-variant/50" aria-hidden="true">
                  &bull;
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <div
              key={lang}
              className="flex items-center gap-1.5 bg-m3-primary/10 text-m3-primary px-3 py-1 rounded-full text-xs font-bold border border-m3-primary/20 whitespace-nowrap"
            >
              {languageIcons && languageIcons[index] && (
                <span className="inline-block w-3.5 h-3.5 opacity-80">
                  {languageIcons[index]}
                </span>
              )}
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Project;
