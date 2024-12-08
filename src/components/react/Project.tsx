import React from 'react';

interface ProjectProps {
    title: string;
    desc: string;
    links: { href: string, text: string }[];
    language: string; // Add language property
}

const Project: React.FC<ProjectProps> = ({ title, desc, links, language }) => (
    <div className="project">
        <div className="project-container">
            <p className="project-title">{title}</p>
            <p className="project-desc">{desc}</p>
        </div>
        <div className="project-details">
            <hr className="project-hr" />
            <div className="project-info">
                <div className="project-links">
                    {links.map((link, index) => (
                        <React.Fragment key={index}>
                            <a className="link" href={link.href} target="_blank" rel="noopener noreferrer">
                                {link.text}
                            </a>
                            {index < links.length - 1 && <span className="separator"> • </span>}
                        </React.Fragment>
                    ))}
                </div>
                <p className="project-language">{language}</p>
            </div>
        </div>
    </div>
);

export default Project;