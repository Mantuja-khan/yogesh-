import { Link } from "react-router-dom";
import { ArrowUpRight, Box, Layers, Sparkles, CheckCircle2, ShieldCheck, Palette, FileText, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export default function PackagingDesignPage() {
  const cursorRef = useRef(null);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Filter all packaging & box design projects from portfolio (strictly excluding label designs)
  const packagingProjects = (portfolio.projects || []).filter(
    (p) =>
      (p.categoryKey === "box-design" ||
        p.categoryKey === "packaging" ||
        p.categoryKeys?.includes("box-design") ||
        p.categoryKeys?.includes("packaging") ||
        p.category?.toLowerCase().includes("packaging") ||
        p.category?.toLowerCase().includes("box") ||
        p.title?.toLowerCase().includes("box")) &&
      p.categoryKey !== "label-design" &&
      !p.categoryKeys?.includes("label-design") &&
      !p.category?.toLowerCase().includes("label") &&
      !p.category?.toLowerCase().includes("lable") &&
      !p.title?.toLowerCase().includes("label") &&
      !p.title?.toLowerCase().includes("lable")
  );

  const capabilities = [
    {
      icon: Box,
      title: "Rigid Luxury Box Architecture",
      desc: "Magnetic closure boxes, two-piece shoulder neck boxes, and book-style presentation cartons for premium retail brands.",
    },
    {
      icon: Layers,
      title: "Precision Die-Line Engineering",
      desc: "Mathematically accurate CAD dielines with crease tolerances, bleed marks, and folding kinematics ready for press.",
    },
    {
      icon: Sparkles,
      title: "Specialty Finishes & Embellishments",
      desc: "Spot UV, foil stamping (gold, silver, holographic), multi-level blind embossing, debossing, and soft-touch lamination.",
    },
    {
      icon: Palette,
      title: "Color Calibration & Press Checks",
      desc: "Pantone PMS matching, CMYK gamut optimization, and pre-flight proofing for flawless color fidelity across print batches.",
    },
    {
      icon: ShieldCheck,
      title: "Eco-Friendly Material Selection",
      desc: "FSC-certified papers, biodegradable kraft boards, recyclable soy inks, and sustainable protective internal inserts.",
    },
    {
      icon: FileText,
      title: "Production Supervision & Vendor Management",
      desc: "Direct coordination with offset printers, corrugators, and box makers to ensure the physical pack matches digital 3D renders.",
    },
  ];

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main" style={{ background: "#FFFFFF" }}>
        {/* Page Hero Header */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span>{" "}
                <TextReveal triggerOnMount delay={0.06}>
                  Dedicated Studio Service
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Packaging Design
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Engineered to Hold &amp; Protect.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We transform products into unforgettable tactile unboxing experiences. From luxury cosmetic cartons to heavy industrial corrugated shipping systems, our structural packaging is built for shelf dominance.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Packaging Mascot" />
            </div>
          </div>
        </section>

        {/* Unified Single-Page Flow */}
        <div className="subpage-content-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px clamp(20px, 4vw, 60px)" }}>
          {/* Split Section: Packaging Sketch on Left, Content on Right */}
          <section className="subpage-split-hero">
            <div className="subpage-split-left">
              <div className="subpage-split-img-card" style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(28, 39, 82, 0.08)", boxShadow: "0 18px 45px rgba(28, 39, 82, 0.08)" }}>
                <img
                  src="/packaging-design-sketch-white.jpg"
                  alt="Packaging Design Dieline Engineering & Box Drafting by Yogesh Dahiya"
                  className="subpage-split-img"
                  style={{ objectFit: "contain", width: "100%", maxHeight: "520px", display: "block", background: "#FFFFFF" }}
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">PRECISION DIELINE &amp; STRUCTURAL PACKAGING</span>
              <h2 className="subpage-split-title">From Technical Dielines to Luxury Unboxing Experiences</h2>
              <p className="subpage-split-desc">
                Every memorable package begins with pencil on grid. We engineer precision dielines, folding cartons, rigid luxury gift boxes, and eco-certified packaging structures that protect your product while commanding irresistible retail shelf dominance. From tactile embossing to calibrated Pantone foils, we turn structural cardboard and paper into high-converting brand touchpoints.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Custom CAD Dielines &amp; Folding Carton Engineering</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Embossing, Foil Stamping &amp; Spot UV Finishing Specs</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Rigid Luxury Boxes, Sleeves &amp; Corrugated Displays</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Print-Ready Production Files &amp; Full Press Check Support</span>
                </div>
              </div>

            </div>
          </section>

          {/* Capabilities Grid */}
          {/* <section className="page-content-section" style={{ padding: "20px 0 50px 0" }}>
          <div className="page-subhead-wrap" style={{ marginBottom: "36px" }}>
            <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
              TECHNICAL EXPERTISE
            </span>
            <h2 className="editorial-lead" style={{ margin: "8px 0 0 0" }}>
              What We Deliver in Packaging
            </h2>
          </div>

          <div className="service-capabilities-grid">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="capability-card card-3d">
                  <div className="capability-icon-badge">
                    <Icon className="w-5 h-5 text-[#1C2752]" />
                  </div>
                  <h3 className="capability-title">{item.title}</h3>
                  <p className="capability-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section> */}

        {/* Featured Packaging Works Showcase (Pure White Background, Interactive Clean Cards) */}
        {packagingProjects.length > 0 && (
          <section className="page-content-section" style={{ background: "#FFFFFF", padding: "48px 0" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                PACKAGING &amp; BOX SHOWCASE
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">BOX</span>
                <span className="pill-suffix">DESIGNS</span>
                </h2>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid photography-clean-grid">
              {packagingProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card photography-clean-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Packaging Work"}`}
                >
                  <img src={proj.image} alt={proj.title || "Packaging Design Work"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}
        </div>

        {/* Meaningful Discussion Contact Section */}
        <MeaningfulContactSection />
      </main>

      {/* Lightbox Modal for Full View */}
      {selectedWork && (
        <div className="playbook-modal-backdrop" onClick={() => setSelectedWork(null)}>
          <div className="playbook-modal-box playbook-modal-image-only" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="playbook-modal-close"
              onClick={() => setSelectedWork(null)}
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="playbook-modal-img-only-wrap">
              <img src={selectedWork.image} alt={selectedWork.title || "Packaging Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
