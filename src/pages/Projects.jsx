import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Associates Portal",
    category: "Web Development",
    desc: "Leave management system.",
    // image: projAssoc,
  },
  {
    title: "Render Farm Manager",
    category: "Web Development",
    desc: "PC resource management & reservations.",
    // image: projRender,
  },
  {
    title: "Portfolio Website",
    category: "Web Design",
    desc: "Personal dev portfolio in React + Vite + Tailwind.",
    // image: projPortfolio,
  },
];

function ScrollFloatHeading({ children }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll("span");

    const anim = gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 40,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.03,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
          // markers: true,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const splitChars = React.useMemo(() => {
    if (typeof children !== "string") return children;
    return children.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  return (
    <h2
      ref={containerRef}
      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
    >
      {splitChars}
    </h2>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="projects"
      className="w-full py-16 px-6 md:px-8 lg:px-12 bg-gray-100 text-gray-900 dark:bg-black dark:text-gray-100"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollFloatHeading>Projects</ScrollFloatHeading>
        <div className="h-1 w-14 bg-blue-500 rounded-full mt-2 mb-10" />
        <ProjectsGrid items={projects} onSelect={setSelected} />
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ProjectsGrid({ items, onSelect }) {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards) return;

    const anim = gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
          // markers: true,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  return (
    <ul
      ref={gridRef}
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((p) => (
        <ProjectCard key={p.title} project={p} onClick={() => onSelect(p)} />
      ))}
    </ul>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <li
      onClick={onClick}
      className="project-card cursor-pointer group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 ring-1 ring-black/10 dark:ring-white/10 shadow transition-all hover:shadow-xl hover:-translate-y-0.5"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {project.title}
        </h4>
        <p className="text-sm text-blue-500 dark:text-blue-400">{project.category}</p>
        {project.desc && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{project.desc}</p>
        )}
      </div>
    </li>
  );
}

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useLayoutEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    const anim = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );

    return () => anim.kill();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {project.title}
          </h3>
          <p className="text-sm text-blue-500 dark:text-blue-400">
            {project.category}
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300">{project.desc}</p>
        </div>
      </div>
    </div>
  );
}
