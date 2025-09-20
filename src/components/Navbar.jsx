"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { cloneElement, useRef, useState } from "react";
import {
  MoonIcon,
  SunIcon,
  HomeIcon,
  UserIcon,
  FolderIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center rounded-md bg-gray-200 dark:bg-black border border-neutral-700 shadow-md cursor-pointer transition-colors duration-300 ${className}`}
    >
      {/* Pass hovered state down as isHovered boolean prop */}
      {cloneElement(children, { isHovered: hovered })}
    </motion.div>
  );
}

function DockLabel({ children, isHovered }) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-blue-600 bg-black px-2 py-0.5 text-xs text-blue-400"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

export default function Navbar({ toggleTheme, theme }) {
  const mouseX = useMotionValue(Infinity);
  const spring = { mass: 0.1, stiffness: 150, damping: 12 };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const items = [
    {
      label: "Home",
      icon: <HomeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      onClick: () => scrollToSection("home"),
    },
    {
      label: "About",
      icon: <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      onClick: () => scrollToSection("about"),
    },
    {
      label: "Projects",
      icon: <FolderIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      onClick: () => scrollToSection("projects"),
    },
    {
      label: "Contact",
      icon: <EnvelopeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      onClick: () => scrollToSection("contact"),
    },
    {
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon:
        theme === "dark" ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-600" />
        ),
      onClick: toggleTheme,
    },
  ];

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 z-[9999] transform -translate-x-1/2 flex items-end gap-4 rounded-2xl border border-gray-600 bg-white dark:bg-black px-4 pb-2 shadow-lg"
      onMouseMove={({ pageX }) => {
        mouseX.set(pageX);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
      }}
    >
      {items.map((item, idx) => (
        <DockItem
          key={idx}
          onClick={item.onClick}
          mouseX={mouseX}
          spring={spring}
          distance={200}
          magnification={70}
          baseItemSize={50}
        >
          <>
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </>
        </DockItem>
      ))}
    </motion.div>
  );
}
