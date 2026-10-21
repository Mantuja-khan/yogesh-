import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Share2, Users, Flame, CheckCircle2, ShieldCheck, Heart, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import smmImg from "@/assets/ariz-proj-photo.jpg";

export const Route = createFileRoute("/social-media-marketing")({
  head: () => ({
    meta: [
      { title: "Social Media Marketing & Content Creation — SS Production House" },
      {
        name: "description",
        content:
          "High-engagement social media campaigns, viral short-form video content, brand community growth, and influencer partnerships by SS Production House.",
      },
    ],
  }),
  component: SocialMediaMarketingPage,
});

export default function SocialMediaMarketingPage() {
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
      icon: Flame,
      title: "Viral Short-Form Video (Reels & TikTok)",
      desc: "Fast-paced, hook-driven vertical motion assets engineered specifically for algorithmic distribution and maximum organic reach.",
    },
    {
      icon: Sparkles,
      title: "Editorial Feed Curation & Carousel Design",
      desc: "Cohesive aesthetic grid layouts, multi-slide swipe carousels, and thumb-stopping visual storytelling tailored to premium feeds.",
    },
    {
      icon: Users,
      title: "Community Management & Brand Advocacy",
      desc: "Active audience dialogue, comment moderation, brand banter, and direct message handling that builds loyal brand advocates.",
    },
    {
      icon: Heart,
      title: "Influencer Curation & Partnership Seeding",
      desc: "Vetting authentic creators aligned with your brand values, orchestrating product gifting, and negotiating co-created campaigns.",
    },
    {
      icon: Share2,
      title: "Cross-Platform Distribution Strategy",
      desc: "Tailoring content formats natively across Instagram, LinkedIn, Pinterest, YouTube Shorts, and X for compound visibility.",
    },
    {
      icon: ShieldCheck,
      title: "Social Listening & Sentiment Intelligence",
      desc: "Monitoring brand mentions, competitor campaign sentiment, and trending cultural moments to seize real-time opportunities.",
    },
  ];

  // All social media post works showcase from portfolio
  const smmWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "post-design" ||
      p.categoryKeys?.includes("post-design") ||
      p.category?.toLowerCase().includes("post") ||
      p.category?.toLowerCase().includes("social")
  );

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
                  Culture &amp; Audience Connection
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Social Media Marketing
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Spark Conversations &amp; Viral Growth.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We transform brands into social media sensations. By blending editorial art direction with data-backed trend analysis, we create captivating content that stops the scroll and builds dedicated global communities.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Social Mascot" />
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
                  src={smmImg}
                  alt="Social Media Content Production"
                  className="subpage-split-img"
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">VIRAL ENGAGEMENT ARCHITECTURE</span>
              <h2 className="subpage-split-title">From Passive Impressions to Passionate Brand Advocates</h2>
              <p className="subpage-split-desc">
                Social media is the modern shop window and town square. We design scroll-stopping visual narratives, high-impact carousel masterclasses, and vertical short-form reels that demand attention, stimulate genuine conversation, and skyrocket organic shareability.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>High-Concept Instagram &amp; LinkedIn Carousel Packs</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Short-Form Video Production &amp; Sound-Design</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Influencer Partnership Sourcing &amp; Briefing</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Data-Backed Content Calendars &amp; Analytics Audits</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Ignite Your Social Media</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" search={{ category: "post-design" }} className="subpage-btn-secondary">
                  <span>Explore Social Creatives</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: Social Works Grid (SHOW ONLY IMAGE PROPERLY - NO TEXT) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                CAMPAIGN REEL
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">SOCIAL</span>
                <span className="pill-suffix">WORKS</span>
              </h2>
              <p className="brands-performance-subtitle" style={{ font: "600 clamp(16px, 1.4vw, 20px)/1.4 var(--font-sans)", color: "#1E293B", margin: "0 auto 16px", textAlign: "center", maxWidth: "700px" }}>
                High-converting promotional banners, social reels, and carousel graphics.
              </p>
              <Link to="/works" search={{ category: "post-design" }} className="subpage-view-all-link">
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pure Image Grid: Only Image Displayed (Matching Photography Page) */}
            <div className="subpage-works-pure-grid photography-clean-grid">
              {smmWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card photography-clean-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Social Post"}`}
                >
                  <img src={proj.image} alt={proj.title || "Social Media Post"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities Grid */}
          <section style={{ marginBottom: "56px" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                STRATEGIC EXECUTION
              </span>
              <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                Social Media Marketing Capabilities
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
              <img src={selectedWork.image} alt={selectedWork.title || "Social Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
