import { createFileRoute, Link } from "@tanstack/react-router";
import { LetterCascade } from "@/components/ui/letter-cascade";
import { ArrowDown, ArrowLeftRight, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Compass, Eye, Layers, Pause, Play, ShieldCheck, Sparkles, Volume2, VolumeX } from "lucide-react";
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
import drag1 from "@/assets/drag1.png";
import drag2 from "@/assets/drag2.png";
import heroSectionVideo from "@/assets/hero_section.png";
import brandsShowcaseImg from "@/assets/brands-performance-showcase-clean.png";
import pendantLampImg from "@/assets/pendant_lamp.png";
import servicesShowcaseImg from "@/assets/services_showcase_hexagon.jpg";
import serviceGraphicDesignImg from "@/assets/service_graphic_design.jpg";
import serviceUiUxImg from "@/assets/service_ui_ux_design.jpg";
import serviceAppDevImg from "@/assets/service_app_dev.jpg";
import { LogoPreloader } from "@/components/LogoPreloader";
import { DottedSquare8x8 } from "@/components/DottedSquare8x8";
import { PlaybookWorksSection } from "@/components/PlaybookWorksSection";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import { HomeOurClientsSection } from "@/components/HomeOurClientsSection";
import { HomeMarketingStatsShowcase } from "@/components/HomeMarketingStatsShowcase";
import { SeamlessHeroBackgroundVideo } from "@/components/SeamlessHeroBackgroundVideo";

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
  const [showPreloader, setShowPreloader] = useState(true);
  const cursorRef = useRef(null);
  const reelController = useRef(null);
  const heroVideoRef = useRef(null);


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
    const handleReplayEvent = () => setShowPreloader(true);
    window.addEventListener("ss_replay_logo_intro", handleReplayEvent);
    return () => window.removeEventListener("ss_replay_logo_intro", handleReplayEvent);
  }, []);

  // Guarantee hero background video runs continuously with zero pause/freeze on loop
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => { });

    const handleLoop = () => {
      // Loop smoothly right before video ends to avoid browser native gap
      if (video.duration && video.currentTime >= video.duration - 0.08) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
    };

    video.addEventListener("timeupdate", handleLoop);
    return () => video.removeEventListener("timeupdate", handleLoop);
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
      {showPreloader && (
        <LogoPreloader onComplete={() => setShowPreloader(false)} />
      )}
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main>
        {/* Responsive Custom Hero with Full Video Background */}
        <section className="editorial-hero custom-designer-hero hero-with-bg-video" id="top">
          {/* Hero Video Background Layer (Seamless Non-Stop Looping, Zero Pause, Sound Permanently Off) */}
          <SeamlessHeroBackgroundVideo />

          <div className="hero-banner-inner-grid hero-bg-video-grid">
            {/* Left Content Column (Left-aligned on large screen, Centered on small screen) */}
            <div className="hero-banner-content-col hero-banner-content-bg-mode">
              {/* Studio Eyebrow Tag Row */}
              <div className="hero-studio-tag-row">
                <span className="hero-studio-badge-pill">
                  PACKAGING ARCHITECTURE &amp; BRAND DESIGN
                </span>
                <span className="hero-studio-year">EST. 2023</span>
              </div>
              <h1 className="hero-custom-h1" aria-label="SS PRODUCTION HOUSE">
                <span className="hero-custom-line-1">
                  <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                    SS
                  </TextReveal>
                </span>
                <span className="hero-custom-line-2">
                  <LetterCascade
                    text="PRODUCTION HOUSE"
                    stiffness={350}
                    damping={8}
                    staggerDuration={0.05}
                    letterClassName={(i) => (i < 10 ? "hero-blue-text" : "hero-dark-text")}
                  />
                </span>
              </h1>

              <p className="hero-designer-role-tag">
                <TextReveal triggerOnMount delay={0.52} stagger={0.035}>
                  Graphic Designer &amp; Creative Director · Bhiwadi-Rajasthan
                </TextReveal>
              </p>

              {/* Decorative Accent Divider Bar */}
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

              {/* Studio Metrics Highlights */}
              <div className="hero-quick-stats-strip">
                <div className="hero-quick-stat-item">
                  <strong>8+</strong> <span>Years Craft</span>
                </div>
                <span className="hero-stat-sep" aria-hidden="true">/</span>
                <div className="hero-quick-stat-item">
                  <strong>150+</strong> <span>Packaging Works</span>
                </div>
                <span className="hero-stat-sep" aria-hidden="true">/</span>
                <div className="hero-quick-stat-item">
                  <strong>99.4%</strong> <span>Client Rating</span>
                </div>
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

        {/* Client Logos Stepped Reel — Emerging from Right Side One by One with Pause & Drag */}
        <DraggableSteppedLogoReel clients={portfolio.clientLogos || []} />

        {/* Selected Works Draggable Reel Section (Drag Part on Homepage) */}
        <section className="portfolio-section work" id="work">
          <div className="section-intro" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <p className="section-index" style={{ justifyContent: "center" }}>
              <span>01</span> <TextReveal delay={0.05}>Selected designs</TextReveal>
            </p>
            <h2 className="two-tone-pill-heading" style={{ marginTop: "6px", marginBottom: "12px", justifyContent: "center" }}>
              <span className="pill-prefix">OUR</span>
              <span className="pill-suffix">PORTFOLIO</span>
            </h2>

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
              <span>View All Products &amp; Works Page</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>



        {/* Our Services Interactive Accordion Section */}
        <OurServicesAccordionSection />

        {/* Brand Performance & Packaging Agency Showcase Section (We Build Brands That Performs - Guaranteed) */}
        <BrandPerformanceSection />

        {/* Our Clients Section matching User Reference Image (Dark Navy with Chamfer Cards) */}
        <HomeOurClientsSection />

        {/* Marketing Next Level & Statistics Showcase Section (Pure White Background) */}
        <HomeMarketingStatsShowcase />
        {/* Studio Tools & Software Stack Draggable Ticker — Drifting Right to Left */}
        <section className="studio-stack-ticker-section" aria-label="Studio Creative Software Stack">
          <div className="studio-stack-ticker-header">
            <h2 className="two-tone-pill-heading" style={{ marginBottom: "14px" }}>
              <span className="pill-prefix">CREATIVE</span>
              <span className="pill-suffix">SOFTWARE &amp; TOOLS</span>
            </h2>
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

        {/* Meaningful Discussion Contact Section matching Image 2 */}
        <MeaningfulContactSection />

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

function DraggableSteppedLogoReel({ clients = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentDragDeltaRef = useRef(0);
  const timerRef = useRef(null);

  const total = clients.length;

  const nextSlide = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-step: Slide in from right (0.72s), PAUSE for 2.1s, then slide next in from right
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2800);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (total <= 1) return;
    if (!isHovered && !isDragging) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [total, isHovered, isDragging, activeIndex]);

  // Pointer drag gestures (mouse + touch)
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
    const threshold = 40;

    if (delta < -threshold) {
      // Swiped/dragged left -> next logo enters from right
      nextSlide();
    } else if (delta > threshold) {
      // Swiped/dragged right -> previous logo
      prevSlide();
    }

    setDragOffset(0);
    currentDragDeltaRef.current = 0;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch { }
  };

  const handlePointerCancel = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      setDragOffset(0);
      currentDragDeltaRef.current = 0;
    }
  };

  if (!clients || clients.length === 0) return null;

  // return (
  //   // <section className="hero-clients-ticker-section" aria-label="Client Brands">
  //   //   {/* Light sky blue ambient circular glow */}
  //   //   <div className="hero-clients-ambient-circle" aria-hidden="true" />

  //   //   <div className="hero-clients-stepped-wrapper">
  //   //     <div className="hero-clients-stepped-header">
  //   //       <span className="hero-clients-eyebrow-tag">
  //   //         <span className="hero-clients-step-dot" />
  //   //         PARTNER BRANDS &amp; CLIENTS
  //   //       </span>
  //   //       <div className="hero-clients-step-counter">
  //   //         <span>{String(activeIndex + 1).padStart(2, "0")}</span>
  //   //         <span style={{ opacity: 0.35 }}>/</span>
  //   //         <span>{String(total).padStart(2, "0")}</span>
  //   //       </div>
  //   //     </div>

  //   //     <div className="hero-clients-stage-row">
  //   //       {/* Previous Arrow Button */}
  //   //       <button
  //   //         type="button"
  //   //         className="hero-client-step-arrow-btn prev"
  //   //         onClick={() => {
  //   //           prevSlide();
  //   //           startTimer();
  //   //         }}
  //   //         aria-label="Previous client logo"
  //   //       >
  //   //         <ChevronLeft size={18} />
  //   //       </button>

  //   //       {/* Draggable Viewport */}
  //   //       <div
  //   //         className={`hero-clients-stepped-viewport ${isDragging ? "is-dragging" : ""}`}
  //   //         onPointerDown={handlePointerDown}
  //   //         onPointerMove={handlePointerMove}
  //   //         onPointerUp={handlePointerUp}
  //   //         onPointerCancel={handlePointerCancel}
  //   //         onMouseEnter={() => setIsHovered(true)}
  //   //         onMouseLeave={() => setIsHovered(false)}
  //   //       >
  //   //         {clients.map((client, idx) => {
  //   //           let diff = idx - activeIndex;
  //   //           while (diff < -Math.floor(total / 2)) diff += total;
  //   //           while (diff > Math.floor(total / 2)) diff -= total;

  //   //           const isVisible = Math.abs(diff) <= 1;
  //   //           const translateX = `calc(${diff * 100}% + ${dragOffset}px)`;

  //   //           return (
  //   //             <div
  //   //               key={client.id || client.name}
  //   //               className={`hero-stepped-logo-slide ${diff === 0 ? "is-active" : ""}`}
  //   //               style={{
  //   //                 transform: `translate3d(${translateX}, 0, 0)`,
  //   //                 transition: isDragging ? "none" : "transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
  //   //                 opacity: isVisible ? (diff === 0 ? 1 : 0.2) : 0,
  //   //                 pointerEvents: diff === 0 ? "auto" : "none",
  //   //                 visibility: Math.abs(diff) > 2 ? "hidden" : "visible",
  //   //               }}
  //   //             >
  //   //               <div className="hero-client-single-wrap">
  //   //                 {client.logo ? (
  //   //                   <img
  //   //                     src={client.logo}
  //   //                     alt={client.name}
  //   //                     className="hero-client-logo-img"
  //   //                     loading="eager"
  //   //                     draggable={false}
  //   //                   />
  //   //                 ) : (
  //   //                   <div className="hero-client-text-badge">
  //   //                     <span className="hero-client-text-name">{client.name}</span>
  //   //                   </div>
  //   //                 )}
  //   //                 <span className="hero-client-brand-caption">{client.name}</span>
  //   //               </div>
  //   //             </div>
  //   //           );
  //   //         })}
  //   //       </div>

  //   //       {/* Next Arrow Button */}
  //   //       <button
  //   //         type="button"
  //   //         className="hero-client-step-arrow-btn next"
  //   //         onClick={() => {
  //   //           nextSlide();
  //   //           startTimer();
  //   //         }}
  //   //         aria-label="Next client logo"
  //   //       >
  //   //         <ChevronRight size={18} />
  //   //       </button>
  //   //     </div>

  //   //     {/* Drag or Swipe Hint */}
  //   //     <div className="hero-clients-drag-hint">
  //   //       <ArrowLeftRight size={12} className="hero-clients-drag-icon" />
  //   //       <span>DRAG OR SWIPE TO EXPLORE</span>
  //   //     </div>
  //   //   </div>
  //   // </section>
  // );
  return null;
}

function OurServicesAccordionSection() {
  const [openServiceId, setOpenServiceId] = useState("web-dev"); // Default to 1st service

  const services = [
    {
      id: "web-dev",
      number: "1.",
      title: "Web Development",
      image: servicesShowcaseImg,
      imageAlt: "Web Development & IT Architecture Showcase",
      shortTagline: "High-Performance Modern Web Applications & E-Commerce",
      description:
        "From custom web applications to scalable e-commerce systems, we craft high-speed, secure, and SEO-optimized digital platforms using modern frameworks like React, Next.js, and Node.js.",
      features: [

      ],
      techStack: [],
      linkTo: "/website-design",
    },
    {

      id: "graphic-design",
      number: "2.",
      title: "Graphic Design",
      image: serviceGraphicDesignImg,
      imageAlt: "Graphic Design, Packaging Dielines & Luxury Branding",
      shortTagline: "Visual Identity, Luxury FMCG Packaging & Print Systems",
      description:
        "Transformative brand identities, high-precision packaging dielines, luxury label systems, and bespoke marketing collateral crafted to command attention on retail shelves and digital screens.",
      features: [
      ],
      techStack: ["Corel Draw", "Adobe Photoshop", "Adobe Illustrator", "Adobe After Effect", "Adobe Premium Pro", "Adobe CAD", "Adobe CAD", "Figma"],
      linkTo: "/brand-development",
    },
    {
      id: "ui-ux-design",
      number: "3.",
      title: "UI/UX Design",
      image: serviceUiUxImg,
      imageAlt: "UI/UX Design Systems, Wireframing & Figma Prototypes",
      shortTagline: "Human-Centric Digital Interfaces & Intuitive User Journeys",
      description:
        "Psychology-driven digital experiences designed with intuitive navigation, fluid micro-interactions, cohesive design systems, and comprehensive user research.",
      features: [
      ],
      techStack: ["Figma", "Design Systems", "Prototyping", "User Research", "Micro-Interactions"],
      linkTo: "/ui-ux-design",
    },
    {
      id: "app-dev",
      number: "4.",
      title: "Social Media Marketing",
      image: serviceAppDevImg,
      imageAlt: "Social Media Marketing",
      shortTagline: "Social Media Marketing & Management Solutions",
      description:
        "Social Media Marketing & Management Solutions",
      features: [

      ],
      techStack: ["React Native", "Flutter", "iOS & Android", "Firebase", "Node.js API"],
      linkTo: "/social-media-marketing",
    },
  ];

  const handleToggle = (id) => {
    // When clicking second service, hide first and show second accordingly!
    setOpenServiceId((prev) => (prev === id ? null : id));
  };

  const activeService = services.find((s) => s.id === openServiceId) || services[0];

  return (
    <section className="home-services-accordion-section" id="services" aria-label="Our Services">
      <div className="home-services-container">
        {/* Header pill badge and subtitle matching screenshot */}
        <div className="home-services-header">
          <h2 className="two-tone-pill-heading" style={{ marginBottom: "14px" }}>
            <span className="pill-prefix">OUR </span>
            <span className="pill-suffix">SERVICES </span>
          </h2>
        </div>
        {/* Two-column layout: Left image with vertical Call Now, Right exclusive accordion */}
        <div className="home-services-body-grid">
          {/* Left Column: Changes image dynamically based on selected service */}
          <div className="home-services-visual-col">
            <div className="home-services-image-frame">
              <img
                key={activeService.id}
                src={activeService.image}
                alt={activeService.imageAlt}
                className="home-services-showcase-img"
                loading="eager"
                width={640}
                height={400}
              />
              <div className="home-services-image-glow-overlay" aria-hidden="true" />
            </div>
          </div>

          {/* Right Column: Exclusive Accordion of 4 Services */}
          <div className="home-services-accordion-col">
            {services.map((service) => {
              const isOpen = openServiceId === service.id;
              return (
                <div
                  key={service.id}
                  className={`home-service-acc-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="home-service-acc-trigger"
                    onClick={() => handleToggle(service.id)}
                    aria-expanded={isOpen}
                    aria-controls={`service-content-${service.id}`}
                  >
                    <div className="home-service-acc-title-wrap">
                      <span className="home-service-acc-num">{service.number}</span>
                      <span className="home-service-acc-title">{service.title}</span>
                    </div>

                    <div className={`home-service-acc-arrow ${isOpen ? "is-rotated" : ""}`} aria-hidden="true">
                      <ChevronDown size={22} />
                    </div>
                  </button>

                  <div
                    id={`service-content-${service.id}`}
                    className={`home-service-acc-content-wrapper ${isOpen ? "is-expanded" : ""}`}
                  >
                    <div className="home-service-acc-content-inner">
                      <div className="home-service-acc-tagline">{service.shortTagline}</div>
                      <p className="home-service-acc-desc">{service.description}</p>

                      <div className="home-service-acc-features-list">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="home-service-feature-row">
                            <CheckCircle2 size={15} className="home-service-feature-check" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="home-service-tech-pills">
                        {service.techStack.map((tech, idx) => (
                          <span key={idx} className="home-service-tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="home-service-acc-footer">
                        <Link to={service.linkTo} className="home-service-acc-cta">
                          <span>{service.linkText}</span>
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
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
          <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px" }}>
            <span className="pill-prefix">BRAND </span>
            <span className="pill-suffix">PERFORMANCE</span>
          </h2>

          <p className="brands-performance-subtitle" style={{ font: "600 clamp(16px, 1.4vw, 20px)/1.4 var(--font-sans)", color: "#1E293B", margin: 0 }}>
            <span>We Build Brands That Performs – </span>
            <span className="brands-guaranteed-text" style={{ color: "#1C2752", fontWeight: "700" }}>Guaranteed.</span>
          </p>
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