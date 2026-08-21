import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppShell from "../components/layout/AppShell";
import { LanyardProvider } from "../context/LanyardContext";

import Home from "../pages/Home";
import Projects from "../pages/Projects";
import About from "../pages/About";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";

export default function App() {
  return (
    <BrowserRouter>
      <LanyardProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </LanyardProvider>
    </BrowserRouter>
  );
}
