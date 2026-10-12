import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Production Inquiries — SS Production House" },
      { name: "description", content: "Contact SS Production House to book commercial production, packaging design, product photoshoots, brand identity, and visiting card suites." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Packaging Design",
    budget: "$5,000 - $15,000",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main">
        {/* Page Hero Header - 3D Backdrop & Mascot Matching Profile Page */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span> <TextReveal triggerOnMount delay={0.06}>Production Inquiries</TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Have a production
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    in mind?
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  Whether you need luxury packaging design, editorial lookbooks, a commercial product shoot, or a complete brand overhaul, we would love to hear your vision.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Contact Mascot" />
            </div>
          </div>
        </section>

        {/* Contact Layout Grid: Info + Form */}
        <section className="page-content-section">
          <div className="contact-page-layout">
            {/* Direct Studio Details */}
            <div className="contact-info-panel">
              <div className="contact-status-card">
                <div className="status-indicator">
                  <span className="status-ping" />
                  <span className="status-dot" />
                </div>
                <div>
                  <strong>Studio Production Status</strong>
                  <p>Currently onboarding Q1 & Q2 campaign briefs.</p>
                </div>
              </div>

              <div className="contact-detail-items">
                <div className="contact-detail-box">
                  <span className="contact-box-label">
                    <Mail className="w-4 h-4 text-accent inline mr-2" /> Direct Email
                  </span>
                  <a href={`mailto:${portfolio.email}`} className="contact-box-val highlight">
                    {portfolio.email}
                  </a>
                </div>

                <div className="contact-detail-box">
                  <span className="contact-box-label">
                    <Phone className="w-4 h-4 text-accent inline mr-2" /> Studio Telephone
                  </span>
                  <a href={`tel:${portfolio.phone}`} className="contact-box-val">
                    {portfolio.phone}
                  </a>
                </div>

                <div className="contact-detail-box">
                  <span className="contact-box-label">
                    <MapPin className="w-4 h-4 text-accent inline mr-2" /> Studio Headquarters
                  </span>
                  <p className="contact-box-val">{portfolio.location}</p>
                </div>

                <div className="contact-detail-box">
                  <span className="contact-box-label">
                    <Clock className="w-4 h-4 text-accent inline mr-2" /> Working Hours & Response
                  </span>
                  <p className="contact-box-val">Mon — Fri: 09:00 - 19:00 IST · Typical response in &lt; 24h</p>
                </div>
              </div>

              <div className="contact-socials-card">
                <span className="socials-card-title">Follow Studio Operations</span>
                <div className="contact-social-links">
                  {["Instagram", "Vimeo", "Behance", "LinkedIn"].map((net) => (
                    <a key={net} href="#contact" className="social-pill-link">
                      <span>{net}</span>
                      <ArrowUpRight className="w-3 h-3 text-accent" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Production Inquiry Form */}
            <div className="contact-form-panel">
              {isSubmitted ? (
                <div className="form-success-card">
                  <div className="success-icon-wrap">
                    <Check className="w-8 h-8 text-accent" />
                  </div>
                  <h2>Brief Received with Thanks!</h2>
                  <p>
                    Thank you for reaching out to SS Production House. Our executive producer will review your requirements and respond with initial thoughts and next steps within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="start-link"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form">
                  <h2 className="form-heading">Submit Project Brief</h2>
                  <p className="form-subheading">Fill in the details below to initiate discovery.</p>

                  <div className="form-fields-grid">
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. Avery Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="avery@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="company">Company / Brand</label>
                      <input
                        id="company"
                        type="text"
                        placeholder="e.g. Aura Botanicals"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">Primary Creative Discipline</label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="Packaging Design">Packaging Design</option>
                        <option value="Catalogue Design">Catalogue Design</option>
                        <option value="Book Design">Book Design</option>
                        <option value="Label Design">Label Design</option>
                        <option value="Logo Identity">Logo Design</option>
                        <option value="Meter Design">Meter Design</option>
                        <option value="Product Photoshoot">Product Photoshoot</option>
                        <option value="Post Design">Post Design</option>
                        <option value="Visiting Card Design">Visiting Card Design</option>
                        <option value="Complete Production Package">Complete Production Package</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="budget">Estimated Production Budget</label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="Under $5,000">Under $5,000</option>
                        <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                        <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                        <option value="$35,000+">$35,000+ (Comprehensive Campaign)</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="message">Project Scope & Narrative *</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Tell us about your brand vision, target timeline, deliverables, and any specific aesthetic benchmarks..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <span>Send Production Brief</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
