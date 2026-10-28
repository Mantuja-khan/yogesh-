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

          {/* Capabilities Grid */}
          {/* Meaningful Discussion Contact Section */}
          <div id="contact-form">
            <MeaningfulContactSection/>
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
