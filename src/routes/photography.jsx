import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Camera, Film, SunMedium, Image, Sliders, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Commercial Photography & Product Shoots — SS Production House" },
      {
        name: "description",
        content:
          "High-end commercial product photography, studio lighting, liquid splash captures, macro packaging details, and advertising imagery by SS Production House.",
      },
    ],
  }),
  component: PhotographyPage,
});

export default function PhotographyPage() {
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
      icon: Camera,
      title: "Tabletop Commercial Product Shoots",
      desc: "Ultra-sharp medium-format captures of luxury packaging, cosmetics, electronics, and tableware with precision diffusion lighting.",
    },
    {
      icon: Film,
      title: "Commercial Film Making & TVCs",
      desc: "Kinetic motion reels, high-frame-rate product reveals, TV commercials, and social media video shorts engineered for viral engagement.",
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
      icon: CheckCircle2,
      title: "Omnichannel E-Commerce Suites",
      desc: "Turnkey multi-angle white-background Amazon/Shopify catalog suites with matching lifestyle contextual vignettes.",
    },
  ];

  const featuredWorks = (portfolio.projects || []).filter(
    (p) =>
      p.categoryKey === "product-photoshoot" ||
      p.category?.toLowerCase().includes("photo") ||
      p.title?.toLowerCase().includes("shoot")
  ).slice(0, 6);

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
                  Visual Arts &amp; Cinema
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Commercial Photography
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

        {/* Capabilities Grid */}
        <section className="page-content-section">
          <div className="page-subhead-wrap" style={{ marginBottom: "36px" }}>
            <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
              OPTICAL PRODUCTION
            </span>
            <h2 className="editorial-lead" style={{ margin: "8px 0 0 0" }}>
              Studio Stills &amp; Cinematic Reels
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
                  PHOTO GALLERY
                </span>
                <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                  Selected Commercial Shoots
                </h2>
              </div>
              <Link to="/works" search={{ category: "product-photoshoot" }} className="subpage-view-all-link">
                <span>View All Photo Works</span>
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
