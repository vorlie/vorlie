import React from 'react';
import Project from './Project';

export const ProjectsPage: React.FC = () => (
    <div className="projects-page">
        <h1 className="header" id='projects'>Here are some of my projects</h1>
        <div className="projects">
            <Project
                title="LifeDrain"
                desc="Attacking hostile mobs will heal you"
                links={[
                    { href: "https://github.com/vorlie/Lifedrain/", text: "Repository" },
                    { href: "https://github.com/vorlie/Lifedrain-notepad/releases/", text: "Releases" },
                    { href: "https://modrinth.com/mod/lifedrain/", text: "Modrinth" }
                ]}
                language='Java'
            />
            <Project
                title="Iota's Notepad"
                desc="Iota's Notepad is a simple note-taking application built with Electron"
                links={[
                    { href: "https://github.com/vorlie/iotas-notepad", text: "Repository" },
                    { href: "https://github.com/vorlie/iotas-notepad/releases/", text: "Releases" }
                ]}
                language='Electron, HTML/CSS/JS'
            />
            <Project
                title="Iota Player"
                desc="A feature-rich music player application with playlist management, playback controls, song information display, volume and progress tracking, Discord integration, and more."
                links={[
                    { href: "https://github.com/vorlie/IotaPlayer", text: "Repository" },
                    { href: "https://github.com/vorlie/IotaPlayer/releases/", text: "Releases" }
                ]}
                language='Python'
            />
            <Project
                title="YoutubeDL"
                desc="Simple youtube downloader. Contributions are always welcome!"
                links={[
                    { href: "https://github.com/vorlie/YoutubeDL", text: "Repository" },
                    { href: "https://github.com/vorlie/YoutubeDL/releases/", text: "Releases" }
                ]}
                language='Python'
            />
            <Project
                title="YoutubeDL-CSharp"
                desc="C# version of my python YoutubeDL app"
                links={[
                    { href: "https://github.com/vorlie/YoutubeDL-CSharp", text: "Repository" }
                ]}
                language='C#'
            />
            <Project
                title="ImageConverter"
                desc="A convenient tool for converting between JPEG, WebP, PNG, GIF, BMP, and TIFF formats. Also supports resizing."
                links={[
                    { href: "https://github.com/vorlie/ImageFormatConverter", text: "Repository" },
                    { href: "https://github.com/vorlie/ImageFormatConverter/releases", text: "Releases" }
                ]}
                language='Python'
            />
        </div>
    </div>
);

export default ProjectsPage;
