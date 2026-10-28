import { Clock, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";

export default function ContactPage() {
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
        {/* Page Hero Header - 3D Backdrop & Mascot */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">

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
                  Whether you need luxury packaging design, commercial product photoshoots, or a complete brand overhaul, we would love to hear your vision.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Contact Mascot" />
            </div>
          </div>
        </section>

        {/* Direct Studio Details & Map Section */}
        <section className="page-content-section contact-info-map-section" style={{ paddingBottom: 0 }}>
          <div className="contact-info-map-grid">
            {/* Left Column: Direct Studio Details (Email, Phone, Headquarters, Hours) */}
            <div className="contact-detail-items-col">
              <div className="contact-detail-box">
                <span className="contact-box-label">
                  <Mail className="w-4 h-4 text-[#1C2752] inline mr-2" /> Direct Email
                </span>
                <a href={`mailto:${portfolio.email}`} className="contact-box-val highlight" style={{ color: "#1C2752" }}>
                  {portfolio.email}
                </a>
              </div>

              <div className="contact-detail-box">
                <span className="contact-box-label">
                  <Phone className="w-4 h-4 text-[#1C2752] inline mr-2" /> Studio Telephone
                </span>
                <div className="contact-phones-row">
                  <a href={`tel:${portfolio.phone}`} className="contact-box-val">
                    {portfolio.phone}
                  </a>
                  <span className="phone-sep" style={{ margin: "0 8px", color: "rgba(0,0,0,0.3)" }}>|</span>
                  <a href="tel:+919899977006" className="contact-box-val">
                    +91 98999 77006
                  </a>
                </div>
              </div>

              <div className="contact-detail-box">
                <span className="contact-box-label">
                  <MapPin className="w-4 h-4 text-[#1C2752] inline mr-2" /> Studio Headquarters
                </span>
                <p className="contact-box-val">{portfolio.location}</p>
              </div>

              <div className="contact-detail-box">
                <span className="contact-box-label">
                  <Clock className="w-4 h-4 text-[#1C2752] inline mr-2" /> Working Hours &amp; Response
                </span>
                <p className="contact-box-val">Mon — Fri: 09:00 - 19:00 IST · Typical response in &lt; 24h</p>
              </div>
            </div>

            {/* Right Column: Studio Map Section */}
            <div className="contact-map-col">
              <div className="contact-page-map-card">
                <div className="contact-page-map-header">
                  <div className="contact-page-map-status">
                    <span className="contact-page-map-dot" />
                    <div>
                      <h3 className="contact-page-map-heading">Our Studio on Google Maps</h3>
                      <p className="contact-page-map-sub">{portfolio.location}</p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Capital+Highstreet+Phoolbagh+Bhiwadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-page-directions-btn"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="contact-page-map-frame-wrapper">
                  <iframe
                    title="SS Production House Google Map"
                    src="https://maps.google.com/maps?q=Capital%20Highstreet%2C%20Phoolbagh%2C%20Bhiwadi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="contact-page-map-iframe"
                    loading="lazy"
                    allowFullScreen=""
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meaningful Discussion Contact Section matching Image 2 */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
