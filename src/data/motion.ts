import { MotionAspectRatio, MotionLink, MotionProject } from "../types/motion";

/** Credited as the visualizer creator on every project. */
export const visualizerCreator: MotionLink = {
  name: "Vorlie",
  url: "https://github.com/vorlie",
};

export const defaultAspectRatio: MotionAspectRatio = "20:9";

export const motionProjects: MotionProject[] = [
  {
    slug: "dance-disruptor",
    title: "DANCE DISRUPTOR",
    category: "Music visualizer",
    artist: { name: "pirapus" },
    track: { url: "https://youtu.be/KNZGAOhe84Q" },
    software: ["Adobe After Effects 2026"],
    featured: true,
    order: 1,

    description: [
      "A music visualizer built around a cat-head ANM logo. A spectrum of thin orange-to-pink lines wraps its outline, with soft drifting particles in the space around it. The particles, scale, and shake all respond to the music.",
    ],
    plugins: ["Trapcode Particular", "Trapcode Sound Keys", "Sapphire Shake", "Video Copilot Twitch"],
    techniques: [
      "Audio-reactive particles",
      "Beat-driven composition scale",
      "Beat-driven shake",
      "Smooth camera movement",
    ],
    specs: {
      resolution: "2560x1152",
      frameRate: "60 FPS",
      duration: "3:02",
    },

    year: 2026,
    status: "in-progress",              // "completed" | "in-progress"
    aspectRatio: "20:9",              // "16:9" (default) | "20:9"

    poster: "https://gallery.vorlie.pl/share/1792257495732-upload.png",

    video: { type: "youtube", id: "cTDRtkBfYB8" },
    // video: {
    //   type: "file",
    //   sources: [
    //     { src: "/videos/drown-in-you.webm", type: "video/webm" },
    //     { src: "/videos/drown-in-you.mp4", type: "video/mp4" },
    //   ],
    // },

    behindTheScenes: [
      {
        src: "https://gallery.vorlie.pl/share/1792257766797-upload.png",
        alt: "After Effects layers of the spectrum composition: spec layers with gradient layers track-matted to them",
        caption: "The spectrum composition",
      },
      {
        src: "https://gallery.vorlie.pl/share/1792257885547-upload.png",
        alt: "After Effects layers of the render composition: audio-reactive scale on beat, shake on beat and smooth camera movement",
        caption: "The render composition",
      },
    ],
    //otherCredits: [
    //  { role: "Font", name: "Name", url: "https://…" },  // role and url optional
    // ],
  },
];

export function getMotionProject(slug: string | undefined) {
  return motionProjects.find((project) => project.slug === slug);
}

export function sortMotionProjects(projects: MotionProject[]) {
  return [...projects].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER),
  );
}
