import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, CheckCircle2, Globe, Sparkles, Star, Building2, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";

import benetoLogo from "@/assets/beneto_logo.jpg";
import bioLeafLogo from "@/assets/bio_leaf_logo.jpg";
import meherTablewareLogo from "@/assets/meher_tbblewaer_logo.jpg";
import rTechLogo from "@/assets/r_tech_logo.jpg";
import rengoLogo from "@/assets/rengologo.png";
import sunstarLogo from "@/assets/sunstar_logo.png";
import vmSolutionsLogo from "@/assets/vmsolutiions_logo.png";
import vnAronaLogo from "@/assets/vn_arona_logo.jpg";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Our Clients & Partnerships — SS Production House" },
      { name: "description", content: "Explore our trusted client partnerships across packaging design, brand architecture, luxury dielines, and digital strategy." },
    ],
  }),
  component: ClientsPage,
});

const ALL_CLIENTS = [
  {
    id: "beneto",
    name: "Beneto",
    category: "packaging",
    categoryLabel: "Luxury Packaging",
    logo: benetoLogo,
    tagline: "Bespoke rigid luxury packaging & brand identity systems.",
    deliverables: ["Rigid Gift Cartons", "Spot UV Dielines", "Brand Guide"],
  },
  {
    id: "bio-leaf",
    name: "Bio Leaf",
    category: "packaging",
    categoryLabel: "Eco Packaging",
    logo: bioLeafLogo,
    tagline: "Eco-friendly sustainable packaging dielines & label craft.",
    deliverables: ["Kraft Box Dielines", "Label Roll Graphics", "Foil Stamping"],
  },
  {
    id: "meher",
    name: "Meher Tableware",
    category: "packaging",
    categoryLabel: "Retail Cartons",
    logo: meherTablewareLogo,
    tagline: "High-impact retail carton engineering & offset print mastery.",
    deliverables: ["Dinnerware Master Carton", "Offset Press Dieline", "Shelf Mockups"],
  },
  {
    id: "r-tech",
    name: "R-Tech Group",
    category: "branding",
    categoryLabel: "Brand Strategy",
    logo: rTechLogo,
    tagline: "Trusted for creative, branding and digital marketing solutions.",
    deliverables: ["Corporate Identity", "Signage & Billboards", "Brand Guidelines"],
  },
  {
    id: "rengo",
    name: "Rengo",
    category: "industrial",
    categoryLabel: "Industrial Packaging",
    logo: rengoLogo,
    tagline: "Industrial packaging, corrugated dielines & transport systems.",
    deliverables: ["Corrugated Shippers", "Heavy Duty Cartons", "Transport Graphics"],
  },
  {
    id: "sunstar",
    name: "Sunstar",
    category: "industrial",
    categoryLabel: "Technical Packaging",
    logo: sunstarLogo,
    tagline: "Precision technical packaging & retail shelf graphics.",
    deliverables: ["Component Packaging", "Spec Sheets", "Retail Blisters"],
  },
  {
    id: "vm-solutions",
    name: "VM Solutions",
    category: "branding",
    categoryLabel: "Digital & Corporate",
    logo: vmSolutionsLogo,
    tagline: "Digital marketing, corporate stationery & spatial brand assets.",
    deliverables: ["Corporate Stationery", "Digital Campaign Assets", "Social Media"],
  },
  {
    id: "vn-arona",
    name: "VN Arona",
    category: "cosmetics",
    categoryLabel: "Luxury Cosmetics",
    logo: vnAronaLogo,
    tagline: "Luxury cosmetic packaging dielines & Spot UV finishing.",
    deliverables: ["Serum Bottle Boxes", "Embossed Foil Dielines", "3D Staging"],
  },
  {
    id: "ias",
    name: "IAS Automation",
    category: "industrial",
    categoryLabel: "Automation Systems",
    logo: null,
    tagline: "Precision industrial robotics and automation systems packaging.",
    deliverables: ["Equipment Master Dielines", "Technical Manuals", "Safety Signage"],
  },
  {
    id: "ss-computer",
    name: "SS Computer",
    category: "industrial",
    categoryLabel: "Enterprise Tech",
    logo: null,
    tagline: "Enterprise hardware packaging, peripheral identity & manuals.",
    deliverables: ["Peripheral Carton Dielines", "User Guide Architecture", "Pre-Press"],
  },
  {
    id: "an-eng",
    name: "AN Engineering",
    category: "industrial",
    categoryLabel: "Precision Engineering",
    logo: null,
    tagline: "Heavy machine component identity & industrial specification boxes.",
    deliverables: ["Industrial Parts Carton", "Component Labels", "Technical Catalogs"],
  },
  {
    id: "sanvi-toys",
    name: "Sanvi Toys",
    category: "packaging",
    categoryLabel: "Toy & Retail Box",
    logo: null,
    tagline: "Vibrant high-contrast retail toy packaging & character dielines.",
    deliverables: ["Window Display Cartons", "Character Illustrations", "Retail Blister Cards"],
  },
  {
    id: "auto-wires",
    name: "Auto Wires",
    category: "industrial",
    categoryLabel: "Automotive Systems",
    logo: null,
    tagline: "Automotive wire harness packaging & durable inventory labels.",
    deliverables: ["Corrugated Spool Boxes", "Weatherproof Labels", "Barcode Architecture"],
  },
  {
    id: "xeon",
    name: "Xeon Technologies",
    category: "branding",
    categoryLabel: "Technology Hardware",
    logo: null,
    tagline: "Semiconductor & embedded hardware branding and anti-static packaging.",
    deliverables: ["ESD Protective Box Dielines", "Brand Identity Language", "3D Renders"],
  },
];

const CATEGORIES = [
  { key: "all", label: "All Clients" },
  { key: "packaging", label: "Packaging & Boxes" },
  { key: "branding", label: "Brand Strategy" },
  { key: "industrial", label: "Industrial & Tech" },
  { key: "cosmetics", label: "Cosmetics & Luxury" },
];

function ClientsPage() {
  const cursorRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const filteredClients =
    selectedCategory === "all"
      ? ALL_CLIENTS
      : ALL_CLIENTS.filter((c) => c.category === selectedCategory);

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
                  We partner with innovative startups, industrial pioneers, luxury maisons, and consumer brands across India and worldwide to build memorable packaging, commanding identities, and end-to-end production runs.
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
            <p className="section-sub-lead" style={{ maxWidth: "640px", color: "var(--color-muted)", marginTop: "12px" }}>
              Explore the diverse roster of businesses that count on SS Production House for structural packaging, vector dielines, and enduring brand identity.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="clients-filter-bar" style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "24px 0 36px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`clients-filter-btn ${selectedCategory === cat.key ? "is-active" : ""}`}
                style={{
                  padding: "9px 20px",
                  borderRadius: "9999px",
                  border: selectedCategory === cat.key ? "1.5px solid #1C2752" : "1px solid rgba(0,0,0,0.12)",
                  background: selectedCategory === cat.key ? "#1C2752" : "#FFFFFF",
                  color: selectedCategory === cat.key ? "#FFFFFF" : "#0F172A",
                  font: "700 13px/1 var(--font-sans)",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedCategory === cat.key ? "0 4px 14px rgba(28,39,82,0.22)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Client Cards Grid */}
          <div className="client-logos-showcase-grid">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className={`client-showcase-card ${client.logo ? "has-logo" : "is-text-only"}`}
                title={client.name}
              >
                <div className="client-showcase-body">
                  {client.logo ? (
                    <div className="client-showcase-logo-wrap">
                      <img
                        src={client.logo}
                        alt={`${client.name} Logo`}
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
              </div>
            ))}
          </div>
        </section>

        {/* In-depth Testimonials Grid */}
        <section className="page-content-section alt-bg">
          <div className="section-intro">
            <p className="section-index"><span>03</span> Words From Founders &amp; Directors</p>
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

        {/* Meaningful Contact Form Section */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
