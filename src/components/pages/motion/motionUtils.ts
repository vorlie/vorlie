import { CSSProperties } from "react";
import { defaultAspectRatio } from "../../../data/motion";
import { MotionProject } from "../../../types/motion";

/** Sets the aspect ratio that reserves space for the media, so nothing shifts on load. */
export function aspectStyle(project: MotionProject) {
  const ratio = project.aspectRatio ?? defaultAspectRatio;

  return {
    "--motion-aspect": ratio.replace(":", " / "),
  } as CSSProperties;
}

export const statusLabels: Record<NonNullable<MotionProject["status"]>, string> = {
  completed: "Completed",
  "in-progress": "In progress",
};
