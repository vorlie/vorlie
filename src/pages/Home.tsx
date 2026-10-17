import Buttons88x31 from "../components/pages/home/Buttons88x31";
import FeaturedProjects from "../components/pages/home/FeaturedProjects";
import Welcome from "../components/pages/home/Welcome";
import MotionEntry from "../components/pages/motion/MotionEntry";

export default function Home() {

  return (
    <div className="home">
      <Welcome />
      <FeaturedProjects />
      <MotionEntry />
      <Buttons88x31/>
    </div>
  );
}
