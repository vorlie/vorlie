import { Outlet } from "react-router-dom";
import SEO from "../components/SEO";

export default function GamingPage() {
  return (
    <>
      <SEO
        title="Gaming"
        description="Gaming clips, PC specs, game accounts, and gaming projects."
        url="https://vorlie.pl/gaming"
      />
      
      <Outlet />
    </>
  );
}