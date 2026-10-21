import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Layout, Smartphone, MousePointer, Eye, Layers, CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import uiuxIllustration from "@/assets/uiux_designer_illustration.jpg";

export const Route = createFileRoute("/ui-ux-design")({
  head: () => ({
    meta: [
      { title: "UI/UX Design Studio & Digital Products — SS Production House" },
      {
        name: "description",
        content:
          "Modern UI/UX design, mobile app interfaces, web application dashboards, design systems, and user journey mapping by SS Production House.",
      },
    ],
  }),
  component: UiUxDesignPage,
});

export default function UiUxDesignPage() {
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
      icon: Smartphone,
      title: "Mobile App Interface Design (iOS & Android)",
      desc: "Pixel-perfect mobile application flows, touch ergonomics, micro-interactions, and responsive component libraries.",
    },
    {
      icon: Layout,
      title: "Enterprise Web App Dashboards & Portals",
      desc: "Information architecture for data-dense dashboards, analytics screens, SaaS workflows, and multi-tenant admin consoles.",
    },
    {
      icon: Layers,
      title: "Scalable Design Systems & Figma Tokens",
      desc: "Tokenized UI kits with atomic design components, accessible color palettes (WCAG AAA), and auto-layout states ready for developers.",
    },
    {
      icon: MousePointer,
      title: "Interactive Clickable Prototyping",
      desc: "High-fidelity animated prototypes simulating real user flows, page transitions, and gestures for stakeholder validation and testing.",
    },
    {
      icon: Eye,
      title: "User Journey & Experience Audits",
      desc: "Heuristic evaluation, user drop-off diagnosis, wireframe mapping, and friction-free checkout/onboarding funnel optimization.",
    },
    {
      icon: CheckCircle2,
      title: "Developer Handoff & Asset Production",
      desc: "Clean Figma spec exports with vector SVG iconography, responsive CSS tokens, and interaction behavior documentation.",
    },
  ];

  // UI/UX & digital interface works
  const uiuxWorks = (portfolio.projects || []).slice(0, 12);

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef} style={{ background: "#FFFFFF" }}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main" style={{ background: "#FFFFFF" }}>
        {/* Page Hero Header - Standard Spacious Layout with 3D Backdrop and Mascot */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span>{" "}
                <TextReveal triggerOnMount delay={0.06}>
                  Digital Products &amp; Interfaces
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  UI/UX Design
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Intuitive, Elegant &amp; Effortless.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We architect digital interfaces that balance visual sophistication with razor-sharp usability. From iOS and Android mobile experiences to enterprise SaaS portals, our UI/UX design turns complex systems into delight.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="UI/UX Mascot" />
            </div>
          </div>
        </section>

        {/* Unified Single-Page Flow */}
        <div className="subpage-content-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px clamp(20px, 4vw, 60px)" }}>
          {/* Split Section: 2nd Image on Left (No black bg), Content on Right */}
          <section className="subpage-split-hero">
            {/* Left Side: 2nd Image (UI/UX Designer) with pure white background */}
            <div className="subpage-split-left">
              <div className="subpage-split-img-card">
                <img
                  src={uiuxIllustration}
                  alt="UI/UX Designer Crafting Digital Interfaces"
                  className="subpage-split-img invert-sketch"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="subpage-split-right">
              <span className="subpage-split-kicker">INTERFACE ARCHITECTURE</span>
              <h2 className="subpage-split-title">Human-Centered Digital Products That Drive Growth</h2>
              <p className="subpage-split-desc">
                We believe digital interfaces must be both visually breathtaking and instinctively easy to navigate. Working in Figma, our studio creates comprehensive component design systems, frictionless onboarding flows, and responsive dashboard layouts that maximize conversion and user retention.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>iOS &amp; Android App Interfaces</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Figma Design Systems &amp; Tokens</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SaaS &amp; Admin Dashboard Architecture</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Interactive High-Fidelity Prototypes</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Start a UI/UX Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" className="subpage-btn-secondary">
                  <span>Explore Design Works</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: UI/UX Works Grid (SHOW ONLY IMAGE PROPERLY - NO TEXT) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                SELECTED DIGITAL WORK
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">UI/UX</span>
                <span className="pill-suffix">WORKS</span>
              </h2>
              <p className="brands-performance-subtitle" style={{ font: "600 clamp(16px, 1.4vw, 20px)/1.4 var(--font-sans)", color: "#1E293B", margin: "0 auto 16px", textAlign: "center", maxWidth: "700px" }}>
                Intuitive interfaces, Figma design systems, and seamless user experiences.
              </p>
              <Link to="/works" className="subpage-view-all-link">
                <span>View Full Reel</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid photography-clean-grid">
              {uiuxWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card photography-clean-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Interface Work"}`}
                >
                  <img src={proj.image} alt={proj.title || "Interface Design Work"} loading="lazy" />
                </div>
              ))}
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
              <img src={selectedWork.image} alt={selectedWork.title || "UI/UX Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
