import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

export default function ServicesPage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main">
        {/* Page Hero */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span> <TextReveal triggerOnMount delay={0.06}>Comprehensive Studio Services</TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Ways to make
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    something distinct.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  From individual luxury packaging and high-speed bottle photography to complete brand design ecosystems, we deliver tailored end-to-end creative production engineered with obsessive precision.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Services Mascot" />
            </div>
          </div>
        </section>

        {/* Detailed Service Cards Grid */}
        <section className="page-content-section">
          <div className="services-grid-cards">
            {portfolio.services.map((service) => (
              <div key={service.id} className="service-detail-card card-3d">
                {service.image && (
                  <div
                    className="service-card-bg-layer"
                    style={{ backgroundImage: `url(${service.image})` }}
                    aria-hidden="true"
                  />
                )}
                <div className="service-card-overlay" aria-hidden="true" />
                <div className="service-card-inner-content">
                  <div className="service-card-top">
                    <span className="service-card-num">{service.id}</span>
                    <Link to="/contact" className="service-inquire-link" aria-label={`Inquire about ${service.title}`}>
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <h2 className="service-card-title">{service.title}</h2>
                  <p className="service-card-desc">{service.desc}</p>
                  <div className="service-features-list">
                    <span className="features-label">Deliverables & Specs</span>
                    <ul>
                      {service.features.map((feat, i) => (
                        <li key={i}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meaningful Contact Form Section */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
