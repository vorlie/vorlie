import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";

/** Link into the motion-design portfolio, used on Home and Projects. */
export default function MotionEntry() {
  return (
    <Link to="/motion" className="motion-entry">
      <span className="motion-entry__icon" aria-hidden="true">
        <Play size={16} fill="currentColor" />
      </span>

      <span className="motion-entry__text">
        <strong>Motion design</strong>
        <span>Music visualizers and other motion work</span>
      </span>

      <ArrowUpRight size={18} className="motion-entry__arrow" aria-hidden="true" />
    </Link>
  );
}
