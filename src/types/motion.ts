export type MotionAspectRatio = "16:9" | "20:9";

export type MotionStatus = "completed" | "in-progress";

export interface MotionLink {
  name: string;
  url?: string;
}

export interface MotionVideoSource {
  src: string;
  /** MIME type, e.g. "video/mp4" or "video/webm". */
  type: string;
}

export type MotionVideo =
  | {
      type: "youtube";
      /** YouTube video ID of the visualizer (not the original track). */
      id: string;
    }
  | {
      type: "file";
      sources: MotionVideoSource[];
    };

export interface MotionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MotionSpecs {
  resolution?: string;
  frameRate?: string;
  duration?: string;
}

export interface MotionProject {
  slug: string;
  title: string;
  category: string;

  /** Music creator. Kept separate from the visualizer creator. */
  artist: MotionLink;
  track: {
    /** Only set when the track name is known and differs from the project title. */
    title?: string;
    url: string;
  };

  software: string[];

  /** Index page: the featured project (lowest `order` wins when several are set). */
  featured?: boolean;
  order?: number;

  year?: number;
  status?: MotionStatus;
  aspectRatio?: MotionAspectRatio;

  video?: MotionVideo;
  poster?: string;

  /** Paragraphs. */
  description?: string[];
  plugins?: string[];
  techniques?: string[];
  specs?: MotionSpecs;

  behindTheScenes?: MotionImage[];

  /** Asset credits other than the music and the visualizer itself. */
  otherCredits?: Array<MotionLink & { role?: string }>;
}
