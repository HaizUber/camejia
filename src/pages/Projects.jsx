import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const assocImageFiles = [
  "projAssoc1.png",
  "projAssoc2.png",
  "projAssoc3.png",
  "projAssoc4.png",
];

const renderImageFiles = [
   "projRender1.png",
   "projRender2.png",
   "projRender3.png",
   "projRender4.png",
   "projRender5.png",
   "projRender6.png",
];

const alabitesImageFiles = [
   "alabites1.png",
   "alabites2.png",
   "alabites3.png",
   "alabites4.png",
   "alabites5.png",
   "alabites6.png",
   "alabites7.png",
   "alabites8.png",
   "alabites9.png",
   "alabites10.png",
];

const rotomdexImageFiles = [
   "rotomdex1.png",
   "rotomdex2.png",
];

const portfolioImageFiles = [
    "projportfolio1.png",
    "projportfolio2.png",
    "projportfolio3.png",
    "projportfolio4.png",
];

const genshinbudImageFiles = [
    "projgenshinbud1.png",
    "projgenshinbud2.png",
    "projgenshinbud3.png",
    "projgenshinbud4.png",
    "projgenshinbud5.png",
    "projgenshinbud6.png",
    "projgenshinbud7.png",
];

const asssocImages = assocImageFiles.map(
  (file) => new URL (`../assets/${file}`, import.meta.url).href
);

const renderImages = renderImageFiles.map(
  (file) => new URL (`../assets/${file}`, import.meta.url).href
);

const alabitesImages = alabitesImageFiles.map(
  (file) => new URL (`../assets/${file}`, import.meta.url).href
);

const rotomdexImages = rotomdexImageFiles.map(
   (file) => new URL (`../assets/${file}`, import.meta.url).href
 );

const portfolioImages = portfolioImageFiles.map(
   (file) => new URL (`../assets/${file}`, import.meta.url).href
);

const genshinbudImages = genshinbudImageFiles.map(
   (file) => new URL (`../assets/${file}`, import.meta.url).href
);

const projects = [
  {
    title: "Associates Portal",
    category: "Web Development",
    desc: "Leave management system.",
    images: asssocImages,
    tech: [
      { name: "CodeIgniter", icon: "devicon-codeigniter-plain colored" },
      { name: "PHP", icon: "devicon-php-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
    ],
    details: [
      "Designed a data-driven system to enforce employee-specific conditions and leave entitlements.",
      "Provided employees with clear visibility into leave balances and filing history, while delivering HR valuable analytics on leave usage trends."
    ],
  },
  {
    title: "Render Farm Manager",
    category: "Web Development",
    desc: "PC resource management & reservations.",
    images: renderImages,
    tech: [
      { name: "CodeIgniter", icon: "devicon-codeigniter-plain colored" },
      { name: "PHP", icon: "devicon-php-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
    ],
    details: [
      "Implemented real-time PC monitoring, including availability, maintenance status, and reservation schedules via an integrated calendar.",
      "Improved efficiency for administrators by simplifying monitoring and maintenance of render farm resources."
    ],
  },
  {
    title: "Alabites Food Ordering App",
    category: "Web Development",
    desc: "Food ordering application.",
    images: alabitesImages,
    tech: [
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Express.js", icon: "devicon-express-original" },
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Firebase", icon: "devicon-firebase-plain colored" },
    ],
    details: [
      "Thesis project developed for FEU Alabang food concessionaires.",
      "Enabled students to order meals through a centralized web platform.",
      "Integrated Firebase Authentication for secure user login and registration.",
      "Implemented real-time order tracking and valuable store analytics such as inventory tracking and popular menu items.",
      "Featured a custom-built API for fetching menu data, store details, and user orders.",
      "Designed a responsive UI to ensure seamless user experience across devices."
    ],
  },
  {
    title: "Portfolio Website",
    category: "Web Design",
    desc: "Personal dev portfolio in React + Vite + Tailwind.",
    images: portfolioImages,
    tech: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Vite", icon: "devicon-vitejs-plain colored" },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored" },
    ],
    details: [
      "Built a responsive personal developer portfolio showcasing projects, skills, and experience.",
      "Implemented modern animations with GSAP, particle effects, and smooth theme toggling.",
    ],
  },
  {
    title: "RotomDex {WIP}",
    category: "Web Development",
    desc: "Pokemon-Themed Wiki Application (very early in development).",
    images: rotomdexImages,
    tech: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Vite", icon: "devicon-vitejs-plain colored" },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored" },
      { name: "PokeAPI", icon: "" }, // no official devicon
    ],
    details: [
      "Developed an interactive wiki-like website offering insights into Pokemon.",
      "Featured PokeAPI integration for fetching relevant data, evolution chains, and detailed Pokemon stats.",
      "Designed with a clean mobile-first UI to combine utility and user-friendliness."
    ],
  },
    {
    title: "Genshin Buddy",
    category: "Web Development",
    desc: "Genshin Impact-Themed Wiki Application.",
    images: genshinbudImages,
    tech: [
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Express.js", icon: "devicon-express-original" },
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    ],
    details: [
      "Developed an interactive wiki-like website offering insights and build details for Genshin Impact characters.",
      "Featured Unofficial Genshin API integration for fetching relevant data, character abilities, and detailed weapon stats.",
      "Featured its own custom-built API for fetching data missing from the Unofficial Genshin API, such as weapon/artifact recommendations based on user popularity.",
    ],
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
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0]}
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

        {project.tech && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t.name}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                {t.icon && <i className={`${t.icon} text-base`} />} {t.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);

  const dragRef = useRef({ dragging: false, startX: 0 });
  const [dragOffset, setDragOffset] = useState(0);

  const nextSlide = useCallback(() => {
    if (!project?.images?.length) return;
    setCurrentIndex((prev) => (prev + 1 < project.images.length ? prev + 1 : 0));
  }, [project]);

  const prevSlide = useCallback(() => {
    if (!project?.images?.length) return;
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : project.images.length - 1
    );
  }, [project]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (enlarged) setEnlarged(false);
        else onClose();
      }
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, enlarged, nextSlide, prevSlide]);

  useLayoutEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const anim = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
    return () => anim.kill();
  }, []);

  useEffect(() => {
    if (enlarged) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [enlarged]);

  const onPointerDown = (e) => {
    dragRef.current.dragging = true;
    dragRef.current.startX = e.clientX;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {}
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return;
    const diff = e.clientX - dragRef.current.startX;
    setDragOffset(diff);
  };
  const onPointerUp = (e) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const diff = dragOffset;
    const threshold = 60;
    if (diff < -threshold) nextSlide();
    else if (diff > threshold) prevSlide();
    setDragOffset(0);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

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
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-2xl z-20"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Image Carousel */}
        {project?.images?.length > 0 && (
          <div className="relative w-full h-64 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full flex-shrink-0 object-cover h-full cursor-zoom-in"
                  onClick={() => setEnlarged(true)}
                />
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 z-20"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 z-20"
            >
              &#8250;
            </button>

            <div className="absolute bottom-3 w-full flex justify-center gap-2 z-20">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {project.title}
          </h3>
          <p className="text-sm text-blue-500 dark:text-blue-400">
            {project.category}
          </p>

          {project.details ? (
            <ul className="mt-4 space-y-3">
              {project.details.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          ) : (
            project.desc && (
              <p className="mt-3 text-gray-700 dark:text-gray-300">{project.desc}</p>
            )
          )}

          {project.tech && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t.name}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  {t.icon && <i className={`${t.icon} text-base`} />} {t.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enlarged fullscreen carousel */}
      {enlarged && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90"
          onClick={() => setEnlarged(false)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEnlarged(false)}
              className="absolute top-6 right-6 z-30 text-white text-3xl"
              aria-label="Close enlarged"
            >
              &times;
            </button>

            <div
              className="flex transition-transform duration-300 ease-in-out h-full w-full items-center"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 h-full flex items-center justify-center"
                >
                  <img
                    src={img}
                    alt={`${project.title} enlarged ${idx + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 text-2xl z-30"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 text-2xl z-30"
            >
              &#8250;
            </button>

            <div className="absolute bottom-6 w-full flex justify-center gap-3 z-30">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-4 h-4 rounded-full ${
                    currentIndex === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}