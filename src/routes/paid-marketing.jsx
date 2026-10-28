import { Link } from "react-router-dom";
import { ArrowUpRight, DollarSign, Target, TrendingUp, CheckCircle2, ShieldCheck, PieChart, Zap, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import paidImg from "@/assets/ariz-proj-ecommerce.jpg";

export default function PaidMarketingPage() {
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
      title: "Meta Ads (Instagram & Facebook Paid)",
      desc: "Precision audience segmenting, custom lookalikes, creative fatigue rotation, and conversion-API server tracking maximizing ad spend ROI.",
    },
    {
      icon: DollarSign,
      title: "Google Search & Performance Max (PPC)",
      desc: "Dominating high-intent search queries, shopping feed optimization, dynamic remarketing, and negative keyword filtering to eliminate wasted budget.",
    },
    {
      icon: TrendingUp,
      title: "Full-Funnel ROAS Scaling Framework",
      desc: "Top-of-funnel brand awareness transitioning systematically into middle-funnel consideration and bottom-of-funnel high-margin purchase.",
    },
    {
      icon: Zap,
      title: "High-Velocity Creative A/B Testing",
      desc: "Testing dozens of visual hooks, headlines, video edits, and call-to-actions weekly to mathematically isolate champion converting assets.",
    },
    {
      icon: PieChart,
      title: "Multi-Touch Attribution & Analytics",
      desc: "Clear tracking of blended CAC, LTV, ROAS, and cohort payback periods in transparent real-time executive dashboard portals.",
    },
    {
      icon: ShieldCheck,
      title: "Post-Click Landing Page Optimization",
      desc: "Dedicated frictionless landing pages matched 1:1 with ad copy to maximize click-to-conversion rates and minimize bounce rates.",
    },
  ];

  // Paid marketing works showcase
  const paidWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "post-design" ||
      p.categoryKey === "box-design" ||
      p.categoryKey === "mockup" ||
      p.category?.toLowerCase().includes("ad") ||
      p.category?.toLowerCase().includes("post")
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
                  Performance &amp; Scalable Growth
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Paid Marketing
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Engineered for Relentless ROAS.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We transform advertising budgets into reliable, scalable revenue engines. By synchronizing world-class creative production with algorithmic media buying, we scale brands sustainably with proven return on ad spend.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Paid Mascot" />
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
                  src={paidImg}
                  alt="Paid Marketing Analytics and Performance"
                  className="subpage-split-img"
                  loading="eager"
                />
              </div>
            </div>

            <div className="subpage-split-right">
              <span className="subpage-split-kicker">PERFORMANCE MEDIA BUYING</span>
              <h2 className="subpage-split-title">Precision Targeting Meets High-Conversion Creative</h2>
              <p className="subpage-split-desc">
                Most paid campaigns fail because creative and media buying are siloed. At SS Production House, we unify award-winning graphic production directly with rigorous media buying algorithms—testing, iterating, and scaling winners daily.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Meta Ads Full-Funnel Structure (CBO &amp; ASC)</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Google Ads &amp; Performance Max Campaign Setup</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>High-Converting Static &amp; Video Ad Creatives</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transparent Weekly ROAS &amp; CAC Reporting</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Scale Your Paid Ads</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/ads-design" className="subpage-btn-secondary">
                  <span>Explore Ad Creatives</span>
                </Link>
              </div>
            </div>
          </section>


          {/* Capabilities Grid */}


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
              <img src={selectedWork.image} alt={selectedWork.title || "Paid Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
