import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, Code, Zap, Smartphone, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import webDeveloperIllustration from "@/assets/web_developer_illustration.png";
import website1 from "@/assets/websites/website1.png";
import website2 from "@/assets/websites/website2.png";
import website3 from "@/assets/websites/website3.png";
import website4 from "@/assets/websites/website4.png";

export const Route = createFileRoute("/website-design")({
  head: () => ({
    meta: [
      { title: "Website Design & Development Studio — SS Production House" },
      {
        name: "description",
        content:
          "High-performance bespoke website design, corporate portals, responsive e-commerce platforms, and interactive 3D web experiences by SS Production House.",
      },
    ],
  }),
  component: WebsiteDesignPage,
});

export default function WebsiteDesignPage() {
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
      icon: Globe,
      title: "Bespoke Brand & Corporate Websites",
      desc: "Tailored digital flagship websites communicating luxury brand narratives, high prestige, and deep credibility to global audiences.",
    },
    {
      icon: Code,
      title: "Clean React & Modern Front-End Architecture",
      desc: "Blazing fast headless code, modular UI components, fluid micro-animations, and seamless state management without bloated templates.",
    },
    {
      icon: Zap,
      title: "Core Web Vitals & Speed Optimization",
      desc: "Sub-second load times, lightweight image rendering, zero cumulative layout shift (CLS), and 95+ Google PageSpeed performance scores.",
    },
    {
      icon: Smartphone,
      title: "Flawless Multi-Device Responsiveness",
      desc: "Pixel-accurate rendering across mobile smartphones, tablets, high-DPI laptops, and ultra-wide desktop monitors.",
    },
    {
      icon: ShieldCheck,
      title: "Technical SEO & Schema Markup",
      desc: "Search engine discoverability baked into HTML semantics, OpenGraph preview cards, automated sitemaps, and rich snippet schemas.",
    },
    {
      icon: CheckCircle2,
      title: "E-Commerce & Conversion Architecture",
      desc: "High-converting product landing pages, friction-free checkout funnels, and integrated analytics tracking for measurable ROI.",
    },
  ];

  // Curated website flagships (including remaining website 4 and all website designs with hover scroll)
  const websiteWorks = [
    {
      id: "web-4",
      image: website4,
      title: "Global Technical Industrial Flagship",
    },
    {
      id: "web-1",
      image: website1,
      title: "Luxury Sanitaryware & Living",
    },
    {
      id: "web-2",
      image: website2,
      title: "Sun Star Packaging & Logistics",
    },
    {
      id: "web-3",
      image: website3,
      title: "Precision CNC & Industrial Machinery",
    },
  ];

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
                  Digital Architecture &amp; Web Engineering
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Website Design
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    High-Performance Digital Flagships.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We create websites that combine editorial beauty with technical speed. Every page is tailored to position your brand as an industry leader, delight visitors on every screen, and turn interest into inquiries.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Website Mascot" />
            </div>
          </div>
        </section>

        {/* Unified Single-Page Flow */}
        <div className="subpage-content-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px clamp(20px, 4vw, 60px)" }}>
          {/* Split Section: 3rd Image on Left (Pure white bg), Content on Right */}
          <section className="subpage-split-hero">
            {/* Left Side: 3rd Image (Web Developer/Designer Workspace) */}
            <div className="subpage-split-left">
              <div className="subpage-split-img-card">
                <img
                  src={webDeveloperIllustration}
                  alt="Full-Stack Web Designer and Developer Workspace"
                  className="subpage-split-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="subpage-split-right">
              <span className="subpage-split-kicker">ENGINEERING &amp; FRONT-END CRAFT</span>
              <h2 className="subpage-split-title">Fast, Elegant, Scalable Digital Experiences</h2>
              <p className="subpage-split-desc">
                From luxury packaging portals to dynamic corporate web applications, our studio codes high-performance web products utilizing modern JavaScript, React, HTML5, CSS3, and interactive 3D WebGL backdrops. We optimize every kilobyte to ensure your site loads instantly and converts effortlessly.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Interactive 3D WebGL Experiences</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Headless React &amp; Modular Front-End</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sub-Second Page Load Optimization</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Automated Technical SEO &amp; Rich Cards</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Start Your Website</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" className="subpage-btn-secondary">
                  <span>View All Works</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: Website Design Works Grid (SHOW ONLY IMAGE PROPERLY - NO TEXT) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                DIGITAL SHOWCASE
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">WEBSITE</span>
                <span className="pill-suffix">WORKS</span>
              </h2>

            </div>

            {/* Pure Image Grid: Same hover-scroll viewport style as home page */}
            <div className="website-page-works-grid">
              {websiteWorks.map((site) => (
                <div
                  key={site.id}
                  className="website-showcase-window"
                  onClick={() => setSelectedWork(site)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedWork(site);
                  }}
                  aria-label="Website preview"
                >
                  <div className="website-scroll-viewport">
                    <img
                      src={site.image}
                      alt={site.title || "Website design preview"}
                      className="website-scroll-image"
                      loading="lazy"
                    />
                  </div>
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
              <img src={selectedWork.image} alt={selectedWork.title || "Website Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
