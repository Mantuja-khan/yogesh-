
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import benetoLogo from "@/assets/beneto_logo.jpg";
import bioLeafLogo from "@/assets/bio_leaf_logo.jpg";
import meherTablewareLogo from "@/assets/meher_tbblewaer_logo.jpg";
import rTechLogo from "@/assets/r_tech_logo.jpg";
import rengoLogo from "@/assets/rengologo.png";
import sunstarLogo from "@/assets/sunstar_logo.png";
import vmSolutionsLogo from "@/assets/vmsolutiions_logo.png";
import vnAronaLogo from "@/assets/vn_arona_logo.jpg";

const HOME_CLIENTS = [
  {
    id: "beneto",
    name: "Beneto",
    logo: benetoLogo,
    hoverText: "Bespoke rigid luxury packaging & brand identity systems.",
  },
  {
    id: "bio-leaf",
    name: "Bio Leaf",
    logo: bioLeafLogo,
    hoverText: "Eco-friendly sustainable packaging dielines & label craft.",
  },
  {
    id: "meher",
    name: "Meher Tableware",
    logo: meherTablewareLogo,
    hoverText: "High-impact retail carton engineering & offset print mastery.",
  },
  {
    id: "r-tech",
    name: "R-Tech Group",
    logo: rTechLogo,
    hoverText: "Trusted for creative, branding and digital marketing solutions.",
  },
  {
    id: "rengo",
    name: "Rengo",
    logo: rengoLogo,
    hoverText: "Industrial packaging, corrugated dielines & transport systems.",
  },
  {
    id: "sunstar",
    name: "Sunstar",
    logo: sunstarLogo,
    hoverText: "Precision technical packaging & retail shelf graphics.",
  },
  {
    id: "vm-solutions",
    name: "VM Solutions",
    logo: vmSolutionsLogo,
    hoverText: "Digital marketing, corporate stationery & spatial brand assets.",
  },
  {
    id: "vn-arona",
    name: "VN Arona",
    logo: vnAronaLogo,
    hoverText: "Luxury cosmetic packaging dielines & Spot UV finishing.",
  },
];

// 6 repetitions (48 items) ensures large buffer so track is 100% full infinitely with zero blank space
const EXTENDED_CLIENTS = [
  ...HOME_CLIENTS,
  ...HOME_CLIENTS,
  ...HOME_CLIENTS,
  ...HOME_CLIENTS,
  ...HOME_CLIENTS,
  ...HOME_CLIENTS,
];

const BASE_START_INDEX = HOME_CLIENTS.length * 2; // Index 16

export function HomeOurClientsSection() {
  const [activeCardId, setActiveCardId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(BASE_START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const startXRef = useRef(0);
  const currentDragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);
  const timerRef = useRef(null);
  const trackRef = useRef(null);

  // Responsive visible count: 5 on desktop, 4 on medium, 3 on tablet, 2 on mobile
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width <= 680) {
        setVisibleCount(2); // exactly 2 client logos in single horizontal line on small screens
      } else if (width <= 880) {
        setVisibleCount(3);
      } else if (width <= 1120) {
        setVisibleCount(4);
      } else {
        setVisibleCount(5); // 5 client logos visible at a time on desktop
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Slide step: next logo comes from right side (track shifts left)
  const stepNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const stepPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // When transition ends, silently normalize currentIndex back to middle set if near bounds
  const handleTransitionEnd = () => {
    if (currentIndex >= HOME_CLIENTS.length * 4) {
      setIsTransitioning(false);
      const normalized = (currentIndex % HOME_CLIENTS.length) + BASE_START_INDEX;
      setCurrentIndex(normalized);
    } else if (currentIndex < HOME_CLIENTS.length) {
      setIsTransitioning(false);
      const normalized = (currentIndex % HOME_CLIENTS.length) + BASE_START_INDEX;
      setCurrentIndex(normalized);
    }
  };

  // Re-enable transition after silent reset
  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  // Auto-advance: logo comes from right side, pauses for 3 seconds, then next logo comes with same 3s pause
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      stepNext();
    }, 3000); // 3-second pause between each step
  }, [stepNext]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!isHovered && !isDragging) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isHovered, isDragging, startTimer, stopTimer]);

  // Pointer Drag Gestures (mouse & touch) - ultra smooth
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX || 0;
    currentDragDeltaRef.current = 0;
    stopTimer();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch { }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || 0;
    const delta = currentX - startXRef.current;
    currentDragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const delta = currentDragDeltaRef.current;
    const threshold = 30;

    if (delta < -threshold) {
      // Dragged left -> advance next logo from right side
      stepNext();
    } else if (delta > threshold) {
      // Dragged right -> previous logo
      stepPrev();
    }

    setDragOffset(0);
    currentDragDeltaRef.current = 0;
    startTimer();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch { }
  };

  const handlePointerCancel = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      setDragOffset(0);
      currentDragDeltaRef.current = 0;
      startTimer();
    }
  };

  // Active dot index (0 to 7)
  const activeDotIndex =
    ((currentIndex % HOME_CLIENTS.length) + HOME_CLIENTS.length) % HOME_CLIENTS.length;

  const cellPercent = 100 / visibleCount;
  const translateXValue = `calc(-${currentIndex * cellPercent}% + ${dragOffset}px)`;

  return (
    <section className="home-clients-dark-section" aria-label="Our Clients">
      <div className="home-clients-container">
        {/* Header matching reference image: centered on small screens */}
        <div className="home-clients-header">
          <span className="home-clients-eyebrow">CLIENTS</span>
          <h2 className="two-tone-pill-heading" style={{ marginBottom: "14px", justifyContent: "center" }}>
            <span className="pill-prefix">OUR</span>
            <span className="pill-suffix">CLIENTS</span>
          </h2>
          <p className="home-clients-sub">
            Brands that trust us with their creative, packaging and marketing work.
          </p>
        </div>

        {/* Stepped Draggable Carousel: logos slide one by one from right with 3s pause */}
        <div
          className={`home-clients-carousel-stage ${isDragging ? "is-dragging" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Previous Arrow Button */}
          <button
            type="button"
            className="home-clients-nav-arrow prev"
            onClick={() => {
              stepPrev();
              startTimer();
            }}
            aria-label="Previous client logo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Draggable Viewport */}
          <div
            ref={trackRef}
            className="home-clients-carousel-viewport"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className="home-clients-carousel-track"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(${translateXValue}, 0, 0)`,
                transition:
                  isTransitioning && !isDragging
                    ? "transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    : "none",
              }}
            >
              {EXTENDED_CLIENTS.map((client, index) => {
                const isBlue = activeCardId === client.id;
                return (
                  <div
                    key={`${client.id}-${index}`}
                    className="home-clients-slide-cell"
                    style={{ flex: `0 0 ${cellPercent}%` }}
                  >
                    <div
                      className={`home-clients-chamfer-card ${isBlue ? "is-active" : ""}`}
                      onMouseEnter={() => setActiveCardId(client.id)}
                      onMouseLeave={() => setActiveCardId(null)}
                      onClick={() =>
                        setActiveCardId((prev) => (prev === client.id ? null : client.id))
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`${client.name} - ${client.hoverText}`}
                    >
                      {/* Default State: Clean White Background with crisp logo */}
                      <div className="chamfer-card-face chamfer-card-front">
                        <img
                          src={client.logo}
                          alt={`${client.name} Logo`}
                          className={`chamfer-client-logo-img client-logo-${client.id}`}
                          loading="lazy"
                          draggable={false}
                        />
                      </div>

                      {/* Hover/Active State: Royal Blue Background (#1C2752) with white descriptive text */}
                      <div className="chamfer-card-face chamfer-card-back">
                        <p className="chamfer-hover-content">{client.hoverText}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            className="home-clients-nav-arrow next"
            onClick={() => {
              stepNext();
              startTimer();
            }}
            aria-label="Next client logo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Dots for the 8 logos */}
        <div className="home-clients-dots-bar" aria-label="Logo slide indicators">
          {HOME_CLIENTS.map((client, idx) => {
            const isActive = idx === activeDotIndex;
            return (
              <button
                key={client.id}
                type="button"
                className={`home-clients-dot ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(BASE_START_INDEX + idx);
                  startTimer();
                }}
                aria-label={`Go to ${client.name} logo`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
