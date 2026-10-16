import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Production Inquiries — SS Production House" },
      {
        name: "description",
        content:
          "Connect with SS Production House and Creative Director Yogesh Dahiya for luxury packaging design, commercial product photoshoots, brand identity, and editorial suites.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
                  Whether you need luxury packaging design, commercial product photoshoots, or a complete brand overhaul, we would love to hear your vision.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Contact Mascot" />
            </div>
          </div>
        </section>

        {/* Direct Studio Details Strip */}
        <section className="page-content-section" style={{ paddingBottom: 0 }}>
          <div className="contact-detail-items" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
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
              <a href={`tel:${portfolio.phone}`} className="contact-box-val">
                {portfolio.phone}
              </a>
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
        </section>

        {/* Meaningful Discussion Contact Section matching Image 2 */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
