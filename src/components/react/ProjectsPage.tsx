import React from 'react';
import Project from './Project';

export const ProjectsPage: React.FC = () => (
    <div className="projects-page">
        <p className="header-text">Projects</p>
        <div className="projects">
            <Project
                title="Iota Player"
                desc="A feature-rich music player application with playlist management, playback controls, song information display, volume and progress tracking, Discord integration, and more."
                links={[{ href: "https://github.com/vorlie/IotaPlayer", text: "Repository" }]}
            />
            <Project
                title="YoutubeDL"
                desc="Simple youtube downloader. Contributions are always welcome!"
                links={[
                    { href: "https://github.com/vorlie/YoutubeDL", text: "Repository" },
                    { href: "https://github.com/vorlie/YoutubeDL/releases/", text: "Releases" }
                ]}
            />
            <Project
                title="ImageConverter"
                desc="A convenient tool for converting between JPEG, WebP, PNG, GIF, BMP, and TIFF formats. Also supports resizing."
                links={[
                    { href: "https://github.com/vorlie/ImageFormatConverter", text: "Repository" },
                    { href: "https://github.com/vorlie/ImageFormatConverter/releases", text: "Releases" }
                ]}
            />
            <Project
                title="FFmpegMerger"
                desc="Allows to merge audio and video files with ease, without touching the terminal. FFmpeg is needed!"
                links={[
                    { href: "https://github.com/vorlie/FFmpegMerger", text: "Repository" },
                    { href: "https://github.com/vorlie/FFmpegMerger/releases", text: "Releases" }
                ]}
            />
            <Project
                title="multi-tool"
                desc="Supports image file conversion, audio-video merging, and a fun AI chat. Requires FFmpeg in PATH. Discover the easter egg!"
                links={[
                    { href: "https://github.com/vorlie/multi-tool", text: "Repository" },
                    { href: "https://github.com/vorlie/multi-tool/releases", text: "Releases" }
                ]}
            />
            <Project
                title="NotepadV"
                desc="Project created for fun due to my boredom. I won't be updating it that much since as I said it's for fun."
                links={[
                    { href: "https://github.com/vorlie/NotepadV", text: "Repository" },
                    { href: "https://github.com/vorlie/NotepadV/releases", text: "Releases" }
                ]}
            />
        </div>
    </div>
);

export default ProjectsPage;
