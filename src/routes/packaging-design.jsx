import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Box, Layers, Sparkles, CheckCircle2, ShieldCheck, Palette, FileText } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export const Route = createFileRoute("/packaging-design")({
  head: () => ({
    meta: [
      { title: "Packaging Design Studio — SS Production House" },
      {
        name: "description",
        content:
          "High-impact luxury packaging design, rigid boxes, corrugated dielines, folding cartons, and sustainable material engineering by SS Production House.",
      },
    ],
  }),
  component: PackagingDesignPage,
});

export default function PackagingDesignPage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Filter packaging specific projects from portfolio
  const packagingProjects = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "box-design" ||
      p.categoryKey === "packaging" ||
      p.category?.toLowerCase().includes("packaging") ||
      p.title?.toLowerCase().includes("box")
  ).slice(0, 6);

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

      <main className="page-main">
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

        {/* Capabilities Grid */}
        <section className="page-content-section">
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
        </section>

        {/* Featured Packaging Works Showcase */}
        {packagingProjects.length > 0 && (
          <section className="page-content-section" style={{ background: "#F8FAFC", borderRadius: "16px", padding: "48px 32px" }}>
            <div className="page-subhead-wrap" style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                  PORTFOLIO SHOWCASE
                </span>
                <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                  Selected Packaging Projects
                </h2>
              </div>
              <Link to="/works" search={{ category: "box-design" }} className="subpage-view-all-link">
                <span>View Full Packaging Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="subpage-projects-grid">
              {packagingProjects.map((proj) => (
                <div key={proj.id} className="subpage-project-card">
                  <div className="subpage-proj-img-wrap">
                    <img src={proj.image} alt={proj.title} loading="lazy" />
                  </div>
                  <div className="subpage-proj-meta">
                    <span className="subpage-proj-cat">{proj.category}</span>
                    <h4 className="subpage-proj-title">{proj.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Meaningful Discussion Contact Section */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
