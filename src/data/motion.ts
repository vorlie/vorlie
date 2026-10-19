import { MotionAspectRatio, MotionLink, MotionProject } from "../types/motion";

/** Credited as the visualizer creator on every project. */
export const visualizerCreator: MotionLink = {
  name: "Vorlie",
  url: "https://github.com/vorlie",
};

export const defaultAspectRatio: MotionAspectRatio = "20:9";


export const motionProjects: MotionProject[] = [
  {
    slug: "anm-new-2026",
    title: "ANM New 2026",
    category: "Music visualizer",
    artist: { name: "Arcando & IRAH" },
    track: { url: "https://monster.cat/killerinstinct" },
    software: ["Adobe After Effects 2026"],
    featured: true,
    order: 1,

    descriptionSections: [
      {
        title: "The visualizer",
        paragraphs: [
          "A music visualizer for Arcando & IRAH's Killer Instinct, built around a vivid red audio spectrum and animated lyrics.",
          "Thin spectrum bars react to the music, while glow, beat-driven scale and shake, and subtle camera movement add energy to the composition."
        ],
      },
      {
        title: "Lyrics and timing",
        paragraphs: [
          "The lyrics were transcribed manually and timed against the track's audio waveform, rather than relying on YouTube subtitles.",
          "Each line was then animated individually in After Effects to follow the vocals while keeping the lyrics integrated with the visualizer."
        ],
      },
      {
        title: "Technical approach",
        paragraphs: [
          "The project combines audio-reactive effects with manually animated elements to give the visualizer movement without overwhelming the composition."
        ],
        list: [
          "Audio-reactive spectrum using Trapcode Sound Keys",
          "Audio-reactive particles using Trapcode Particular",
          "Beat-driven composition scale and shake",
          "Animated line-level lyrics",
          "Sapphire Glow and light treatment"
        ],
      },
    ],

    plugins: ["Trapcode Particular", "Trapcode Sound Keys", "Sapphire Shake", "Sapphire Glow", "Video Copilot Twitch"],
    techniques: [
      "Audio-reactive spectrum visualization",
      "Beat-driven composition scale",
      "Beat-driven shake",
      "Smooth camera movement",
      "Animated line-level lyrics",
      "Glow and light treatment",
    ],
    specs: {
      resolution: "2560x1152",
      frameRate: "60 FPS",
    },

    year: 2026,
    status: "completed",              // "completed" | "in-progress"
    aspectRatio: "20:9",              // "16:9" (default) | "20:9"

    poster: "https://gallery.vorlie.pl/share/1792410950933-upload.png",

    video: { type: "youtube", id: "ztAjGFK0NY0" },
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
      {
        src: "https://gallery.vorlie.pl/share/1792410985325-upload.png",
        alt: "After Effects layers of the lyrics composition: animated line-level lyrics",
        caption: "The lyrics composition",
      }
    ],
    otherCredits: [
      { role: "Font", name: "Chewy", url: "https://fonts.google.com/specimen/Chewy?preview.script=Latn" },  // role and url optional
      { role: "Wallpaper", name: "Jonathan Adams", url: "https://unsplash.com/photos/winding-road-below-zion-national-park-cliffs-Oh_M6atXMtk" },
    ],
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
