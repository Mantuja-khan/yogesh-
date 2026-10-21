import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Megaphone, Target, BarChart2, Share2, Palette, CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export const Route = createFileRoute("/ads-design")({
  head: () => ({
    meta: [
      { title: "Advertising Design & High-Conversion Campaigns — SS Production House" },
      {
        name: "description",
        content:
          "High-impact social media ad creatives, billboard outdoor branding, digital display campaigns, and print marketing collateral by SS Production House.",
      },
    ],
  }),
  component: AdsDesignPage,
});

export default function AdsDesignPage() {
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
      icon: Megaphone,
      title: "Social Media Performance Creatives",
      desc: "Scroll-stopping Instagram, Facebook, and LinkedIn static and carousel ad assets engineered for maximum click-through rates.",
    },
    {
      icon: Target,
      title: "Billboard & Airport Outdoor Branding",
      desc: "Massive scale Out-of-Home (OOH) advertising with razor-sharp readability, bold typographic hierarchy, and memorable visual punch.",
    },
    {
      icon: Share2,
      title: "Campaign Creative Systems",
      desc: "Multi-channel advertising toolkits with consistent brand messaging across print, digital banners, in-store POP, and packaging stickers.",
    },
    {
      icon: Palette,
      title: "Retail Point-of-Sale (POS) Displays",
      desc: "Endcap headers, shelf-talkers, retail standees, and floor display units that draw shopper gaze in crowded supermarket aisles.",
    },
    {
      icon: BarChart2,
      title: "A/B Testing Creative Matrix",
      desc: "Variations in color psychology, headline typography, and hook framing designed for performance testing and conversion optimization.",
    },
    {
      icon: CheckCircle2,
      title: "Print & Digital Media Kit Handover",
      desc: "Comprehensive delivery with vector EPS, layered PSDs, RGB web assets, and pre-press CMYK files with crop and bleed marks.",
    },
  ];

  const featuredWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "post-design" ||
      p.categoryKey === "outdoor" ||
      p.categoryKey === "indoor" ||
      p.category?.toLowerCase().includes("post")
  ).slice(0, 6);

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
                  Performance &amp; Scale
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Advertising Design
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Creatives That Convert &amp; Resonate.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We design advertising campaigns that cut through digital noise and urban clutter. Combining compelling visual hooks, behavioral design psychology, and bold typographic rhythm, our ads turn viewers into loyal brand advocates.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Ads Mascot" />
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="page-content-section">
          <div className="page-subhead-wrap" style={{ marginBottom: "36px" }}>
            <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
              CAMPAIGN ARCHITECTURE
            </span>
            <h2 className="editorial-lead" style={{ margin: "8px 0 0 0" }}>
              Engineered for High Commercial Impact
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
          <section className="page-content-section" style={{ background: "#FFFFFF", padding: "48px 0" }}>
            <div className="page-subhead-wrap" style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                  CAMPAIGN REEL
                </span>
                <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                  Selected Ad Creatives &amp; Posts
                </h2>
              </div>
              <Link to="/works" search={{ category: "post-design" }} className="subpage-view-all-link">
                <span>View All Ad Works</span>
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
                  aria-label={`View ${proj.title || "Ad Campaign"}`}
                >
                  <img src={proj.image} alt={proj.title || "Ad Design Work"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}

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
              <img src={selectedWork.image} alt={selectedWork.title || "Ad Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
