import { useState } from "react";
import { X } from "lucide-react";

// Website Assets
import website1 from "@/assets/websites/website1.png";
import website2 from "@/assets/websites/website2.png";
import website3 from "@/assets/websites/website3.png";
import website4 from "@/assets/websites/website4.png";

// Catalogue Assets (8 items: 4 per line)
import catalogue1 from "@/assets/catalogue/catalogue1.png";
import catalogue2 from "@/assets/catalogue/catalogue2.png";
import catalogue3 from "@/assets/catalogue/catalogue3.png";
import catalogue4 from "@/assets/cateloguedeisgn.png";
import catalogue5 from "@/assets/Book Design/Book Mockup copy.png";
import catalogue6 from "@/assets/Book Design/BEYOND.png";
import catalogue7 from "@/assets/Book Design/Ambedkar Islam.png";
import catalogue8 from "@/assets/Book Design/MAHABHARAT.png";

// Box Design Assets (8 items: 4 per line)
import box1 from "@/assets/Box Design/boxdesign1.png";
import box2 from "@/assets/Box Design/boxdesign2.png";
import box3 from "@/assets/Box Design/boxdesign3.png";
import box4 from "@/assets/Box Design/boxdesign4.png";
import box5 from "@/assets/Box Design/boxdesign5.png";
import box6 from "@/assets/Box Design/boxdesign6.png";
import box7 from "@/assets/Box Design/boxdesign7.png";
import box8 from "@/assets/Box Design/boxdesign8.png";

// Photo Shoot Assets (8 items: 4 per line)
import photo1 from "@/assets/Photoshot/photoshot1.png";
import photo2 from "@/assets/Photoshot/photoshot2.png";
import photo3 from "@/assets/Photoshot/photoshot3.png";
import photo4 from "@/assets/Photoshot/photoshot4.png";
import photo5 from "@/assets/Photoshot/photoshot5.png";
import photo6 from "@/assets/Photoshot/photoshot6.png";
import photo7 from "@/assets/Photoshot/photoshot7.png";
import photo8 from "@/assets/Photoshot/photoshot8.png";

export function HomeCategoryShowcaseSection() {
  const [activeTab, setActiveTab] = useState("catalogs");
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = [
    { id: "catalogs", label: "Catalogs" },
    { id: "websites", label: "Websites" },
    { id: "box-design", label: "Box Design" },
    { id: "photo-shot", label: "Photo shot" },
  ];

  const showcaseData = {
    catalogs: [
      { id: "cat-1", title: "Corporate Luxury Catalogue 01", image: catalogue1 },
      { id: "cat-2", title: "Master Product Portfolio Catalogue 02", image: catalogue2 },
      { id: "cat-3", title: "Architectural Surface Catalogue 03", image: catalogue3 },
      { id: "cat-4", title: "Commercial Editorial Catalogue 04", image: catalogue4 },
      { id: "cat-5", title: "Deluxe Hardcover Publication 05", image: catalogue5 },
      { id: "cat-6", title: "Editorial Lookbook Monograph 06", image: catalogue6 },
      { id: "cat-7", title: "Historical Editorial Edition 07", image: catalogue7 },
      { id: "cat-8", title: "Master Cultural Anthology 08", image: catalogue8 },
    ],

    websites: [
      { id: "web-1", title: "Luxury Sanitaryware & Living", image: website1 },
      { id: "web-2", title: "Sun Star Packaging & Logistics", image: website2 },
      { id: "web-3", title: "Precision CNC & Industrial Machinery", image: website3 },
      { id: "web-4", title: "Global Technical Industrial Flagship", image: website4 },
    ],

    "box-design": [
      { id: "box-1", title: "Luxury SBS Architectural Box 01", image: box1 },
      { id: "box-2", title: "Rigid Presentation Packaging Box 02", image: box2 },
      { id: "box-3", title: "Premium Retail Folding Carton 03", image: box3 },
      { id: "box-4", title: "Custom Structural Product Box 04", image: box4 },
      { id: "box-5", title: "Master Brand Velvet Presentation Box 05", image: box5 },
      { id: "box-6", title: "Structural Magnetic Rigid Box 06", image: box6 },
      { id: "box-7", title: "Luxury Cosmetic Skincare Box 07", image: box7 },
      { id: "box-8", title: "Tactile Shoulder-Neck Gift Box 08", image: box8 },
    ],

    "photo-shot": [
      { id: "photo-1", title: "Commercial Product Shoot Still 01", image: photo1 },
      { id: "photo-2", title: "Industrial Hardware Product Shoot 02", image: photo2 },
      { id: "photo-3", title: "Tactile Consumer Goods Still 03", image: photo3 },
      { id: "photo-4", title: "Luxury Cosmetic Bottle Studio Still 04", image: photo4 },
      { id: "photo-5", title: "Precision Studio Product Still 05", image: photo5 },
      { id: "photo-6", title: "Mechanical Equipment Still 06", image: photo6 },
      { id: "photo-7", title: "Studio Glass Refraction Still 07", image: photo7 },
      { id: "photo-8", title: "High-End Cosmetic Bottle Still 08", image: photo8 },
    ],
  };

  const currentItems =
    activeTab === "websites"
      ? (showcaseData.websites || []).slice(0, 3)
      : (showcaseData[activeTab] || []).slice(0, 8);

  return (
    <section className="home-category-showcase-section" aria-label="Specialized Category Showcase">
      <div className="home-category-showcase-container">
        {/* Section Header */}
        <div className="home-category-showcase-header">
          <p className="home-category-eyebrow">CURATED SPECIALIZATIONS</p>
          <h2 className="two-tone-pill-heading" style={{ marginBottom: "12px", justifyContent: "center" }}>
            <span className="pill-prefix">FEATURED</span>
            <span className="pill-suffix">DISCIPLINES</span>
          </h2>
          <p className="home-category-subtitle">
            Explore curated work across our print catalogues, responsive websites, bespoke box packaging, and studio product photography.
          </p>

          {/* 4 Interactive Buttons on Top */}
          <div className="home-category-tabs-bar" role="tablist" aria-label="Showcase Categories">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`home-category-tab-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Items Stage */}
        <div className="home-category-content-stage">
          {activeTab === "websites" ? (
            /* Pure Image Scroll-on-Hover View for 3 Websites - All Content Removed */
            <div className="home-website-showcase-grid">
              {currentItems.map((site) => (
                <div
                  key={site.id}
                  className="website-showcase-window"
                  onClick={() => setSelectedItem(site)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedItem(site);
                  }}
                  aria-label="Website preview"
                >
                  {/* Scrollable Viewport: shows ~20% height, scrolls down on hover, returns on leave */}
                  <div className="website-scroll-viewport">
                    <img
                      src={site.image}
                      alt={site.title || "Website design preview"}
                      className="website-scroll-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Pure Image Grid for Catalogs, Label Design, and Photo Shot - All Text Removed */
            <div className="home-category-clean-grid">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="home-category-clean-card"
                  onClick={() => setSelectedItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedItem(item);
                  }}
                  aria-label="Showcase item"
                >
                  <div className="home-clean-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title || "Showcase work"}
                      className="home-clean-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Full View - Pure Image Only */}
      {selectedItem && (
        <div className="playbook-modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="playbook-modal-box playbook-modal-image-only" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="playbook-modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="playbook-modal-img-only-wrap">
              <img
                src={selectedItem.image}
                alt="Full Preview"
                className="playbook-modal-pure-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
