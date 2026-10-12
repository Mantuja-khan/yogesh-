import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Globe, Quote, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Our Clients & Testimonials — SS Production House" },
      { name: "description", content: "Discover client stories, testimonials, and global brand partnerships built with SS Production House." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
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
                <span>01</span> <TextReveal triggerOnMount delay={0.06}>Trusted Collaborations</TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Built through trust
                </TextReveal>
                <br />
                <TextReveal triggerOnMount delay={0.3} stagger={0.06}>
                  and
                </TextReveal>{" "}
                <em>
                  <TextReveal triggerOnMount delay={0.36} stagger={0.06}>
                    close collaboration.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.5} stagger={0.016}>
                  We partner with innovative startups, luxury maisons, publishing houses, and industrial pioneers worldwide to build memorable packaging, visual identities, and campaign films.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Clients Mascot" />
            </div>
          </div>
        </section>

        {/* Client Partner Brands Grid */}
        <section className="page-content-section">
          <div className="section-intro">
            <p className="section-index"><span>02</span> Client Partnerships</p>
            <h2>Trusted by Pioneering Brands &amp;<br /><em>Industry Leaders.</em></h2>
          </div>

          <div className="client-logos-showcase-grid">
            {portfolio.clientLogos.map((client, idx) => (
              <div key={client.name} className={`client-showcase-card ${client.logo ? "has-logo" : "is-text-only"}`}>
                <div className="client-showcase-top">
                  <span className="client-showcase-num">0{idx + 1}</span>
                </div>

                <div className="client-showcase-body">
                  {client.logo ? (
                    <div className="client-showcase-logo-wrap">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="client-showcase-img"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="client-showcase-text-wrap">
                      <span className="client-showcase-monogram">
                        {client.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                      </span>
                      <span className="client-showcase-text-title">{client.name}</span>
                    </div>
                  )}
                </div>

                <div className="client-showcase-bottom">
                  <h3 className="client-showcase-name">{client.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* In-depth Testimonials Grid */}
        <section className="page-content-section alt-bg">
          <div className="section-intro">
            <p className="section-index"><span>03</span> Words From Founders & Directors</p>
            <h2>Endorsements from<br /><em>Our Partners.</em></h2>
          </div>

          <div className="client-testimonials-detailed-grid">
            {portfolio.testimonials.map((t, idx) => (
              <figure key={t.name} className="client-testimonial-card">
                <div className="testimonial-card-top">
                  <div className="star-rating">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="testimonial-index">0{idx + 1}</span>
                </div>

                <blockquote className="testimonial-quote">
                  “{t.quote}”
                </blockquote>

                <figcaption className="testimonial-author">
                  <div className="author-details">
                    <strong className="author-name">{t.name}</strong>
                    <span className="author-role">{t.role}</span>
                    <span className="author-location">
                      <Globe className="w-3 h-3 inline mr-1 text-accent" />
                      {t.location}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Trust Stats & Guarantee */}
        {/* <section className="page-content-section">
          <div className="section-intro">
            <p className="section-index"><span>04</span> Studio Reliability</p>
            <h2>Our Standards &<br /><em>Commitment.</em></h2>
          </div>

          <div className="trust-pillars-grid">
            <div className="trust-card">
              <div className="trust-number">100%</div>
              <h3>On-Time Delivery Rate</h3>
              <p>Every commercial deadline, print press check, and product launch calendar is maintained with rigorous project management.</p>
            </div>
            <div className="trust-card">
              <div className="trust-number">50+</div>
              <h3>Worldwide Brand Partners</h3>
              <p>Trusted across North America, Europe, the Middle East, and Asia-Pacific for precision design and cinematography.</p>
            </div>
            <div className="trust-card">
              <div className="trust-number">150+</div>
              <h3>Master Deliverables</h3>
              <p>From complex multi-foil dielines to cinematic 4K commercial reels, we produce uncompromising excellence.</p>
            </div>
          </div>
        </section> */}

        {/* Bottom CTA */}
        {/* <section className="page-cta-section">
          <div className="page-cta-inner">
            <p className="section-index"><span>05</span> Join Our Partners</p>
            <h2>Ready to elevate your <em>brand presence?</em></h2>
            <div className="cta-action-row">
              <Link to="/contact" className="start-link">
                <span>Start a Project Today</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section> */}
      </main>

      <SiteFooter />
    </div>
  );
}
