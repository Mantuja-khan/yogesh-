import { createFileRoute, Link } from "@tanstack/react-router";
import { LetterCascade } from "@/components/ui/letter-cascade";
import { ArrowDown, ArrowLeftRight, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Compass, Eye, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero3D } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import pdfIcon from "@/assets/pdf-icon.svg";
import missionBg from "@/assets/mission-bg.jpg";
import visionBg from "@/assets/vision-bg.jpg";
import heroBannerImg from "@/assets/hero-banner.png";
import drag1 from "@/assets/drag1.png"
import drag2 from "@/assets/drag2.png"
import heroSectionVideo from "@/assets/hero_section.png";
import brandsShowcaseImg from "@/assets/brands-performance-showcase-clean.png";
import pendantLampImg from "@/assets/pendant_lamp.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SS Production House — Graphic Designer & Spatial Studio" },
      { name: "description", content: "A 3D graphic design studio for brand identity, packaging, editorial systems, and immersive visual worlds." },
      { property: "og:title", content: "SS Production House — Graphic Designer & Spatial Studio" },
      { property: "og:description", content: "Brand identity, packaging, and spatial graphic design by SS Production House." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [heroMounted, setHeroMounted] = useState(true);
  const cursorRef = useRef(null);
  const reelController = useRef(null);

  const handleHeroPointerMove = (e) => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--hero-glow-x", `${x.toFixed(2)}%`);
    hero.style.setProperty("--hero-glow-y", `${y.toFixed(2)}%`);
  };

  const handleReelScroll = (direction) => {
    const nudgeAmount = direction === "next" ? -240 : 240;
    reelController.current?.nudge(nudgeAmount);
  };

  useEffect(() => {
    setHeroMounted(true);
  }, []);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Scroll animations & Hero ScrollTrigger Parallax Scrub
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
          document.documentElement.style.setProperty("--scroll-progress", `${progress}`);

          // Hero Parallax Scrub (ScrollTrigger scale & translate effect)
          const heroEl = document.getElementById("top");
          if (heroEl) {
            const heroHeight = heroEl.offsetHeight || window.innerHeight;
            const heroProgress = Math.min(Math.max(scrollTop / heroHeight, 0), 1);
            heroEl.style.setProperty("--hero-scroll", `${heroProgress}`);
            heroEl.style.setProperty("--hero-scroll-px", `${scrollTop}`);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add("is-revealed");
      }
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const displayProjects = portfolio.homeDraggingItems && portfolio.homeDraggingItems.length > 0
    ? portfolio.homeDraggingItems
    : portfolio.projects.filter((p) => !p.isPdf && p.featuredOnHome !== false);

  return (
    <div className="portfolio-shell" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main>
        {/* Responsive Custom Hero with Clean Borderless Visual */}
        <section className="editorial-hero custom-designer-hero" id="top">
          {/* Studio Backdrop: Curved Sky-Blue Curves, Perspective Line & Hanging Pendant Lamp */}
          <div className="hero-studio-backdrop-scene" aria-hidden="true">
            <svg
              className="hero-backdrop-curves-svg"
              viewBox="0 0 1440 680"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="skyWaveGradLeft" x1="0%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#67AFFB" />
                  <stop offset="60%" stopColor="#89C4FD" />
                  <stop offset="100%" stopColor="#A8D6FD" />
                </linearGradient>
                <linearGradient id="skyCircleGradCenter" x1="25%" y1="0%" x2="75%" y2="100%">
                  <stop offset="0%" stopColor="#60ABFA" />
                  <stop offset="50%" stopColor="#80C0FD" />
                  <stop offset="100%" stopColor="#B3DAFE" />
                </linearGradient>
                <linearGradient id="studioAmbientFloor" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="70%" stopColor="#E6F2FE" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D9ECFE" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Ambient Studio Floor Wash on Right */}
              <rect x="0" y="0" width="1440" height="680" fill="url(#studioAmbientFloor)" />

              {/* Continuous Organic Sky-Blue Wave flowing from Top-Left into the Circular Lamp Arch */}
              <path
                d="M -20 -20 L 0 90 C 80 65 160 60 240 68 C 320 76 390 105 450 140 C 495 170 525 220 575 220 C 640 215 700 125 740 -20 Z"
                fill="url(#skyCircleGradCenter)"
              />

              {/* Architectural Perspective Line */}
              <line
                x1="575"
                y1="220"
                x2="1440"
                y2="50"
                stroke="#87BEFC"
                strokeWidth="1.6"
                strokeOpacity="0.85"
              />
            </svg>

            {/* Hanging Pendant Ceiling Lamp with Golden Cap & Warm Downward Glow */}
            <div className="hero-pendant-lamp-wrapper">
              <div className="hero-lamp-glow-cone" />
              <img
                src={pendantLampImg}
                alt=""
                className="hero-pendant-lamp-img"
                draggable={false}
              />
            </div>
          </div>

          <div className="hero-banner-inner-grid">
            {/* Left Content Column */}
            <div className="hero-banner-content-col">
              {/* Studio Brand Name at the Top of 'I AM, YOGESH DAHIYA' */}
              <h2 className="hero-studio-top-brand">
                <TextReveal triggerOnMount delay={0.06} stagger={0.05}>
                  SS PRODUCTION HOUSE
                </TextReveal>
              </h2>

              <h1 className="hero-custom-h1" aria-label="I AM, YOGESH DAHIYA">
                <span className="hero-custom-line-1">
                  <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                    I AM,
                  </TextReveal>
                </span>
                <span className="hero-custom-line-2">
                  <LetterCascade
                    text="YOGESH DAHIYA"
                    stiffness={350}
                    damping={8}
                    staggerDuration={0.06}
                    letterClassName={(i) => (i < 6 ? "hero-gold-text" : "hero-dark-text")}
                  />
                </span>
              </h1>

              <p className="hero-designer-role-tag">
                <TextReveal triggerOnMount delay={0.52} stagger={0.035}>
                  Graphic Designer &amp; Visual Director
                </TextReveal>
              </p>

              {/* Decorative Accent Divider Bar (Clean Golden Rounded Bar matching reference image) */}
              <div className="hero-custom-divider" aria-hidden="true" />

              {/* Paragraph Narrative */}
              <p className="hero-custom-desc">
                <TextReveal triggerOnMount delay={0.65} stagger={0.016}>
                  {portfolio.intro}
                </TextReveal>
              </p>

              {/* Call to action buttons row: Explore Designs + Get In Touch */}
              <div className="hero-custom-cta-wrap">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("work");
                  }}
                  className="hero-custom-pill-btn"
                >
                  <span>EXPLORE SELECTED DESIGNS</span>
                  <span className="hero-pill-arrow-circle">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <Link
                  to="/contact"
                  className="hero-custom-secondary-pill-btn"
                  title="Contact SS Production House"
                >
                  <span>GET IN TOUCH</span>
                  <span className="hero-pill-arrow-circle">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Visual Column (Borderless Clean Visual) */}
            <div className="hero-banner-visual-col">
              <div className="hero-clean-visual-wrap">
                <img
                  src={heroSectionVideo}
                  alt="Yogesh Dahiya - Graphic Designer & Visual Director"
                  className="hero-scene-character-image"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Bottom Center: Scroll Down Indicator */}
          <div
            className="hero-custom-scroll-cue"
            onClick={() => scrollTo("work")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") scrollTo("work");
            }}
            aria-label="Scroll down to selected designs"
          >
            <div className="hero-mouse-pill">
              <span className="hero-mouse-dot" />
            </div>
            <div className="hero-scroll-caption">
              <span>SCROLL DOWN</span>
              <ArrowDown className="hero-scroll-caption-arrow" />
            </div>
          </div>
        </section>

        {/* Client Logos Auto-Drifting Ticker — Right to Left (Logos & Clean Names) */}
        <section className="hero-clients-ticker-section" aria-label="Client Brands">
          <div className="hero-clients-ticker-inner">
            <AutoScrollRow
              items={portfolio.clientLogos || []}
              direction="rtl"
              speedPixelsPerSecond={48}
              renderItem={(client) => (
                <div className="hero-client-logo-item" key={client.id || client.name}>
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="hero-client-logo-img"
                      loading="eager"
                    />
                  ) : (
                    <div className="hero-client-text-badge">
                      <span className="hero-client-text-name">{client.name}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        </section>

        {/* Selected Works Section */}
        <section className="portfolio-section work" id="work">
          <div className="work-header-flex">
            <div className="work-header-left">
              <p className="section-index">
                <span>01</span> <TextReveal delay={0.05}>Selected designs</TextReveal>
              </p>
              <h2 className="work-section-compact-titlefont-bold">
                <TextReveal delay={0.12} stagger={0.05}>
                  OUR GENUINE GRAPHIC WORKS.
                </TextReveal>
              </h2>
            </div>
          </div>

          {/* Single-Line Infinite Draggable Works Reel (Right to Left) */}
          <div className="works-single-line-container">
            <AutoScrollRow
              items={displayProjects}
              direction="rtl"
              speedPixelsPerSecond={38}
              controllerRef={reelController}
              className="works-infinite-scroll-wrap"
              renderItem={(project, index) => {
                return (
                  <article
                    key={project.id}
                    className="works-single-line-card card-3d"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <Link
                      to="/works"
                      search={{ category: project.categoryKey }}
                      className="single-line-image-wrap"
                      aria-label={`Explore ${project.title}`}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <img
                        src={project.image}
                        alt={project.alt || project.title}
                        width={300}
                        height={375}
                        loading={index < 4 ? "eager" : "lazy"}
                        draggable={false}
                      />
                      <div className="single-line-image-overlay">
                        <span className="single-line-inquire-badge">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              }}
            />
          </div>

          {/* Prominent View More Button below the single line reel */}
          <div className="section-cta-wrap scroll-reveal" style={{ marginTop: "24px", textAlign: "center" }}>
            <Link to="/works" className="start-link home-view-more-action" style={{ margin: "0 auto" }}>
              <span>View More — Our Works Page</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>



        {/* ROI Services Highlight Section (Above Studio Tools & Software Stack) */}
        {portfolio.roiServicesSection && (
          <section className="roi-services-section" aria-label="Our Services — High ROI Solutions">
            <div className="roi-bg-ambient" aria-hidden="true" />
            <div className="roi-bg-dots" aria-hidden="true" />
            <div className="roi-services-container">
              <div className="roi-services-header scroll-reveal">
                <span className="roi-services-eyebrow">
                  <TextReveal delay={0.05}>{portfolio.roiServicesSection.badge}</TextReveal>
                </span>
                <h2 className="roi-services-title">
                  <TextReveal delay={0.12} stagger={0.04}>
                    {portfolio.roiServicesSection.titlePrefix}
                  </TextReveal>{" "}
                  <span className="roi-blue-accent">
                    <TextReveal delay={0.25} stagger={0.04}>
                      {portfolio.roiServicesSection.titleHighlight}
                    </TextReveal>
                  </span>{" "}
                  <TextReveal delay={0.35} stagger={0.04}>
                    {portfolio.roiServicesSection.titleSuffix}
                  </TextReveal>
                </h2>
              </div>

              <div className="roi-services-grid">
                {portfolio.roiServicesSection.items.map((service, index) => (
                  <article
                    key={service.id}
                    className={`roi-service-card scroll-reveal scroll-reveal-delay-${(index % 4) + 1}`}
                  >
                    {/* Top Right Hatched Stripes Pattern */}
                    <div className="roi-card-hatch-pattern" aria-hidden="true" />

                    {/* Top Floating Circular Icon Badge */}
                    <div className="roi-card-icon-badge">
                      {service.iconType === "pen-tool" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="roi-icon-svg">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      )}
                      {service.iconType === "megaphone" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="roi-icon-svg">
                          <path d="m3 11 18-5v12L3 14v-3z" />
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                          <path d="M21 9v6" />
                        </svg>
                      )}
                      {service.iconType === "code" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="roi-icon-svg">
                          <rect width="18" height="14" x="3" y="5" rx="2" />
                          <path d="m9 11-2 2 2 2" />
                          <path d="m15 11 2 2-2 2" />
                          <path d="M11 17l2-6" />
                        </svg>
                      )}
                      {service.iconType === "photoshoot" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="roi-icon-svg">
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                      )}
                    </div>

                    <h3 className="roi-card-title">{service.title}</h3>
                    <p className="roi-card-desc">{service.description}</p>

                    <Link to={service.linkTo} className="roi-card-action">
                      <span>{service.linkText.replace(" →", "")}</span>
                      <span className="roi-card-action-arrow">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Brand Performance & Packaging Agency Showcase Section (We Build Brands That Performs - Guaranteed) */}
        <BrandPerformanceSection />

        {/* Studio Tools & Software Stack Draggable Ticker — Drifting Right to Left */}
        <section className="studio-stack-ticker-section" aria-label="Studio Creative Software Stack">
          <div className="studio-stack-ticker-header">
            <h3 className="studio-stack-title">
              <TextReveal delay={0.06} stagger={0.035}>
                Studio Creative Software &amp; Tools
              </TextReveal>
            </h3>
            <p className="studio-stack-desc">
              <TextReveal delay={0.18} stagger={0.015}>
                Industry-standard design applications powering high-precision dielines, editorial typography, photo retouching, and 3D spatial staging.
              </TextReveal>
            </p>
          </div>
          <div className="studio-stack-ticker-inner">
            <AutoScrollRow
              items={portfolio.studioStack || []}
              direction="rtl"
              speedPixelsPerSecond={44}
              renderItem={(tool) => (
                <div
                  className="studio-stack-logo-only-card"
                  key={tool.id || tool.name}
                  title={tool.name}
                >
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} className="studio-stack-logo-large" loading="lazy" />
                  ) : (
                    <span className="studio-stack-badge-fallback" style={{ color: tool.badgeColor || "var(--accent)" }}>
                      {tool.short || tool.name.slice(0, 2)}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </section>

      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}

function AutoScrollRow({
  items,
  renderItem,
  direction = "rtl",
  speedPixelsPerSecond = 40,
  controllerRef = null,
  className = "",
  minItemsToScroll = 1,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);
  const totalDragDistanceRef = useRef(0);
  const justDraggedRef = useRef(false);
  const offsetRef = useRef(0);
  const singleWidthRef = useRef(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // If items exist, create enough duplicates to ensure smooth infinite loop and full dragability
  const canScroll = Boolean(items && items.length > 0);
  let baseSet = items || [];
  while (baseSet.length < 8 && baseSet.length > 0) {
    baseSet = [...baseSet, ...items];
  }
  const loopItems = canScroll ? [...baseSet, ...baseSet, ...baseSet, ...baseSet] : items;

  // Expose nudge controller method
  useEffect(() => {
    if (controllerRef) {
      controllerRef.current = {
        nudge: (delta) => {
          if (!canScroll) return;
          offsetRef.current += delta;
          const singleWidth = singleWidthRef.current;
          if (singleWidth > 0) {
            while (offsetRef.current <= -2 * singleWidth) {
              offsetRef.current += singleWidth;
            }
            while (offsetRef.current > 0) {
              offsetRef.current -= singleWidth;
            }
          }
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
          }
        },
      };
    }
  }, [controllerRef, canScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !canScroll) {
      if (track) track.style.transform = "none";
      return;
    }

    const updateMetrics = () => {
      // With 4 identical sets, width of 1 set is 1/4 of total scrollWidth
      const singleSetWidth = track.scrollWidth / 4;
      if (singleSetWidth > 0) {
        singleWidthRef.current = singleSetWidth;
        if (direction === "ltr" && offsetRef.current === 0) {
          offsetRef.current = -singleSetWidth;
          track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });
    resizeObserver.observe(track);

    let animationFrameId;
    let lastTimestamp = performance.now();

    const loop = (timestamp) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      const singleWidth = singleWidthRef.current;

      // Pause when dragging OR when hovered on any card
      if (!isPointerDownRef.current && !isHoveredRef.current && canScroll && singleWidth > 0) {
        if (direction === "rtl") {
          offsetRef.current -= speedPixelsPerSecond * dt;
          if (offsetRef.current <= -singleWidth) {
            offsetRef.current += singleWidth;
          }
        } else {
          offsetRef.current += speedPixelsPerSecond * dt;
          if (offsetRef.current >= 0) {
            offsetRef.current -= singleWidth;
          }
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speedPixelsPerSecond, items, canScroll]);

  const handlePointerDown = (e) => {
    if (!canScroll) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPointerDownRef.current = true;
    setIsInteracting(true);
    lastXRef.current = e.clientX;
    totalDragDistanceRef.current = 0;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!canScroll || !isPointerDownRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    totalDragDistanceRef.current += Math.abs(deltaX);

    const singleWidth = singleWidthRef.current;
    offsetRef.current += deltaX;

    if (singleWidth > 0) {
      while (offsetRef.current <= -2 * singleWidth) {
        offsetRef.current += singleWidth;
      }
      while (offsetRef.current > 0) {
        offsetRef.current -= singleWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e) => {
    if (!canScroll || !isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsInteracting(false);
    try {
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }
    } catch {
      // ignore
    }

    if (totalDragDistanceRef.current > 6) {
      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 120);
    }
  };

  const handleClickCapture = (e) => {
    if (justDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`auto-scroll-row-wrap ${className} ${isInteracting ? "is-interacting" : ""} ${!canScroll ? "is-static-row" : ""}`}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
      }}
      onClickCapture={handleClickCapture}
    >
      <div className="auto-scroll-track" ref={trackRef}>
        {loopItems.map((item, idx) => (
          <div
            key={`${item.id || idx}-${idx}`}
            className="auto-scroll-item-slot"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
          >
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionIntro({ number, label, title, id }) {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="section-intro" ref={headerRef}>
      <p className="section-index"><span>{number}</span> {label}</p>
      <h2 id={id}>
        <WordRevealHeading text={title} isVisible={isVisible} />
      </h2>
    </header>
  );
}

function SectionHeadingBlock(props) {
  return <SectionIntro {...props} />;
}

function WordRevealHeading({ text, isVisible = true, delayOffset = 0 }) {
  let wordIndex = 0;
  const wrapWords = (node) => {
    if (!node && node !== 0) return null;
    if (typeof node === "string" || typeof node === "number") {
      const parts = String(node).split(/(\s+)/);
      return parts.map((part, i) => {
        if (/^\s+$/.test(part)) return part;
        const currentDelay = (delayOffset + (wordIndex++) * 0.05).toFixed(3);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "0.06em",
              marginBottom: "-0.06em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: isVisible ? "translateY(0%) rotate(0deg)" : "translateY(120%) rotate(2.5deg)",
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? "blur(0px)" : "blur(6px)",
                transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${currentDelay}s, opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${currentDelay}s, filter 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${currentDelay}s`,
                willChange: "transform, opacity, filter",
              }}
            >
              {part}
            </span>
          </span>
        );
      });
    }
    if (Array.isArray(node)) {
      return node.map((child, i) => <span key={i}>{wrapWords(child)}</span>);
    }
    if (node && typeof node === "object" && "props" in node) {
      const { children, style, ...rest } = node.props;
      if (!node.type || typeof node.type === "symbol") {
        return wrapWords(children);
      }
      const Tag = node.type;
      if (Tag === "br") {
        return <br />;
      }
      return (
        <Tag
          {...rest}
          style={{
            ...style,
            display: Tag === "em" ? "inline-block" : undefined,
          }}
        >
          {wrapWords(children)}
        </Tag>
      );
    }
    return node;
  };

  return <>{wrapWords(text)}</>;
}

function Project({ project, priority, index = 0 }) {
  const cardRef = useRef(null);
  const tilt = (event) => {
    if (!cardRef.current || matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - 0.5) * -2.4}deg`);
    cardRef.current.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - 0.5) * 2.4}deg`);
  };
  const reset = () => {
    cardRef.current?.style.setProperty("--rx", "0deg");
    cardRef.current?.style.setProperty("--ry", "0deg");
  };
  const delayClass = (index % 2 === 1) ? " scroll-reveal-delay-1" : "";
  return (
    <article className={`editorial-project scroll-reveal${delayClass}`} ref={cardRef} onPointerMove={tilt} onPointerLeave={reset}>
      <Link to="/contact" className="project-image" aria-label={`Discuss a project like ${project.title}`}>
        <img src={project.image} alt={project.alt} width={1200} height={1504} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
        <span className="view-project">Inquire project <ArrowUpRight /></span>
      </Link>
      <div className="project-caption">
        <div>
          <span>{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.blurb}</p>
        <b>{project.id}</b>
      </div>
    </article>
  );
}

function BrandPerformanceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const autoPlayTimerRef = useRef(null);

  const slides = [
    {
      id: "slide-1",
      img: brandsShowcaseImg,
      alt: "Packaging Design Company and Branding Agency India - Dancing Octopus, Baofeng, Hairtune, Xeona",
    },
    {
      id: "slide-2",
      img: drag1,
      alt: "Commercial Tableware, Sunscreen & Baofeng Industrial Showcase",
    },
    {
      id: "slide-3",
      img: drag2,
      alt: "Editorial Publications & Luxury Skincare Systems",
    },
  ];

  const resetTimer = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per image!
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [slides.length]);

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    setIsDragging(true);
    setDragOffset(0);
    // Pause auto timer during user drag interaction
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) { }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) { }

    const delta = dragDeltaRef.current;
    dragDeltaRef.current = 0;
    setDragOffset(0);

    // If dragged left by > 35px: next image (coming from right)
    if (delta < -35) {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }
    // If dragged right by > 35px: previous image
    else if (delta > 35) {
      setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
    resetTimer();
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const goToSlide = (idx) => {
    setActiveIndex(idx);
    resetTimer();
  };

  return (
    <section className="brands-performance-section" aria-label="Brand Performance & Packaging Agency Showcase">
      {/* Decorative Pink Fluid Backdrop matching Reference Design */}
      <div className="brands-performance-backdrop" aria-hidden="true">
        <div className="brands-ribbon-left" />
        <div className="brands-ribbon-right" />
        <svg
          className="brands-swoosh-svg"
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -60 140 C 320 200 480 430 840 400 C 1140 370 1280 180 1520 210"
            stroke="#0284C7"
            strokeWidth="1.6"
            strokeOpacity="0.45"
          />
        </svg>
        <div className="brands-dots-matrix brands-dots-left" />
        <div className="brands-dots-matrix brands-dots-right" />
      </div>

      <div className="brands-performance-container">
        {/* Header Content */}
        <div className="brands-performance-header scroll-reveal">
          <p className="brands-performance-eyebrow">
            <TextReveal delay={0.06} stagger={0.035}>
              PACKAGING DESIGN COMPANY AND BRANDING AGENCY INDIA
            </TextReveal>
          </p>

          <h2 className="brands-performance-title">
            <TextReveal delay={0.16} stagger={0.05}>
              We Build Brands That Performs –
            </TextReveal>{" "}
            <span className="brands-guaranteed-text">
              <TextReveal delay={0.35} stagger={0.05}>
                Guaranteed.
              </TextReveal>
            </span>
          </h2>
        </div>

        {/* Packaging Showcase Stage - Interactive Drag & 5s Slides */}
        <div className="brands-performance-stage scroll-reveal scroll-reveal-delay-1">
          <div
            className="brands-slider-stage-wrapper"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "pan-y",
              userSelect: "none",
            }}
          >
            {/* Navigation Arrows */}
            <button
              type="button"
              className="brands-slider-nav-btn brands-slider-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous showcase design"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="brands-slider-nav-btn brands-slider-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next showcase design"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slides Viewport */}
            <div className="brands-slider-viewport">
              {slides.map((slide, idx) => {
                let diff = idx - activeIndex;
                if (diff > 1) diff -= slides.length;
                if (diff < -1) diff += slides.length;

                const translatePercent = diff * 100;
                const isCurrent = diff === 0;

                return (
                  <div
                    key={slide.id}
                    className={`brands-showcase-slide ${isCurrent ? "is-active" : diff > 0 ? "is-next" : "is-prev"}`}
                    style={{
                      transform: `translateX(calc(${translatePercent}% + ${dragOffset}px))`,
                      transition: isDragging ? "none" : "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease",
                      opacity: Math.abs(diff) > 1 ? 0 : 1,
                      visibility: Math.abs(diff) > 1 ? "hidden" : "visible",
                    }}
                    aria-hidden={!isCurrent}
                  >
                    <div className="brands-slide-card">
                      <img
                        src={slide.img}
                        alt={slide.alt}
                        className="brands-performance-img"
                        loading={idx === 0 ? "eager" : "lazy"}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />

                      {/* Ground Reflection Floor Plane matching stone podium reflection */}
                      <div className="brands-ground-reflection-wrap" aria-hidden="true">
                        <img
                          src={slide.img}
                          alt=""
                          className="brands-ground-reflection-img"
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        <div className="brands-ground-reflection-mask" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Pagination Dots (Clickable & Active State) */}
          <div className="brands-slider-pagination" aria-label="Showcase slides indicator">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`brands-pagination-dot ${idx === activeIndex ? "is-active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Drag Hint */}


          {/* Down Chevrons */}
          <div className="brands-performance-chevrons" aria-hidden="true">
            <ChevronDown className="brands-chevron brands-chevron-1" />
            <ChevronDown className="brands-chevron brands-chevron-2" />
          </div>
        </div>
      </div>
    </section>
  );
}