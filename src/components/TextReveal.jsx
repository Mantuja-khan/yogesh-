import { useEffect, useRef, useState } from "react";

/**
 * TextReveal Component
 * Reveals text word-by-word with high-end editorial masked glide-up animation.
 * 
 * Props:
 * - text: string (optional, or use children)
 * - as: string or component tag (default "span")
 * - triggerOnMount: boolean (true for hero sections, false for scroll-triggered)
 * - delay: number (base delay in seconds, default 0)
 * - stagger: number (per-word delay in seconds, default 0.035)
 * - className: string
 */
export function TextReveal({
  children,
  text,
  as: Component = "span",
  className = "",
  triggerOnMount = false,
  delay = 0,
  stagger = 0.035,
  once = true,
  ...props
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);

  const rawContent = text || (typeof children === "string" ? children : null);

  useEffect(() => {
    if (triggerOnMount) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 60);
      return () => clearTimeout(timer);
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [triggerOnMount, once]);

  // If simple string provided, split into words
  if (rawContent) {
    const words = rawContent.split(/\s+/).filter(Boolean);

    return (
      <Component
        ref={containerRef}
        className={`text-reveal-container ${isRevealed ? "is-revealed" : ""} ${className}`}
        aria-label={rawContent}
        {...props}
      >
        {words.map((word, idx) => (
          <span className="text-reveal-word-mask" key={idx} aria-hidden="true">
            <span
              className="text-reveal-word-inner"
              style={{
                transitionDelay: `${(delay + idx * stagger).toFixed(3)}s`,
              }}
            >
              {word}
            </span>
            {idx < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Component>
    );
  }

  // If complex JSX children provided, wrap lines / spans
  return (
    <Component
      ref={containerRef}
      className={`text-reveal-container ${isRevealed ? "is-revealed" : ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
