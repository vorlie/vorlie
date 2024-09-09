import React from 'react';
import '../../styles/Project.css';

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
        <div className="project-links">
            {links.map((link, index) => (
                <a key={index} className="link" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.text}
                </a>
            ))}
        </div>
    </div>
);

export default Project;
