import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Layout, Smartphone, MousePointer, Eye, Layers, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export const Route = createFileRoute("/ui-ux-design")({
  head: () => ({
    meta: [
      { title: "UI/UX Design Studio & Digital Products — SS Production House" },
      {
        name: "description",
        content:
          "Modern UI/UX design, mobile app interfaces, web application dashboards, design systems, and user journey mapping by SS Production House.",
      },
    ],
  }),
  component: UiUxDesignPage,
});

export default function UiUxDesignPage() {
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
      icon: Smartphone,
      title: "Mobile App Interface Design (iOS & Android)",
      desc: "Pixel-perfect mobile application flows, touch ergonomics, micro-interactions, and responsive component libraries.",
    },
    {
      icon: Layout,
      title: "Enterprise Web App Dashboards & Portals",
      desc: "Information architecture for data-dense dashboards, analytics screens, SaaS workflows, and multi-tenant admin consoles.",
    },
    {
      icon: Layers,
      title: "Scalable Design Systems & Figma Tokens",
      desc: "Tokenized UI kits with atomic design components, accessible color palettes (WCAG AAA), and auto-layout states ready for developers.",
    },
    {
      icon: MousePointer,
      title: "Interactive Clickable Prototyping",
      desc: "High-fidelity animated prototypes simulating real user flows, page transitions, and gestures for stakeholder validation and testing.",
    },
    {
      icon: Eye,
      title: "User Journey & Experience Audits",
      desc: "Heuristic evaluation, user drop-off diagnosis, wireframe mapping, and friction-free checkout/onboarding funnel optimization.",
    },
    {
      icon: CheckCircle2,
      title: "Developer Handoff & Asset Production",
      desc: "Clean Figma spec exports with vector SVG iconography, responsive CSS tokens, and interaction behavior documentation.",
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
                  Digital Products &amp; Interfaces
                </TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  UI/UX Design
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Intuitive, Elegant &amp; Effortless.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  We architect digital interfaces that balance visual sophistication with razor-sharp usability. From iOS and Android mobile experiences to enterprise SaaS portals, our UI/UX design turns complex systems into delight.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="UI/UX Mascot" />
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="page-content-section">
          <div className="page-subhead-wrap" style={{ marginBottom: "36px" }}>
            <span className="editorial-kicker" style={{ color: "#1C2752", fontWeight: "700" }}>
              DIGITAL CRAFT
            </span>
            <h2 className="editorial-lead" style={{ margin: "8px 0 0 0" }}>
              Experience Architecture &amp; Interface Engineering
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
                  DIGITAL PORTFOLIO
                </span>
                <h2 className="editorial-lead" style={{ margin: "6px 0 0 0" }}>
                  Selected Digital Product Work
                </h2>
              </div>
              <Link to="/works" className="subpage-view-all-link">
                <span>View Full Works Reel</span>
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
