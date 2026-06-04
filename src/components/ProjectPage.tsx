import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import { ProjectData } from "../data/projectsData";

interface ProjectPageProps {
  data: ProjectData;
}

export default function ProjectPage({ data }: ProjectPageProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen text-m3-on-surface animate-reveal">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        url={`https://vorlie.pl/project/${data.slug}`}
      />

      <div className="max-w-full mx-auto relative z-10 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-m3-primary text-xs font-black uppercase tracking-[0.25em] mb-3 opacity-70">
            {data.tagline}
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-m3-on-surface tracking-tighter mb-4">
            {data.name}
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-m3-primary to-m3-secondary rounded-sm mb-6" />
          <p className="text-lg text-m3-on-surface-variant font-bold opacity-70 max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {/* Warning Banner */}
            {data.warning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="flex items-start gap-3 bg-amber-500/10 text-amber-400 px-5 py-4 rounded-none border border-amber-500/20"
              >
                <span className="material-symbols-rounded text-[20px] flex-shrink-0 mt-0.5">
                  warning
                </span>
                <p className="font-bold text-sm leading-relaxed">
                  {data.warning.message}{" "}
                  {data.warning.linkHref && (
                    <a
                      href={data.warning.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80"
                    >
                      {data.warning.linkLabel}
                    </a>
                  )}
                </p>
              </motion.div>
            )}

            {/* CTA Block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="m3-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a
                href={data.primaryCTA.href}
                download={data.primaryCTA.download}
                target={data.primaryCTA.download ? undefined : "_blank"}
                rel={
                  data.primaryCTA.download ? undefined : "noopener noreferrer"
                }
                className="inline-flex items-center gap-2 bg-m3-primary text-m3-on-primary font-black uppercase tracking-tighter py-3 px-8 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <span className="material-symbols-rounded text-[18px]">
                  download
                </span>
                {data.primaryCTA.label}
              </a>
              {data.secondaryCTA && (
                <a
                  href={data.secondaryCTA.href}
                  className="flex items-center gap-1.5 text-m3-primary font-black text-sm hover:underline"
                >
                  {data.secondaryCTA.label}
                  <span className="material-symbols-rounded text-[16px]">
                    arrow_downward
                  </span>
                </a>
              )}
            </motion.div>

            {/* Features */}
            {data.features.filter((f) => !f.subsections).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="m3-card p-6 sm:p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-5 w-1 bg-m3-primary rounded-none" />
                  <h2 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
                    {data.featuresTitle || "Features"}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {data.features
                    .filter((f) => !f.subsections)
                    .map((feature) => (
                      <div
                        key={feature.title}
                        className="p-5 bg-m3-on-surface/5 rounded-none border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-colors duration-300"
                      >
                        <h3 className="text-sm font-black text-m3-primary mb-2">
                          {feature.title}
                        </h3>
                        {feature.desc && (
                          <p className="text-m3-on-surface-variant text-sm leading-relaxed">
                            {feature.links
                              ? feature.desc
                                  .split(feature.links[0].label)
                                  .map((part, i, arr) =>
                                    i < arr.length - 1 ? (
                                      <>
                                        {part}
                                        <a
                                          key={i}
                                          href={feature.links![0].href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-m3-primary font-bold hover:underline"
                                        >
                                          {feature.links![0].label}
                                        </a>
                                      </>
                                    ) : (
                                      part
                                    ),
                                  )
                              : feature.desc}
                          </p>
                        )}
                        {feature.tags && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {feature.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-m3-primary/10 text-m3-primary px-3 py-1 rounded-none text-[10px] font-black border border-m3-primary/20 tracking-wider uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Subsection features (e.g. Theme Customization) */}
            {data.features
              .filter((f) => f.subsections)
              .map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                  className="m3-card p-6 sm:p-10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-5 w-1 bg-m3-secondary rounded-none" />
                    <h2 className="text-sm font-black text-m3-secondary uppercase tracking-[0.2em]">
                      {feature.title}
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {feature.subsections!.map((sub) => (
                      <div
                        key={sub.title}
                        className="p-5 bg-m3-on-surface/5 rounded-none border border-m3-outline/5"
                      >
                        <h3 className="text-sm font-black text-m3-primary mb-2">
                          {sub.title}
                        </h3>
                        <p className="text-m3-on-surface-variant text-sm leading-relaxed">
                          {sub.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

            {/* Installation Guide */}
            <motion.div
              id="installation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="m3-card p-6 sm:p-10 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-5 w-1 bg-m3-primary rounded-none" />
                <h2 className="text-sm font-black text-m3-primary uppercase tracking-[0.2em]">
                  Installation Guide
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {data.installSteps.map((platform) => (
                  <div
                    key={platform.platform}
                    className="p-5 bg-m3-on-surface/5 rounded-none border border-m3-outline/5 hover:bg-m3-on-surface/10 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-m3-primary text-m3-on-primary rounded-sm flex items-center justify-center font-black text-lg shadow-md flex-shrink-0">
                        {platform.icon}
                      </div>
                      <h3 className="text-sm font-black text-m3-primary">
                        {platform.platform}
                      </h3>
                    </div>
                    <p className="text-m3-on-surface-variant text-sm mb-4 leading-relaxed">
                      {platform.description}
                    </p>
                    {platform.steps && (
                      <div className="space-y-2">
                        {platform.steps.map((step) => (
                          <div
                            key={step.label}
                            className="bg-m3-surface-container/50 rounded-none p-3 border border-m3-outline/10 relative overflow-hidden group"
                          >
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-m3-primary/40 group-hover:bg-m3-primary transition-colors" />
                            <p className="text-[10px] text-m3-on-surface-variant font-black uppercase tracking-widest mb-1.5 opacity-50 pl-1">
                              {step.label}
                            </p>
                            <code className="text-xs font-bold text-m3-on-surface break-all block pl-1">
                              {step.code}
                            </code>
                          </div>
                        ))}
                      </div>
                    )}
                    {platform.cta && (
                      <a
                        href={platform.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-black text-m3-primary hover:underline"
                      >
                        <span className="material-symbols-rounded text-[14px]">
                          open_in_new
                        </span>
                        {platform.cta.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 flex flex-col gap-6">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-m3-on-surface-variant font-black text-xs uppercase tracking-wider hover:text-m3-primary transition-colors duration-300 group"
              >
                <span className="material-symbols-rounded text-[16px] transition-transform duration-300 group-hover:-translate-x-1">
                  arrow_back
                </span>
                All Projects
              </Link>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="m3-card p-6"
            >
              <h2 className="text-xs font-black text-m3-primary uppercase tracking-[0.2em] mb-4">
                About
              </h2>
              <p className="text-m3-on-surface-variant text-sm leading-relaxed mb-5">
                {data.aboutText}
              </p>
              <div className="flex flex-col gap-2">
                {data.techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-none bg-m3-primary flex-shrink-0" />
                    <span className="font-bold text-xs text-m3-on-surface-variant">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="m3-card p-6 overflow-hidden"
            >
              <h2 className="text-xs font-black text-m3-primary uppercase tracking-[0.2em] mb-4">
                Gallery
              </h2>
              <div className="flex flex-col gap-3">
                {data.gallery.map((img) => (
                  <div
                    key={img.path}
                    className="group relative bg-m3-on-surface/5 rounded-none overflow-hidden border border-m3-outline/5 hover:border-m3-primary/20 transition-all cursor-pointer"
                    onClick={() => setModalImage(img.path)}
                  >
                    <div className="p-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-m3-on-surface-variant mb-2 group-hover:text-m3-primary transition-colors">
                        {img.name}
                      </p>
                      <div className="relative overflow-hidden rounded-none">
                        <img
                          src={img.path}
                          alt={img.name}
                          className="w-full h-auto group-hover:scale-110 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x400?text=Screenshot+Unavailable";
                          }}
                        />
                        <div className="absolute inset-0 bg-m3-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-m3-surface/90 p-2 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="material-symbols-rounded text-m3-primary text-[20px]">
                              zoom_in
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="m3-card p-5"
            >
              <div className="flex flex-col gap-3">
                {data.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-m3-on-surface-variant hover:text-m3-primary transition-colors group text-sm font-black uppercase tracking-wider"
                  >
                    <span>{link.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                      {link.meta}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="m3-card mt-6 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-xs font-black text-m3-on-surface uppercase tracking-[0.2em] mb-2">
              Acknowledgments
            </h3>
            <p className="text-m3-on-surface-variant text-sm">
              {data.acknowledgments}
            </p>
          </div>
          <p className="text-xs font-black text-m3-on-surface-variant uppercase tracking-[0.2em] opacity-30 flex-shrink-0">
            © {new Date().getFullYear()} vorlie
          </p>
        </motion.div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12 bg-m3-surface/95 backdrop-blur-xl"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative bg-m3-surface-container rounded-none p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] border border-m3-outline/20 max-w-6xl w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 z-10 p-3 bg-m3-primary text-m3-on-primary rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-90 transition-all"
              onClick={() => setModalImage(null)}
            >
              <span className="material-symbols-rounded text-[22px]">
                close
              </span>
            </button>
            <div className="overflow-auto rounded-none">
              <img
                src={modalImage}
                alt="Fullscreen Preview"
                className="w-full h-auto object-contain max-h-[85vh] rounded-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
