import React, { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children, className = "", direction = "up", delay = 0 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const directionClass =
    direction === "left"
      ? isInView
        ? "translate-x-0"
        : "-translate-x-16"
      : direction === "right"
      ? isInView
        ? "translate-x-0"
        : "translate-x-16"
      : isInView
      ? "translate-y-0"
      : "translate-y-10";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${directionClass} ${
        isInView ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;