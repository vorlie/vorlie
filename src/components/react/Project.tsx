import React from 'react';

interface ProjectProps {
    title: string;
    desc: string;
    links: { href: string, text: string }[];
}

const Project: React.FC<ProjectProps> = ({ title, desc, links }) => (
    <div className="project">
        <div className="project-container">
            <p className="project-title">{title}</p>
            <p className="project-desc">{desc}</p>
        </div>
        <div className="project-details">
            <hr className="project-hr" />
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
        </div>
    </div>
);

export default Project;