import profileImg from "../assets/profile.jpg";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Code2,
  Layout,
  Smartphone,
  Database,
  BookOpen,
} from "lucide-react";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollFloat({
  children,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top 85%",
  scrollEnd = "top 70%",
  stagger = 0.03,
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block word" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll(".inline-block");

    const animation = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.5,
          toggleActions: "play reverse play reverse",
          // markers: true,
        },
      }
    );

    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 overflow-hidden ${containerClassName}`}
    >
      <span
        className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}
      >
        {splitText}
      </span>
    </h2>
  );
}

function ScrollFadeUp({ children, className = "", scrollStart = "top 90%", scrollEnd = "top 75%", duration = 1 }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const animation = gsap.fromTo(
      el,
      {
        willChange: "opacity, transform",
        opacity: 0,
        y: 50,
      },
      {
        duration,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.5,
          toggleActions: "play reverse play reverse",
          // markers: true,
        },
      }
    );

    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
    };
  }, [duration, scrollStart, scrollEnd]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export default function About() {
  const profile = {
    name: "Christian Mejia",
    role: "Web Developer",
    avatar: profileImg,
    email: "gabzmejia117@gmail.com",
    phone: "+63 (960) 391-5837",
    location: "Philippines",
    website: "https://camejia.vercel.app",
  };

  const aboutCopy = `
Entry-level IT professional specializing in web and mobile application development. Skilled
in building responsive web apps, mobile-first solutions, and database-driven systems. Eager
to apply academic knowledge and hands-on project experience to contribute to innovative
technology solutions.
  `.trim();

  const services = [
    {
      icon: <Layout className="w-6 h-6 text-blue-500" />,
      title: "UI / UX & Web Design",
      desc: "Clean, modern interfaces with responsive, accessible layouts.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
      title: "Web Development",
      desc: "Building robust full-stack applications using React, MongoDB, PHP/CodeIgniter, and MySQL for scalable solutions.",
    },
    {
      icon: <Database className="w-6 h-6 text-blue-500" />,
      title: "Data Driven Systems",
      desc: "Developing dynamic platforms that adapt content and behavior based on real-time data and custom business logic.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: "Continuous Learning",
      desc: "Expanding skills and adapting to new technologies to stay ahead in the ever-evolving tech landscape.",
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-16 px-6 md:px-8 lg:px-12 bg-gray-100 text-gray-900 dark:bg-black dark:text-gray-100"
    >
      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[300px_1fr]">
        <aside>
          <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 p-8 text-center shadow-lg ring-1 ring-black/10 dark:ring-white/10">
            <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden ring-2 ring-blue-500/70 shadow">
              <img
                src={profile.avatar}
                alt={`${profile.name} avatar`}
                className="h-full w-full object-cover"
              />
            </div>

            <ScrollFadeUp className="mb-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {profile.name}
              </h3>
              <p className="text-sm text-blue-500 font-medium mt-1">{profile.role}</p>
            </ScrollFadeUp>

            <div className="mt-8 space-y-4 text-left text-sm">
              <ScrollFadeUp>
                <ContactItem icon={<Mail className="w-4 h-4 text-blue-500" />} label="Email">
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:underline break-all text-gray-900 dark:text-gray-200"
                  >
                    {profile.email}
                  </a>
                </ContactItem>
              </ScrollFadeUp>

              <ScrollFadeUp>
                <ContactItem icon={<Phone className="w-4 h-4 text-blue-500" />} label="Phone">
                  <a
                    href={`tel:${profile.phone}`}
                    className="hover:underline text-gray-900 dark:text-gray-200"
                  >
                    {profile.phone}
                  </a>
                </ContactItem>
              </ScrollFadeUp>

              <ScrollFadeUp>
                <ContactItem icon={<MapPin className="w-4 h-4 text-blue-500" />} label="Location">
                  <span className="text-gray-900 dark:text-gray-200">{profile.location}</span>
                </ContactItem>
              </ScrollFadeUp>

              <ScrollFadeUp>
                <ContactItem icon={<Globe className="w-4 h-4 text-blue-500" />} label="Website">
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-gray-900 dark:text-gray-200"
                  >
                    {profile.website}
                  </a>
                </ContactItem>
              </ScrollFadeUp>
            </div>
          </div>
        </aside>

        <div>
          <header className="max-w-3xl">
            <ScrollFloat
              containerClassName="text-gray-900 dark:text-gray-100 font-bold"
              textClassName="text-3xl md:text-4xl"
              scrollStart="top 85%"
              scrollEnd="top 70%"
              animationDuration={1}
              ease="back.inOut(2)"
              stagger={0.03}
            >
              About Me
            </ScrollFloat>

            <div className="h-1 w-14 bg-blue-500 rounded-full mt-2 mb-6" />
            <ScrollFadeUp>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {aboutCopy}
              </p>
            </ScrollFadeUp>
          </header>

          <section className="mt-12">
            <ScrollFloat
              containerClassName="text-gray-900 dark:text-gray-100 font-bold"
              textClassName="text-2xl"
              scrollStart="top 90%"
              scrollEnd="top 75%"
              animationDuration={1}
              ease="back.inOut(2)"
              stagger={0.03}
            >
              What I'm Doing
            </ScrollFloat>

            <div className="h-1 w-12 bg-blue-500 rounded-full mt-2 mb-8" />

            <ul className="grid gap-6 sm:grid-cols-2">
              {services.map((s) => (
                <ScrollFadeUp
                  key={s.title}
                  className="group rounded-xl p-6 bg-white/90 dark:bg-gray-900/80 ring-1 ring-black/10 dark:ring-white/10 shadow hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  scrollStart="top 95%"
                  scrollEnd="top 80%"
                  duration={0.8}
                >
                  <div className="flex items-center gap-3 mb-3 text-blue-500">
                    {s.icon}
                    <span className="font-semibold text-base text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors">
                      {s.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </ScrollFadeUp>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-blue-500">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <span className="text-gray-800 dark:text-gray-200">{children}</span>
      </div>
    </div>
  );
}
