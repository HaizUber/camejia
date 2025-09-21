import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const footerRef = useRef(null);
  const [toast, setToast] = useState(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector("h2");
    const inputs = section.querySelectorAll("input, textarea, button");
    const footer = footerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      heading,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      inputs,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      },
      "-=0.4"
    );

    if (footer) {
      tl.fromTo(
        footer,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showToast("success", "✅ Your message has been sent!");
        form.reset();
      } else {
        showToast("error", "❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      showToast("error", "❌ Network error. Please try again later.");
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });

    setTimeout(() => setToast(null), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full px-6 md:px-12 py-16 transition-colors bg-gray-100 text-gray-900 dark:bg-black dark:text-white"
    >
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-50 transition-all duration-500
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Me</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-3 rounded w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="p-3 rounded w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="p-3 rounded w-full h-32 bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="py-3 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="w-full flex justify-end pr-12">
        <footer
          ref={footerRef}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm select-none"
        >
          <span>Made with</span>
          <Heart className="w-5 h-5 text-red-500" />
          <span>by Christian</span>
        </footer>
      </div>
    </section>
  );
}
