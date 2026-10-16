import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, TrendingUp, Globe, CheckCircle2, ShieldCheck, BarChart3, FileSearch, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import seoImg from "@/assets/ariz-proj-analytics.jpg";

export const Route = createFileRoute("/search-engine-optimization")({
  head: () => ({
    meta: [
      { title: "Search Engine Optimization (SEO) — SS Production House" },
      {
        name: "description",
        content:
          "Data-driven technical SEO, keyword ranking dominance, on-page optimization, and high-authority link architectures by SS Production House.",
      },
    ],
  }),
  component: SearchEngineOptimizationPage,
});

export default function SearchEngineOptimizationPage() {
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
      icon: Search,
      title: "Commercial & Transactional Keyword Research",
      desc: "Identifying high-intent search queries that drive qualified buyers directly into your sales funnels and product checkout flows.",
    },
    {
      icon: FileSearch,
      title: "Full Technical SEO & Core Web Vitals",
      desc: "Crawling audits, schema markup implementation, canonical tagging, speed optimization (sub-1s FCP), and crawl budget efficiency.",
    },
    {
      icon: Globe,
      title: "On-Page Semantic Optimization",
      desc: "Header tags, meta directives, internal link siloing, image alt descriptors, and entity-focused content architecture.",
    },
    {
      icon: TrendingUp,
      title: "Authoritative Digital PR & Backlinks",
      desc: "White-hat editorial link acquisition from industry publications, luxury directories, and media outlets to boost domain authority.",
    },
    {
      icon: BarChart3,
      title: "Rank Tracking & Organic Analytics",
      desc: "Live dashboard tracking Google SERP positions, organic traffic impressions, click-through rates, and revenue conversions.",
    },
    {
      icon: ShieldCheck,
      title: "Algorithm Update Resilience",
      desc: "Future-proof SEO strategies adhering strictly to Google Helpful Content and E-E-A-T guidelines preventing algorithmic penalties.",
    },
  ];

  // SEO & Web digital showcase
  const seoWorks = (portfolio.projects || []).slice(0, 12);

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
                  Organic Search Authority
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Search Engine Optimization
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Capture High-Intent Demand.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We transform your digital presence into an organic client acquisition engine. Combining deep technical audits with semantic content strategy, we rank your brand at the absolute summit of Google search results.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="SEO Mascot" />
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
                  src={seoImg}
                  alt="Search Engine Optimization Analytics"
                  className="subpage-split-img"
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">TECHNICAL &amp; SEMANTIC DOMINANCE</span>
              <h2 className="subpage-split-title">Turn Search Engines into Your Most Lucrative Channel</h2>
              <p className="subpage-split-desc">
                Ranking number one isn't about vanity metrics; it's about owning the highest-converting real estate on the internet. Our engineering-first SEO framework eliminates technical debt, optimizes schema graphs, and structures content for maximum algorithmic favor.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Comprehensive Core Web Vitals &amp; Speed Audits</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>High-Intent Commercial Keyword Mapping</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>JSON-LD Schema Markup &amp; Rich Snippets</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>High-Authority White-Hat Link Building</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Audit Your Search Presence</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/website-design" className="subpage-btn-secondary">
                  <span>Explore Web Solutions</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: Digital Works Grid (SHOW ONLY IMAGE PROPERLY - NO TEXT) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                DIGITAL ECOSYSTEM REEL
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">SEO &amp; DIGITAL</span>
                <span className="pill-suffix">WORKS</span>
              </h2>
              <p className="brands-performance-subtitle" style={{ font: "600 clamp(16px, 1.4vw, 20px)/1.4 var(--font-sans)", color: "#1E293B", margin: "0 auto 16px", textAlign: "center", maxWidth: "700px" }}>
                High-performance platforms engineered for organic search visibility.
              </p>
              <Link to="/works" className="subpage-view-all-link">
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid">
              {seoWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Digital Work"}`}
                >
                  <img src={proj.image} alt={proj.title || "SEO Platform Work"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities Grid */}
          <section style={{ marginBottom: "56px" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                METHODOLOGY
              </span>
              <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                Search Engine Optimization Pillars
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
              <img src={selectedWork.image} alt={selectedWork.title || "SEO Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
