import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * ScrollRevealProvider
 * Automatically attaches smooth directional fade-in animations
 * (content & images sliding in from left and right) across EVERY page on scroll.
 */
export function ScrollRevealProvider() {
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname;

  useEffect(() => {
    let observer;

    const setupObserver = () => {
      if (typeof window === "undefined") return;

      // Disconnect previous observer if any
      if (observer) {
        observer.disconnect();
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              // Once revealed, keep it visible for clean reading experience
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      // 1. Automatically classify split sections (left content / right image or vice-versa)
      const splitSections = document.querySelectorAll(
        ".subpage-split-hero, .editorial-split, .brand-story-grid, .page-header-with-mascot"
      );

      splitSections.forEach((section) => {
        const left = section.querySelector(
          ".subpage-split-left, .editorial-split-left, .page-header-text, .split-col-left"
        );
        const right = section.querySelector(
          ".subpage-split-right, .editorial-split-right, .page-header-mascot-slot, .split-col-right"
        );

        if (left && !left.classList.contains("scroll-reveal-left") && !left.classList.contains("scroll-reveal-right")) {
          left.classList.add("scroll-reveal-left");
        }
        if (right && !right.classList.contains("scroll-reveal-right") && !right.classList.contains("scroll-reveal-left")) {
          right.classList.add("scroll-reveal-right");
        }
      });

      // 2. Classify works grid cards (alternating left & right entry)
      const gridCardLists = document.querySelectorAll(
        ".playbook-works-grid, .photography-clean-grid, .subpage-works-pure-grid, .service-capabilities-grid, .editorial-grid"
      );

      gridCardLists.forEach((grid) => {
        const cards = grid.querySelectorAll(
          ".playbook-work-card, .subpage-pure-image-card, .capability-card-simple, .editorial-project"
        );
        cards.forEach((card, idx) => {
          if (
            !card.classList.contains("scroll-reveal-left") &&
            !card.classList.contains("scroll-reveal-right") &&
            !card.classList.contains("scroll-reveal")
          ) {
            // Alternating: Even comes from left, Odd comes from right
            if (idx % 2 === 0) {
              card.classList.add("scroll-reveal-left");
            } else {
              card.classList.add("scroll-reveal-right");
            }

            // Stagger delay for fluid waterfall feel
            const delayMod = (idx % 3) + 1;
            card.classList.add(`scroll-reveal-delay-${delayMod}`);
          }
        });
      });

      // 3. Classify contact section & standalone banners
      const contactBoxes = document.querySelectorAll(".ref-contact-box, .meaningful-contact-section, .brands-performance-header");
      contactBoxes.forEach((box) => {
        if (!box.classList.contains("scroll-reveal-up") && !box.classList.contains("scroll-reveal")) {
          box.classList.add("scroll-reveal-up");
        }
      });

      const brandStage = document.querySelector(".brands-performance-stage");
      if (brandStage && !brandStage.classList.contains("scroll-reveal-right")) {
        brandStage.classList.add("scroll-reveal-right");
      }

      // 4. Query all elements to be animated
      const allRevealElements = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up, [data-reveal]"
      );

      allRevealElements.forEach((el) => {
        // Custom attribute overrides
        const dataReveal = el.getAttribute("data-reveal");
        if (dataReveal === "left" && !el.classList.contains("scroll-reveal-left")) {
          el.classList.add("scroll-reveal-left");
        } else if (dataReveal === "right" && !el.classList.contains("scroll-reveal-right")) {
          el.classList.add("scroll-reveal-right");
        } else if (dataReveal === "up" && !el.classList.contains("scroll-reveal-up")) {
          el.classList.add("scroll-reveal-up");
        }

        // If element is already in the viewport upon mount/scroll, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    // Small delay ensures TanStack router has finished rendering DOM nodes
    const timer = setTimeout(setupObserver, 80);

    // MutationObserver to catch dynamically added work cards (like when switching categories)
    let mutationTimer;
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(setupObserver, 120);
    });

    const mainNode = document.querySelector("main") || document.body;
    if (mainNode) {
      mutationObserver.observe(mainNode, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(mutationTimer);
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [currentPath]);

  return null;
}
