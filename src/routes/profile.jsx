import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Compass, Layers, Award, Sparkles, CheckCircle2, ShieldCheck, Box, Palette, Cpu, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { DottedSquare8x8 } from "@/components/DottedSquare8x8";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

import aboutHeroAccessories from "@/assets/about_hero_accessories.jpg";
import aboutDesignerStory from "@/assets/about_designer_story.jpg";
import aboutTailoringBanner from "@/assets/about_tailoring_banner.jpg";

import logoPhotoshop from "@/assets/01_Photoshop.png";
import logoIllustrator from "@/assets/03_Illustrator.png";
import logoInDesign from "@/assets/04_InDesign.png";
import logoCorelDRAW from "@/assets/07_CorelDRAW.png";
import logoFigma from "@/assets/05_Figma.png";
import logoAfterEffects from "@/assets/10_After_Effects.png";

import benetoLogo from "@/assets/beneto_logo.jpg";
import meherTablewareLogo from "@/assets/meher_tbblewaer_logo.jpg";
import rTechLogo from "@/assets/r_tech_logo.jpg";
import rengoLogo from "@/assets/rengologo.png";
import sunstarLogo from "@/assets/sunstar_logo.png";
import vmSolutionsLogo from "@/assets/vmsolutiions_logo.png";

import missionBg from "@/assets/mission-bg.jpg";
import visionBg from "@/assets/vision-bg.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Designer Profile & Studio — SS Production House" },
      { name: "description", content: "Learn about SS Production House and Yogesh Dahiya: graphic design philosophy, packaging dielines, brand systems, and 3D spatial craft." },
    ],
  }),
  component: ProfilePage,
});

const toolsData = [
  {
    name: "Adobe Illustrator",
    icon: logoIllustrator,
    role: "Vector Dielines & Brand Identity Systems",
  },
  {
    name: "Adobe Photoshop",
    icon: logoPhotoshop,
    role: "Spatial Retouching & High-Contrast Stills",
  },
  {
    name: "Adobe InDesign",
    icon: logoInDesign,
    role: "Editorial Layouts & Multi-Page Catalogues",
  },
  {
    name: "CorelDRAW",
    icon: logoCorelDRAW,
    role: "Offset Pre-Press & Industrial Signage",
  },
  {
    name: "Figma",
    icon: logoFigma,
    role: "Design Systems & Spatial UI Prototyping",
  },
  {
    name: "Adobe After Effects",
    icon: logoAfterEffects,
    role: "Kinetic Motion & Studio Stills Composition",
  },
];

const clientLogos = [
  { name: "Beneto", img: benetoLogo },
  { name: "Meher Tableware", img: meherTablewareLogo },
  { name: "R-Tech Group", img: rTechLogo },
  { name: "Rengo", img: rengoLogo },
  { name: "Sunstar", img: sunstarLogo },
  { name: "VM Solutions", img: vmSolutionsLogo },
];

function ProfilePage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="portfolio-shell about-ref-page" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main" style={{ paddingTop: 0 }}>
        {/* 1. HERO SECTION WITH 5 RANDOM 8x8 DOTTED SQUARES */}
        <section className="about-hero-banner">
          <div className="about-hero-dots-layer" aria-hidden="true">
            <DottedSquare8x8
              className="about-hero-dot about-hero-dot-1"
              size={76}
              style={{ top: "14%", left: "5%", transform: "rotate(-6deg)" }}
            />
            <DottedSquare8x8
              className="about-hero-dot about-hero-dot-2"
              size={82}
              style={{ top: "18%", right: "8%", transform: "rotate(8deg)" }}
            />
            <DottedSquare8x8
              className="about-hero-dot about-hero-dot-3"
              size={68}
              style={{ top: "68%", left: "8%", transform: "rotate(4deg)" }}
            />
            <DottedSquare8x8
              className="about-hero-dot about-hero-dot-4"
              size={76}
              style={{ bottom: "12%", right: "12%", transform: "rotate(-10deg)" }}
            />
            <DottedSquare8x8
              className="about-hero-dot about-hero-dot-5"
              size={80}
              style={{ top: "36%", left: "48%", transform: "rotate(3deg)" }}
            />
          </div>

          <div className="about-hero-inner">
            <div className="about-hero-content">
              <nav className="about-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/" className="breadcrumb-link">HOME</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">ABOUT STUDIO</span>
              </nav>

              <h1 className="about-hero-title">
                <TextReveal triggerOnMount delay={0.12} stagger={0.045}>
                  Ideas with instinct.
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.28} stagger={0.045}>
                    Form with intent.
                  </TextReveal>
                </em>
              </h1>

              <p className="about-section-lead" style={{ margin: 0 }}>
                <TextReveal triggerOnMount delay={0.4} stagger={0.015}>
                  SS Production House is an independent graphic design and packaging production studio founded and directed by Yogesh Dahiya. We engineer mathematically rigorous dielines, distinctive brand identities, and photorealistic 3D spatial environments for ambitious brands.
                </TextReveal>
              </p>
            </div>

            <div className="about-hero-visual-col">
              <div className="about-hero-image-wrap">
                <img
                  src={aboutHeroAccessories}
                  alt="SS Production House Tactile Accessories & Craft"
                  className="about-hero-img"
                  loading="eager"
                />
                <div className="about-hero-img-gradient-mask" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE ARE - ABOUT US (MATCHING IMAGE 1) */}
        <WhoWeAreImageOneSection />

        {/* 2. WHO WE ARE STORY SECTION */}

        {/* 3. METRICS ROW */}
        <section className="about-metrics-section">
          <div className="about-container">
            <div className="about-metrics-grid">
              <div className="about-metric-col">
                <span className="about-metric-number">10+</span>
                <span className="about-metric-label">Years of Dedicated Craft</span>
              </div>
              <div className="about-metric-col">
                <span className="about-metric-number">500+</span>
                <span className="about-metric-label">Packaging Dielines &amp; Runs</span>
              </div>
              <div className="about-metric-col">
                <span className="about-metric-number">100%</span>
                <span className="about-metric-label">Pre-Press Offset Precision</span>
              </div>
              <div className="about-metric-col about-metric-last">
                <span className="about-metric-number">98%</span>
                <span className="about-metric-label">Repeat Enterprise Clientele</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CINEMATIC CALLOUT BANNER & 3 OVERLAPPING CARDS */}
        <section className="about-banner-wrap-section">
          <div
            className="about-cinematic-banner"
            style={{ backgroundImage: `url(${aboutTailoringBanner})` }}
          >
            <div className="about-cinematic-overlay" aria-hidden="true" />
            <div className="about-banner-content">
              <span className="about-banner-eyebrow">STUDIO PHILOSOPHY &amp; AMBITION</span>
              <h2 className="about-banner-heading">
                Where Precision Meets <em>Pure Tactile Emotion.</em>
              </h2>
              <p className="about-banner-desc">
                We reject disposable, auto-generated design. True brand prestige is born from the interplay of physical paper grains, metallic foils, balanced typography, and deliberate geometric structure.
              </p>
              <Link to="/contact" className="about-banner-btn">
                <span>Start a Project Discovery</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="about-overlapping-cards-wrap">
            <div className="about-container">
              <div className="about-cards-grid">
                <div className="about-overlap-card">
                  <div className="about-card-icon-box">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div className="about-card-body">
                    <h3 className="about-card-title">Dieline Geometry</h3>
                    <p className="about-card-text">
                      Precision cut, crease, and score lines calculated down to the millimeter for automated or artisanal box folding.
                    </p>
                  </div>
                </div>

                <div className="about-overlap-card">
                  <div className="about-card-icon-box">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="about-card-body">
                    <h3 className="about-card-title">Tactile Substrates</h3>
                    <p className="about-card-text">
                      Expertise across virgin SBS board, kraft fluting, hot foil stamping, deep debossing, and soft-touch velvet lamination.
                    </p>
                  </div>
                </div>

                <div className="about-overlap-card">
                  <div className="about-card-icon-box">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="about-card-body">
                    <h3 className="about-card-title">Pre-Press Guarantee</h3>
                    <p className="about-card-text">
                      From vector plate preparation to factory press inspections, ensuring zero color shifting from digital proof to retail shelf.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MASTERED SOFTWARE ARSENAL */}
        <section className="about-toolkit-section">
          <div className="about-container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 46px auto" }}>
              <span className="about-eyebrow">PROFESSIONAL TOOLKIT</span>
              <h2 className="about-section-heading" style={{ marginBottom: "12px" }}>
                Mastered Design <em>Arsenal.</em>
              </h2>
              <div className="about-header-divider" />
            </div>

            <div className="about-tools-grid">
              {toolsData.map((tool, idx) => (
                <div key={idx} className="about-tool-card">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="about-tool-icon-img"
                    loading="lazy"
                  />
                  <h3 className="about-tool-name">{tool.name}</h3>
                  <p className="about-tool-role">{tool.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MISSION & VISION ARCHITECTURAL PANELS */}
        <section className="about-mission-vision-section">
          <div className="about-container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 20px auto" }}>
              <span className="about-eyebrow">CORE COMMITMENTS</span>
              <h2 className="about-section-heading" style={{ marginBottom: "12px" }}>
                Our Mission &amp; Future <em>Vision.</em>
              </h2>
              <div className="about-header-divider" />
            </div>

            <div className="about-mv-grid">
              <div className="about-mv-panel">
                <div
                  className="about-mv-bg-layer"
                  style={{ backgroundImage: `url(${missionBg})` }}
                  aria-hidden="true"
                />
                <div className="about-mv-content">
                  <span className="about-mv-tag">
                    <Compass className="w-3.5 h-3.5" />
                    OUR MISSION · 01
                  </span>
                  <h3 className="about-mv-title">Flawless Print Rigor &amp; Distinctive Form</h3>
                  <p className="about-mv-desc">
                    To empower ambitious and luxury brands by engineering tactile packaging dielines, commanding typography, and cinematic visual assets that transform consumer perception and build enduring commercial value.
                  </p>
                  <ul className="about-mv-bullets">
                    <li className="about-mv-bullet-item">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Flawless offset packaging dielines with zero manufacturing waste</span>
                    </li>
                    <li className="about-mv-bullet-item">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Deep material curation: boards, foils, varnishes &amp; textures</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="about-mv-panel">
                <div
                  className="about-mv-bg-layer"
                  style={{ backgroundImage: `url(${visionBg})` }}
                  aria-hidden="true"
                />
                <div className="about-mv-content">
                  <span className="about-mv-tag">
                    <Sparkles className="w-3.5 h-3.5" />
                    OUR VISION · 02
                  </span>
                  <h3 className="about-mv-title">Setting The Benchmark for Spatial Craft</h3>
                  <p className="about-mv-desc">
                    To establish the global benchmark for spatial graphic design—where physical craftsmanship, hyper-realistic 3D mockups, and timeless editorial systems converge into unforgettable brand experiences.
                  </p>
                  <ul className="about-mv-bullets">
                    <li className="about-mv-bullet-item">
                      <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Timeless visual identity languages engineered to endure</span>
                    </li>
                    <li className="about-mv-bullet-item">
                      <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Spatial 3D form, lighting physics &amp; material innovation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CLIENTS WORLDWIDE */}
        <section className="about-clients-section">
          <div className="about-container">
            <div className="about-clients-wrap">
              <h2 className="about-clients-title">TRUSTED BY VISIONARY BRANDS</h2>
              <DraggableClientsLogos logos={clientLogos} />
            </div>
          </div>
        </section>

        {/* Meaningful Contact Form Section */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter showDottedSquares={true} />
    </div>
  );
}

function DraggableClientsLogos({ logos }) {
  const trackRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);
  const offsetRef = useRef(0);
  const singleWidthRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Quadruple items to guarantee a seamless looping track for infinite scroll & dragging
  const quadLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateMetrics = () => {
      const singleSetWidth = track.scrollWidth / 4;
      if (singleSetWidth > 0) {
        singleWidthRef.current = singleSetWidth;
      }
    };

    updateMetrics();
    const ro = new ResizeObserver(updateMetrics);
    ro.observe(track);

    let animationFrameId;
    let lastTime = performance.now();
    const speed = 40; // px/sec right to left

    const tick = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const singleWidth = singleWidthRef.current;
      if (!isPointerDownRef.current && !isHoveredRef.current && singleWidth > 0) {
        // Natural right-to-left flow
        offsetRef.current -= speed * dt;
        if (offsetRef.current <= -singleWidth) {
          offsetRef.current += singleWidth;
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [logos]);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPointerDownRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

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
    isPointerDownRef.current = false;
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`about-clients-drag-viewport ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      style={{
        overflow: "hidden",
        flex: "1",
        minWidth: 0,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "pan-y",
        padding: "8px 0",
      }}
      title="Click and drag to scroll logos"
    >
      <div
        ref={trackRef}
        className="about-clients-drag-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {quadLogos.map((client, idx) => (
          <div
            key={idx}
            className="about-client-logo-item"
            title={client.name}
            style={{
              flexShrink: 0,
              pointerEvents: isDragging ? "none" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {client.img ? (
              <img
                src={client.img}
                alt={`${client.name} Logo`}
                className="about-client-logo-img"
                draggable={false}
                loading="lazy"
                style={{
                  maxHeight: "38px",
                  maxWidth: "130px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            ) : (
              <span className="about-client-fallback-text">{client.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoWeAreImageOneSection() {
  return (
    <section className="who-we-are-image-one-section" aria-label="About Us - Who We Are">
      <div className="who-we-are-container">
        {/* Left Column: Chamfered White Card with Blue SS Logo Emblem matching Image 1 */}
        <div className="who-we-are-card-chamfer">
          <div className="who-we-are-card-inner">
            {/* Blue SS Brand Emblem matching Image 1 */}
            <svg
              className="who-we-are-card-emblem-svg"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="SS Production House Emblem"
            >
              {/* Outer Circular Ring */}
              <circle cx="100" cy="100" r="88" stroke="#1C2752" strokeWidth="15" />
              {/* Stylized S geometry matching Image 1 */}
              <path
                d="M58 74C58 52 74 40 96 40C100 40 102 42 102 46V76C102 82 98 86 92 90L74 100C64 106 60 114 60 124C60 144 76 158 98 158C108 158 118 154 126 146L114 134C110 138 104 142 98 142C88 142 80 136 80 126C80 118 84 114 92 108L108 98C118 92 124 82 124 70C124 48 106 34 84 34C60 34 40 52 40 74H58Z"
                fill="#1C2752"
              />
              <path
                d="M142 126C142 148 126 160 104 160C100 160 98 158 98 154V124C98 118 102 114 108 110L126 100C136 94 140 86 140 76C140 56 124 42 102 42C92 42 82 46 74 54L86 66C90 62 96 58 102 58C112 58 120 64 120 74C120 82 116 86 108 92L92 102C82 108 76 118 76 130C76 152 94 166 116 166C140 166 160 148 160 126H142Z"
                fill="#1C2752"
              />
              {/* Center Pen Nib detail */}
              <path d="M100 36L108 58H92L100 36Z" fill="#1C2752" />
              <circle cx="100" cy="50" r="2.5" fill="#FFFFFF" />
              <line x1="100" y1="52" x2="100" y2="72" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            <h3 className="who-we-are-card-title">SS PRODUCTION HOUSE</h3>
            <p className="who-we-are-card-sub">
              <span>DESIGN</span> <span className="card-sep">|</span> <span>PACKAGING</span> <span className="card-sep">|</span> <span>TRANSPORT</span>
            </p>
          </div>
        </div>

        {/* Right Column: ABOUT US - WHO WE ARE */}
        <div className="who-we-are-text-col">
          <span className="who-we-are-eyebrow">ABOUT US</span>
          <h2 className="who-we-are-title">WHO WE ARE</h2>

          <p className="who-we-are-desc-lead">
            SS Production House designs the brand, builds the pack and moves it to market. One team handles the idea, the production run and the delivery, so nothing gets lost between steps.
          </p>

          <p className="who-we-are-desc-body">
            We work with companies of every size and sector, and we keep a single standard from the first logo sketch to the last pallet.
          </p>

          {/* Three Pillar Columns with Blue Accent Top Line */}
          <div className="who-we-are-pillars-row">
            <div className="who-we-are-pillar">
              <div className="pillar-blue-bar" aria-hidden="true" />
              <h4 className="pillar-title">DESIGN</h4>
            </div>

            <div className="who-we-are-pillar">
              <div className="pillar-blue-bar" aria-hidden="true" />
              <h4 className="pillar-title">PACKAGING</h4>
            </div>

            <div className="who-we-are-pillar">
              <div className="pillar-blue-bar" aria-hidden="true" />
              <h4 className="pillar-title">TRANSPORT</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
