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
                <div className="contact-phones-row" style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", alignItems: "center" }}>
                  {(portfolio.phones || ["+91 96714 45186", "+91 72300 17677"]).map((phone, i, arr) => (
                    <span key={phone} style={{ display: "inline-flex", alignItems: "center" }}>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="contact-box-val highlight" style={{ color: "#1C2752" }}>
                        {phone}
                      </a>
                      {i < arr.length - 1 && (
                        <span style={{ margin: "0 8px", color: "#94A3B8" }}>|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="contact-detail-box">
                <span className="contact-box-label">
                  <MapPin className="w-4 h-4 text-[#1C2752] inline mr-2" /> Studio Headquarters
                </span>
                <p className="contact-box-val">{portfolio.address || portfolio.location}</p>
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
                      <h3 className="contact-page-map-heading">SS PRODUCTION HOUSE</h3>
                      <p className="contact-page-map-sub">{portfolio.address || portfolio.location}</p>
                    </div>
                  </div>
                  <a
                    href={portfolio.googleMapsUrl || "https://www.google.com/maps/place/SS+PRODUCTION+HOUSE/@28.2119449,76.8604442,99m/data=!3m1!1e3!4m6!3m5!1s0x390d371285b76843:0x4f7956668d0651de!8m2!3d28.2119124!4d76.860826!16s%2Fg%2F11p2d4h4bp?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D"}
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
                    src="https://maps.google.com/maps?q=28.2119124,76.860826+(SS%20PRODUCTION%20HOUSE)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                    className="contact-page-map-iframe"
                    loading="lazy"
                    allowFullScreen=""
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="contact-page-map-address-banner" style={{ padding: "12px 18px", background: "#F8FAFC", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", fontSize: "12.5px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#1E293B" }}>
                    <MapPin className="w-4 h-4 text-[#1C2752] flex-shrink-0" />
                    <span>
                      <strong style={{ color: "#0F172A" }}>Address:</strong>{" "}
                      {portfolio.address || portfolio.location}
                    </span>
                  </div>
                  <a
                    href={portfolio.googleMapsUrl || "https://www.google.com/maps/place/SS+PRODUCTION+HOUSE/@28.2119449,76.8604442,99m/data=!3m1!1e3!4m6!3m5!1s0x390d371285b76843:0x4f7956668d0651de!8m2!3d28.2119124!4d76.860826!16s%2Fg%2F11p2d4h4bp?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1C2752", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
                  >
                    Open in Maps <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
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
