import React from 'react';
interface ProjectProps {
    title: string;
    desc: string;
    links: { href: string; text: string }[];
    language: string;
    languageIcon?: React.ReactNode;
}

const Project: React.FC<ProjectProps> = ({ title, desc, links, language, languageIcon }) => (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-5 flex flex-col h-full border-t-2 border-teal-600 transition-shadow duration-300 hover:shadow-xl">
        <div className="flex-grow mb-4">
            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
        </div>

        <div>
            <hr className="border-t border-gray-700 my-3" />
            <div className="flex flex-wrap justify-between items-center gap-y-2 text-sm">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {links.map((link, index) => (
                        <React.Fragment key={link.href}> 
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-400 hover:text-teal-300 hover:underline font-medium transition-colors"
                            >
                                {link.text}
                            </a>
                            {index < links.length - 1 && ( 
                                <span className="text-gray-500" aria-hidden="true">&bull;</span> 
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex items-center gap-1 bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                    {languageIcon && <span className="inline-block w-3 h-3">{languageIcon}</span>}
                    <span>{language}</span>
                </div>
            </div>
        </div>
    </div>
);

export default Project;