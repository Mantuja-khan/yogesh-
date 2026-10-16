import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Compass, TrendingUp, Lightbulb, CheckCircle2, ShieldCheck, Target, BarChart2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import strategyImg from "@/assets/services_showcase_hexagon.jpg";

export const Route = createFileRoute("/brand-strategy")({
  head: () => ({
    meta: [
      { title: "Brand Strategy & Market Positioning — SS Production House" },
      {
        name: "description",
        content:
          "Strategic brand positioning, brand story architecture, customer persona mapping, and competitive analysis by SS Production House.",
      },
    ],
  }),
  component: BrandStrategyPage,
});

export default function BrandStrategyPage() {
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
      icon: Compass,
      title: "Market Landscape & Competitive Audit",
      desc: "Deep sector teardowns uncovering white space opportunities, competitor messaging blind spots, and defensible market footholds.",
    },
    {
      icon: Target,
      title: "Brand Purpose, Mission & Vision",
      desc: "Clarifying why your business exists beyond profit, anchoring internal culture and external messaging in compelling purpose.",
    },
    {
      icon: Lightbulb,
      title: "Brand Story & Narrative Architecture",
      desc: "Crafting captivating origin stories, investor pitch deck narratives, and brand voice guidelines that convert skeptics into advocates.",
    },
    {
      icon: TrendingUp,
      title: "Customer Persona & Journey Mapping",
      desc: "Behavioral customer profiling identifying key friction points, buying motivations, and emotional triggers across the purchase lifecycle.",
    },
    {
      icon: BarChart2,
      title: "Brand Architecture & Portfolio Structuring",
      desc: "Optimizing monolithic, endorsed, or house-of-brands architectures for companies scaling multiple product lines or sub-brands.",
    },
    {
      icon: ShieldCheck,
      title: "Go-to-Market Launch Strategy",
      desc: "Actionable 90-day launch blueprints orchestrating PR, digital teasers, influencer seeding, and shelf-placement activations.",
    },
  ];

  // Brand strategy works showcase (books, publications, corporate identities)
  const strategyWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "publication" ||
      p.categoryKey === "book-design" ||
      p.categoryKey === "logo-design" ||
      p.category?.toLowerCase().includes("book") ||
      p.category?.toLowerCase().includes("catalogue")
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
                  Vision &amp; Direction
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Brand Strategy
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Positioned for Market Dominance.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  Before we design a single pixel or packaging crease, we define the strategic soul of your brand. We map your audience, carve out uncontested market space, and articulate a narrative that cannot be ignored.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Strategy Mascot" />
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
                  src={strategyImg}
                  alt="Brand Strategy Workshop"
                  className="subpage-split-img"
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">COMMERCIAL STRATEGY &amp; POSITIONING</span>
              <h2 className="subpage-split-title">From Fuzzy Concept to Unshakable Brand Authority</h2>
              <p className="subpage-split-desc">
                In an era of relentless competition, brand strategy is your ultimate commercial moat. We decode what makes your offering indispensable, aligning internal ambition with consumer desire to ensure sustainable premium pricing power.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Category White-Space Discovery &amp; Benchmarking</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Brand Persona &amp; Tone of Voice Matrix</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strategic Brand Storytelling &amp; Tagline Conception</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Multi-Tier Product Line Architecture</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Build Your Strategy</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" search={{ category: "publication" }} className="subpage-btn-secondary">
                  <span>Explore Publications</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: Strategy Works Grid (SHOW ONLY IMAGE PROPERLY - NO TEXT) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                EDITORIAL &amp; IDENTITY SHOWCASE
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">STRATEGY</span>
                <span className="pill-suffix">WORKS</span>
              </h2>
              <p className="brands-performance-subtitle" style={{ font: "600 clamp(16px, 1.4vw, 20px)/1.4 var(--font-sans)", color: "#1E293B", margin: "0 auto 16px", textAlign: "center", maxWidth: "700px" }}>
                Strategic catalogues, editorial publications, and brand systems.
              </p>
              <Link to="/works" search={{ category: "publication" }} className="subpage-view-all-link">
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid">
              {strategyWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Strategy Work"}`}
                >
                  <img src={proj.image} alt={proj.title || "Brand Strategy Work"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities Grid */}
          <section style={{ marginBottom: "56px" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                STRATEGIC FRAMEWORKS
              </span>
              <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                Brand Strategy Capabilities
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
              <img src={selectedWork.image} alt={selectedWork.title || "Strategy Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
