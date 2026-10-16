import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Compass, Sparkles, CheckCircle2, ShieldCheck, Target, Layers, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import brandDevImg from "@/assets/service_graphic_design.jpg";

export const Route = createFileRoute("/brand-development")({
  head: () => ({
    meta: [
      { title: "Brand Development Studio — SS Production House" },
      {
        name: "description",
        content:
          "End-to-end brand development, corporate identity architectures, trademark design, and brand guideline systems by SS Production House.",
      },
    ],
  }),
  component: BrandDevelopmentPage,
});

export default function BrandDevelopmentPage() {
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
      icon: Target,
      title: "Core Brand Identity Architecture",
      desc: "Distinctive logo marks, corporate seals, typographic hierarchies, and cohesive visual language engineered for universal brand recall.",
    },
    {
      icon: Compass,
      title: "Brand Archetype & Positioning",
      desc: "Competitive market positioning, unique value propositions, emotional touchpoints, and clear differentiation in crowded sectors.",
    },
    {
      icon: Layers,
      title: "Comprehensive Style Guides",
      desc: "Exhaustive brand manuals documenting color palettes (Pantone, CMYK, RGB), clear space protocols, iconography sets, and digital usage.",
    },
    {
      icon: Sparkles,
      title: "Collateral & Stationery Ecosystem",
      desc: "Premium executive visiting cards, luxury letterheads, branded envelopes, presentation folders, and physical touchpoints.",
    },
    {
      icon: Award,
      title: "Trademark & Vector Precision",
      desc: "Mathematically balanced geometric vector logomarks prepared for large-scale architectural signage down to 16px digital favicons.",
    },
    {
      icon: ShieldCheck,
      title: "Multi-Platform Asset Governance",
      desc: "Centralized digital asset suites ensuring 100% brand fidelity across packaging, print ads, social platforms, and digital environments.",
    },
  ];

  // Brand development portfolio works
  const brandWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "logo-design" ||
      p.categoryKey === "visiting-card-design" ||
      p.category?.toLowerCase().includes("logo") ||
      p.category?.toLowerCase().includes("brand") ||
      p.title?.toLowerCase().includes("logo")
  ).slice(0, 12);

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef} style={{ background: "#FFFFFF" }}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main" style={{ background: "#FFFFFF" }}>
        {/* Page Hero Header - 3D Stage with Crisp Pure White Content */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span>{" "}
                <TextReveal triggerOnMount delay={0.06}>
                  Identity &amp; Foundation
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Brand Development
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Built to Endure &amp; Inspire.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We sculpt indelible corporate identities that forge emotional bonds with audiences. From naming and logomarks to cohesive design manuals, our brand development elevates startups into iconic category leaders.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Brand Mascot" />
            </div>
          </div>
        </section>

        {/* Unified Single-Page Flow */}
        <div className="subpage-content-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px clamp(20px, 4vw, 60px)" }}>
          {/* Split Section: Graphic on Left, Content on Right */}
          <section className="subpage-split-hero">
            <div className="subpage-split-left">
              <div className="subpage-split-img-card">
                <img
                  src={brandDevImg}
                  alt="Brand Development Studio Workshop"
                  className="subpage-split-img"
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">STRATEGIC IDENTITY DESIGN</span>
              <h2 className="subpage-split-title">Crafting Timeless Brands That Command Attention</h2>
              <p className="subpage-split-desc">
                Great brands are never accidental. We fuse deep market understanding with rigorous graphic design craft to create unmistakable visual identities. Every curve, typographic pairing, and color choice is engineered to communicate prestige, credibility, and memorability.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Custom Logotype &amp; Iconic Emblem Design</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Comprehensive 60+ Page Brand Manuals</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Corporate Stationery &amp; Executive Collateral</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Scalable Vector Master Kits for All Formats</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Develop Your Brand</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" search={{ category: "logo-design" }} className="subpage-btn-secondary">
                  <span>View Logo Reel</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: Brand Works Grid (SHOW ONLY IMAGE PROPERLY - NO TEXT) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                SELECTED IDENTITY REEL
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">BRAND</span>
                <span className="pill-suffix">WORKS</span>
              </h2>
              <p className="brands-performance-subtitle" style={{ font: "600 clamp(16px, 1.4vw, 20px)/1.4 var(--font-sans)", color: "#1E293B", margin: "0 auto 16px", textAlign: "center", maxWidth: "700px" }}>
                Iconic marks, packaging badges, and corporate identities.
              </p>
              <Link to="/works" search={{ category: "logo-design" }} className="subpage-view-all-link">
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid">
              {brandWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Brand Work"}`}
                >
                  <img src={proj.image} alt={proj.title || "Brand Development Work"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities Grid */}
          <section style={{ marginBottom: "56px" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                STUDIO EXPERTISE
              </span>
              <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                Brand Development Capabilities
              </h2>
            </div>

            <div className="service-capabilities-grid is-borderless">
              {capabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="capability-card-simple">
                    <div className="capability-simple-icon">
                      <Icon className="w-5 h-5 text-[#1C2752]" />
                    </div>
                    <h3 className="capability-simple-title">{item.title}</h3>
                    <p className="capability-simple-desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Meaningful Discussion Contact Section */}
          <div id="contact-form">
            <MeaningfulContactSection />
          </div>
        </div>
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
              <img src={selectedWork.image} alt={selectedWork.title || "Brand Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
