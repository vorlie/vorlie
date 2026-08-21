import { Outlet } from "react-router-dom";
import SEO from "../components/SEO";

export default function DevPage() {
  return (
    <>
      <SEO
        title="Dev"
        description="Development projects, API documentation, GitHub activity, and tutorials."
        url="https://vorlie.pl/dev"
      />
      
      <Outlet />
    </>
  );
}