import HeroSection from "../components/sections/HeroSection";
import SEO from "../components/SEO";

export default function HomePage() {
  return (
    <div className="text-m3-on-surface relative overflow-hidden">
      <SEO
        title="Home"
        description="My website with coding projects, tech stack, and interests in games, music, and anime."
        url="https://vorlie.pl/"
      />
      
      <HeroSection />
    </div>
  );
}