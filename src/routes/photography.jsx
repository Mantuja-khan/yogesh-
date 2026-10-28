import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, Film, SunMedium, Image, Sliders, CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import photographerIllustration from "@/assets/photographer_illustration.jpg";

export default function PhotographyPage() {
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
      icon: Camera,
      title: "Tabletop Commercial Product Shoots",
      desc: "Ultra-sharp medium-format captures of luxury packaging, cosmetics, electronics, and tableware with precision diffusion lighting.",
    },
    {
      icon: SunMedium,
      title: "Liquid Splash & High-Speed Optics",
      desc: "Microsecond strobe synchronization capturing water droplet splashes, perfume mists, and dynamic powder dispersion effects.",
    },
    {
      icon: Image,
      title: "Hero Bottle & Glassware Lighting",
      desc: "Black-line and white-line rim lighting techniques eliminating unwanted reflections while accentuating glass thickness and liquid hue.",
    },
    {
      icon: Sliders,
      title: "High-End Beauty & Pack Retouching",
      desc: "Multi-plate compositing, dust removal, foil enhancement, label perspective alignment, and master color grading for print and digital.",
    },
    {
      icon: Film,
      title: "Commercial Film Making & TVCs",
      desc: "Kinetic motion reels, high-frame-rate product reveals, TV commercials, and social media video shorts engineered for viral engagement.",
    },
    {
      icon: CheckCircle2,
      title: "Omnichannel E-Commerce Suites",
      desc: "Turnkey multi-angle white-background Amazon/Shopify catalog suites with matching lifestyle contextual vignettes.",
    },
  ];

  // Actual product photoshoot works from portfolio - all images from photoshot folder
  const photoshootWorks = (portfolio.projects || []).filter(
    (p) => p.categoryKey === "product-photoshoot" || p.id?.startsWith("ph-")
  );

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
                  Commercial Photography &amp; Shoots
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Product Photography
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Light, Texture &amp; Liquid Motion.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We capture the tactile essence of your products with surgical studio lighting and cinematic motion optics. Every reflection, surface texture, and droplet is engineered to drive commercial desire.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Photography Mascot" />
            </div>
          </div>
        </section>

        {/* Unified Single-Page Flow */}
        <div className="subpage-content-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px clamp(20px, 4vw, 60px)" }}>
          {/* Split Hero Section: 1st Image on Left (No black bg), Content on Right */}
          <section className="subpage-split-hero">
            {/* Left Side: 1st Image with pure white background */}
            <div className="subpage-split-left">
              <div className="subpage-split-img-card">
                <img
                  src={photographerIllustration}
                  alt="Professional Photographer in Studio"
                  className="subpage-split-img invert-sketch"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="subpage-split-right">
              <span className="subpage-split-kicker">COMMERCIAL STUDIO &amp; OPTICS</span>
              <h2 className="subpage-split-title">Precision Light. Hero Focus. Flawless Detail.</h2>
              <p className="subpage-split-desc">
                Great products deserve imagery that commands respect. Our commercial studio specializes in luxury cosmetic bottles, electronic hardware, FMCG retail packaging, and high-speed splash captures. We sculpt reflections to reveal the rich physical textures of glass, matte polymer, and embossed foils.
              </p>

              <div className="subpage-split-features">
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ultra High-Resolution Medium Format</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Precision Rim &amp; Diffusion Lighting</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Multi-Angle E-Commerce Catalog Suites</span>
                </div>
                <div className="subpage-split-feature-item">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Color-Accurate Master Retouching</span>
                </div>
              </div>

              <div className="subpage-split-cta-row">
                <a href="#contact-form" className="subpage-btn-primary">
                  <span>Book a Product Shoot</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link to="/works" search={{ category: "product-photoshoot" }} className="subpage-btn-secondary">
                  <span>Explore Full Portfolio</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Below: Photoshoot Works Grid (SHOW ALL IMAGES CLEAN & SIMPLE - NO BORDERS OR CARD BACKGROUND) */}
          <section style={{ marginBottom: "54px" }}>
            <div style={{ marginBottom: "28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700", marginBottom: "8px" }}>
                STUDIO REEL
              </span>
              <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
                <span className="pill-prefix">PHOTOSHOOT</span>
                <span className="pill-suffix">WORKS</span>
              </h2>
            </div>

            {/* Pure Clean Image Grid: Simple Images, No Card Background, No Borders */}
            <div className="subpage-works-pure-grid photography-clean-grid">
              {photoshootWorks.map((proj) => (
                <div
                  key={proj.id}
                  className="subpage-pure-image-card photography-clean-card"
                  onClick={() => setSelectedWork(proj)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${proj.title || "Photoshoot Image"}`}
                >
                  <img src={proj.image} alt={proj.title || "Photoshoot Work"} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Studio Services: Simple and WITHOUT BORDER STYLING */}
          {/* <section style={{ marginBottom: "56px" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
                STUDIO SERVICES
              </span>
              <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                Complete Photographic Capabilities
              </h2>
            </div>

            <div className="service-capabilities-grid is-borderless">
              {capabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="capability-card-simple">
                    <div className="capability-simple-icon">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="capability-simple-title">{item.title}</h3>
                    <p className="capability-simple-desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section> */}

          {/* Meaningful Discussion Contact Section */}
          <div id="contact-form">
            <MeaningfulContactSection />
          </div>
        </div>
      </main>
      <div>

      </div>
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
              <img src={selectedWork.image} alt={selectedWork.title || "Photoshoot Preview"} className="playbook-modal-pure-img" />
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
