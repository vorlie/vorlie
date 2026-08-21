import { Outlet } from "react-router-dom";
import SEO from "../components/SEO";

export default function CreativePage() {
  return (
    <>
      <SEO
        title="Creative"
        description="Music, gallery, colors, and creative tools."
        url="https://vorlie.pl/creative"
      />
      
      <Outlet />
    </>
  );
}