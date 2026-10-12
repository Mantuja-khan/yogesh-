import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Award, Camera, CheckCircle2, Compass, Eye, Film, Layers, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import missionBg from "@/assets/mission-bg.jpg";
import visionBg from "@/assets/vision-bg.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Designer Profile — SS Production House" },
      { name: "description", content: "Learn about SS Production House: graphic design philosophy, brand systems, 3D mockups, and tactile craft." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
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
        {/* Page Hero Header */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span> <TextReveal triggerOnMount delay={0.06}>Designer Profile &amp; Philosophy</TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Ideas with instinct.
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Form with intent.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  SS Production House is an independent graphic design studio led by Yogesh Dahiya. We craft distinctive identities, spatial mockups, high-contrast stills, and bespoke packaging for visionary brands across the globe.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Profile Mascot" />
            </div>
          </div>
        </section>

        {/* Studio Media & Story Spotlight */}
        <section className="profile-media-section">
          <div className="profile-story-image-row">
            <div className="profile-story-col">
              <div className="section-intro" style={{ marginBottom: "20px" }}>
                <p className="section-index"><span>02</span> <TextReveal delay={0.05}>Spatial Design Rig</TextReveal></p>
                <h2>
                  <TextReveal delay={0.12} stagger={0.045}>
                    Obsessive Craft &amp; Tactile Heritage.
                  </TextReveal>
                </h2>
              </div>
              <p className="profile-lead-statement">
                <TextReveal delay={0.22} stagger={0.016}>
                  We believe brand packaging is the ultimate tactile manifestation of brand prestige. From mathematical dielines to rich color separation, our studio merges traditional printmaking precision with modern 3D spatial environments.
                </TextReveal>
              </p>
            </div>
            <div className="profile-image-col">
              <div className="profile-studio-image-frame card-3d">
                <img
                  src={portfolio.profileGraphic}
                  alt="SS Production House Graphic Design Studio Showcase"
                  className="profile-studio-img"
                  loading="lazy"
                />
                <div className="profile-image-overlay" />

              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="page-content-section">
          <div className="section-intro">
            <p className="section-index"><span>03</span> <TextReveal delay={0.05}>Guiding Compass</TextReveal></p>
            <h2>
              <TextReveal delay={0.12} stagger={0.045}>
                Our Mission &amp; Future Vision.
              </TextReveal>
            </h2>
          </div>

          <div className="profile-mission-vision-wrap">
            <div className="mission-vision-grid">
              <div
                className="mission-vision-card mission-card"
                style={{ "--card-bg": `url(${missionBg})` }}
              >
                <div className="mission-card-top">
                  <div className="mission-icon-box">
                    <Compass className="w-5 h-5 text-accent" />
                  </div>
                  <span className="mission-card-index">01</span>
                </div>
                <h3 className="mission-card-title">Our Mission</h3>
                <p className="mission-card-desc">
                  To empower ambitious and luxury brands by engineering tactile packaging dielines, commanding typography, and cinematic visual assets that transform consumer perception and build enduring commercial value.
                </p>
                <div className="mission-card-points">
                  <span className="mission-point-item"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Flawless Production Dielines</span>
                  <span className="mission-point-item"><CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Obsessive Print &amp; Material Craft</span>
                </div>
              </div>

              <div
                className="mission-vision-card vision-card"
                style={{ "--card-bg": `url(${visionBg})` }}
              >
                <div className="mission-card-top">
                  <div className="mission-icon-box">
                    <Eye className="w-5 h-5 text-accent" />
                  </div>
                  <span className="mission-card-index">02</span>
                </div>
                <h3 className="mission-card-title">Our Vision</h3>
                <p className="mission-card-desc">
                  To establish the global benchmark for spatial graphic design—where physical craftsmanship, hyper-realistic 3D mockups, and timeless editorial systems converge into unforgettable brand experiences.
                </p>
                <div className="mission-card-points">
                  <span className="mission-point-item"><Sparkles className="w-3.5 h-3.5 text-accent" /> Timeless Visual Identity Systems</span>
                  <span className="mission-point-item"><Sparkles className="w-3.5 h-3.5 text-accent" /> Spatial 3D Form &amp; Material Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Philosophy & Pillars */}
        <section className="page-content-section alt-bg">
          <div className="section-intro">
            <p className="section-index"><span>04</span> Our Creative Pillars</p>
            <h2>Uncompromising <em>Craftsmanship.</em></h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon"><Film className="w-6 h-6 text-accent" /></div>
              <h3>Cinematic Storytelling</h3>
              <p>We approach every brand like a feature film: defining emotional tension, light temperature, pacing, and visual subtext that mesmerizes audiences.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><Layers className="w-6 h-6 text-accent" /></div>
              <h3>Tactile Packaging Mastery</h3>
              <p>From rigid luxury boxes to metallic foil seals, we engineer packaging that commands respect on retail shelves and creates unboxing euphoria.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><Camera className="w-6 h-6 text-accent" /></div>
              <h3>Sculptural Product Photography</h3>
              <p>We treat physical objects as sculptures in space—manipulating caustic reflections, macro textures, and deep shadows for visceral allure.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><Sparkles className="w-6 h-6 text-accent" /></div>
              <h3>Bespoke Identity Systems</h3>
              <p>We don&apos;t follow fleeting trends. We build identity languages, gauge typography, and stationery systems engineered to endure for decades.</p>
            </div>
          </div>
        </section>

        {/* Disciplines & Production Systems */}


        {/* Studio Numbers & Metrics */}

        {/* CTA Banner */}
      </main>

      <SiteFooter />
    </div>
  );
}
