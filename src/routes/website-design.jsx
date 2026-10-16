import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, Code, Zap, Smartphone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

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

  const featuredWorks = (portfolio.projects || []).slice(0, 6);

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

        {/* Capabilities Grid */}
        <section className="page-content-section">
          <div className="page-subhead-wrap" style={{ marginBottom: "36px" }}>
            <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
              WEB ENGINEERING
            </span>
            <h2 className="editorial-lead" style={{ margin: "8px 0 0 0" }}>
              Modern Web Development Standards
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

        {/* Featured Showcase */}
        {featuredWorks.length > 0 && (
          <section className="page-content-section" style={{ background: "#F8FAFC", borderRadius: "16px", padding: "48px 32px" }}>
            <div className="page-subhead-wrap" style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                  DIGITAL CREATIONS
                </span>
                <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                  Selected Web &amp; Brand Systems
                </h2>
              </div>
              <Link to="/works" className="subpage-view-all-link">
                <span>View Full Works Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="subpage-projects-grid">
              {featuredWorks.map((proj) => (
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
