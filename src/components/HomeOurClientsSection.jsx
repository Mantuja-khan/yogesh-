import { useState } from "react";
import benetoLogo from "@/assets/beneto_logo.jpg";
import bioLeafLogo from "@/assets/bio_leaf_logo.jpg";
import meherTablewareLogo from "@/assets/meher_tbblewaer_logo.jpg";
import rTechLogo from "@/assets/r_tech_logo.jpg";
import rengoLogo from "@/assets/rengologo.png";
import sunstarLogo from "@/assets/sunstar_logo.png";
import vmSolutionsLogo from "@/assets/vmsolutiions_logo.png";
import vnAronaLogo from "@/assets/vn_arona_logo.jpg";

const HOME_CLIENTS = [
  {
    id: "beneto",
    name: "Beneto",
    logo: benetoLogo,
    hoverText: "Bespoke rigid luxury packaging & brand identity systems.",
  },
  {
    id: "bio-leaf",
    name: "Bio Leaf",
    logo: bioLeafLogo,
    hoverText: "Eco-friendly sustainable packaging dielines & label craft.",
  },
  {
    id: "meher",
    name: "Meher Tableware",
    logo: meherTablewareLogo,
    hoverText: "High-impact retail carton engineering & offset print mastery.",
  },
  {
    id: "r-tech",
    name: "R-Tech Group",
    logo: rTechLogo,
    hoverText: "Trusted for creative, branding and digital marketing solutions.",
  },
  {
    id: "rengo",
    name: "Rengo",
    logo: rengoLogo,
    hoverText: "Industrial packaging, corrugated dielines & transport systems.",
  },
  {
    id: "sunstar",
    name: "Sunstar",
    logo: sunstarLogo,
    hoverText: "Precision technical packaging & retail shelf graphics.",
  },
  {
    id: "vm-solutions",
    name: "VM Solutions",
    logo: vmSolutionsLogo,
    hoverText: "Digital marketing, corporate stationery & spatial brand assets.",
  },
  {
    id: "vn-arona",
    name: "VN Arona",
    logo: vnAronaLogo,
    hoverText: "Luxury cosmetic packaging dielines & Spot UV finishing.",
  },
];

export function HomeOurClientsSection() {
  const [activeCardId, setActiveCardId] = useState(null);

  return (
    <section className="home-clients-dark-section" aria-label="Our Clients">
      <div className="home-clients-container">
        {/* Header matching reference image */}
        <div className="home-clients-header">
          <span className="home-clients-eyebrow">CLIENTS</span>
          <h2 className="home-clients-title">OUR CLIENTS</h2>
          <p className="home-clients-sub">
            Brands that trust us with their creative, packaging and marketing work.
          </p>
        </div>

        {/* 4x2 Chamfered Cards Grid */}
        <div className="home-clients-chamfer-grid">
          {HOME_CLIENTS.map((client) => {
            const isBlue = activeCardId === client.id;
            return (
              <div
                key={client.id}
                className={`home-clients-chamfer-card ${isBlue ? "is-active" : ""}`}
                onMouseEnter={() => setActiveCardId(client.id)}
                onMouseLeave={() => setActiveCardId(null)}
                onClick={() =>
                  setActiveCardId((prev) => (prev === client.id ? null : client.id))
                }
                role="button"
                tabIndex={0}
                aria-label={`${client.name} - ${client.hoverText}`}
              >
                {/* Default State: Clean White Background with crisp logo */}
                <div className="chamfer-card-face chamfer-card-front">
                  <img
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    className={`chamfer-client-logo-img client-logo-${client.id}`}
                    loading="lazy"
                  />
                </div>

                {/* Hover/Active State: Royal Blue Background with white descriptive text */}
                <div className="chamfer-card-face chamfer-card-back">
                  <p className="chamfer-hover-content">{client.hoverText}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note matching reference image */}
        <p className="home-clients-bottom-note">
          Placeholders. Add the logos of clients you have permission to show.
        </p>
      </div>
    </section>
  );
}
