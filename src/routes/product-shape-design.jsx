import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Compass, Cylinder, Maximize2, Cpu, Sparkles, CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export const Route = createFileRoute("/product-shape-design")({
  head: () => ({
    meta: [
      { title: "Product Shape Design & Industrial Form — SS Production House" },
      {
        name: "description",
        content:
          "Custom container profiles, ergonomic bottle contours, structural closures, and 3D industrial product shape modeling by SS Production House.",
      },
    ],
  }),
  component: ProductShapeDesignPage,
});

export default function ProductShapeDesignPage() {
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

  const capabilities = [
    {
      icon: Cylinder,
      title: "Bespoke Bottle & Jar Geometries",
      desc: "Distinctive silhouette development for fragrances, serums, spirits, and food products engineered for blow-molding and glass casting.",
    },
    {
      icon: Compass,
      title: "Ergonomics & Human Factors",
      desc: "Mathematical grip analysis, hand comfort balance, pouring dynamics, and tactile shelf touchpoints tailored for consumer delight.",
    },
    {
      icon: Maximize2,
      title: "Volumetric Capacity Optimization",
      desc: "Precise milliliter volume calculation balancing perceived shelf presence, wall thickness, and shipping carton packing density.",
    },
    {
      icon: Cpu,
      title: "3D CAD Surfacing & Prototyping",
      desc: "Production-ready NURBS and parametric CAD files formatted for CNC mold tooling, 3D additive printing, and pre-production evaluation.",
    },
    {
      icon: Sparkles,
      title: "Custom Closure & Cap Engineering",
      desc: "Signature flip caps, dropper assemblies, magnetic snap lids, and pump mechanisms integrated seamlessly into the primary container body.",
    },
    {
      icon: CheckCircle2,
      title: "Production Tooling Handover",
      desc: "Comprehensive engineering drawings with draft angles, parting lines, and mold release specifications for global manufacturing partners.",
    },
  ];

  const featuredWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "box-design" ||
      p.categoryKey === "mockup" ||
      p.category?.toLowerCase().includes("meter") ||
      p.category?.toLowerCase().includes("mockup") ||
      p.category?.toLowerCase().includes("shape") ||
      p.title?.toLowerCase().includes("serum") ||
      p.title?.toLowerCase().includes("bottle") ||
      p.title?.toLowerCase().includes("box")
  ).slice(0, 12);

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
                  Industrial Form &amp; Structure
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Product Shape Design
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Iconic Silhouettes in Physical Space.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We sculpt tactile physical forms that consumers recognize by touch alone. From signature cosmetic droppers and contoured spirit bottles to geometric electronic casings, our shapes define brand memorability.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Product Shape Mascot" />
            </div>
          </div>
        </section>

        {/* Unified Single-Page Flow */}
        <div className="subpage-content-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px clamp(20px, 4vw, 60px)" }}>
          {/* Split Section: Product Shape Sketch on Left, Content on Right */}
          <section className="subpage-split-hero">
            <div className="subpage-split-left">
              <div className="subpage-split-img-card" style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(28, 39, 82, 0.08)", boxShadow: "0 18px 45px rgba(28, 39, 82, 0.08)" }}>
                <img
                  src="/product-shape-sketch-clean.png"
                  alt="Product Shape Design Industrial Blueprint & Bottle Wireframe Modeling by Yogesh Dahiya"
                  className="subpage-split-img"
                  style={{ objectFit: "contain", width: "100%", maxHeight: "520px", display: "block", padding: "16px", background: "#FFFFFF" }}
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">INDUSTRIAL FORM &amp; BESPOKE SILHOUETTES</span>
              <h2 className="subpage-split-title">Sculpting Distinctive Product Shapes &amp; Custom Vessels</h2>
              <p className="subpage-split-desc">
                A product's tactile silhouette is its most permanent brand signature. We sculpt iconic vessel geometries, ergonomic container contours, luxury glass bottle profiles, and custom closure mechanisms that fit effortlessly into the consumer's hand. Our industrial sketches unite aesthetic beauty with high-volume manufacturing feasibility.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Custom Glass, PET &amp; Aluminum Container Profiles</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ergonomic Grip Studies &amp; Structural Weight Distribution</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bespoke Closures, Caps &amp; Dispenser Mechanics</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mold-Ready CAD Wireframes &amp; Manufacturing Blueprints</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Request Shape Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" search={{ category: "meter-design" }} className="subpage-btn-secondary">
                  <span>View 3D Design Catalog</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Capabilities Grid */}
          {/* <section className="page-content-section" style={{ padding: "20px 0 50px 0" }}>
          <div className="page-subhead-wrap" style={{ marginBottom: "36px" }}>
            <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
              STRUCTURAL INNOVATION
            </span>
            <h2 className="editorial-lead" style={{ margin: "8px 0 0 0" }}>
              Form Follows Emotion &amp; Utility
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

        {/* Featured Showcase (Pure White Background, Interactive Clean Cards) */}
        {featuredWorks.length > 0 && (
          <section className="page-content-section" style={{ background: "#FFFFFF", padding: "48px 0" }}>
            <div className="page-subhead-wrap" style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                  STRUCTURAL MODELS
                </span>
                <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                  Selected Product Forms &amp; Mockups
                </h2>
              </div>
              <Link to="/works" search={{ category: "box-design" }} className="subpage-view-all-link">
                <span>Explore All Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid photography-clean-grid">
              {featuredWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card photography-clean-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Product Form"}`}
                >
                  <img src={proj.image} alt={proj.title || "Product Shape Design"} loading="lazy" />
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
              <img src={selectedWork.image} alt={selectedWork.title || "Product Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
