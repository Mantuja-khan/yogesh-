import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, Check, Eye, X, ZoomIn } from "lucide-react";
import { portfolio } from "@/lib/portfolioData";

// Complete category buttons matching Image 2 and website works
export const PLAYBOOK_CATEGORIES = [
  { id: "all", label: "ALL WORKS" },
  { id: "marketing-collateral", label: "MARKETING COLLATERAL" },
  { id: "publication", label: "PUBLICATION" },
  { id: "packaging", label: "PACKAGING" },
  { id: "logo-design", label: "LOGO" },
  { id: "box-design", label: "BOX DESIGN" },
  { id: "book-design", label: "BOOK DESIGN" },
  { id: "label-design", label: "LABLE" },
  { id: "meter-design", label: "METER DESIGN" },
  { id: "mockup", label: "MOCHUP" },
  { id: "product-photoshoot", label: "PRODUCT PHOTOSHOOT" },
  { id: "post-design", label: "SOCIAL MEDIA POST" },
  { id: "visiting-card-design", label: "VISITING CARD" },
  { id: "invitation", label: "INVITATION" },
];

export function PlaybookWorksSection({ initialCategory = "all", onCategoryChange = null }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Close modal on Escape key press and lock background scroll
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  // Listen for category selection events from the navbar mega menu
  useEffect(() => {
    const handleCategoryEvent = (e) => {
      const cat = e.detail?.category;
      if (cat) {
        setActiveCategory(cat);
      }
    };
    window.addEventListener("ss_select_work_category", handleCategoryEvent);
    return () => window.removeEventListener("ss_select_work_category", handleCategoryEvent);
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveCategory(tabId);
    if (onCategoryChange) {
      onCategoryChange(tabId);
    }
  };

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    const all = portfolio.projects || [];
    if (!activeCategory || activeCategory === "all") {
      return all;
    }

    if (activeCategory === "book-design") {
      return all.filter(
        (p) =>
          p.categoryKey === "book-design" ||
          p.category?.toLowerCase().includes("book") ||
          p.title?.toLowerCase().includes("book")
      );
    }

    if (activeCategory === "box-design" || activeCategory === "packaging") {
      return all.filter(
        (p) =>
          p.categoryKey === "box-design" ||
          p.categoryKey === "packaging" ||
          p.category?.toLowerCase().includes("box") ||
          p.category?.toLowerCase().includes("packaging")
      );
    }

    if (activeCategory === "label-design") {
      return all.filter(
        (p) =>
          p.categoryKey === "label-design" ||
          p.category?.toLowerCase().includes("label") ||
          p.category?.toLowerCase().includes("lable")
      );
    }

    if (activeCategory === "logo-design" || activeCategory === "logo") {
      return all.filter(
        (p) =>
          p.categoryKey === "logo-design" ||
          p.categoryKey === "logo" ||
          p.category?.toLowerCase().includes("logo") ||
          p.category?.toLowerCase().includes("identity")
      );
    }

    if (activeCategory === "meter-design") {
      return all.filter(
        (p) =>
          p.categoryKey === "meter-design" ||
          p.category?.toLowerCase().includes("meter") ||
          p.category?.toLowerCase().includes("dial")
      );
    }

    if (activeCategory === "mockup") {
      return all.filter(
        (p) =>
          p.categoryKey === "mockup" ||
          p.category?.toLowerCase().includes("mockup") ||
          p.category?.toLowerCase().includes("mochup") ||
          p.id?.toLowerCase().includes("mockup")
      );
    }

    if (activeCategory === "product-photoshoot" || activeCategory === "photoshoot") {
      return all.filter(
        (p) =>
          p.categoryKey === "product-photoshoot" ||
          p.categoryKey === "photoshoot" ||
          p.category?.toLowerCase().includes("photo") ||
          p.category?.toLowerCase().includes("shoot")
      );
    }

    if (activeCategory === "post-design") {
      return all.filter(
        (p) =>
          p.categoryKey === "post-design" ||
          p.category?.toLowerCase().includes("post") ||
          p.category?.toLowerCase().includes("social")
      );
    }

    if (activeCategory === "visiting-card-design") {
      return all.filter(
        (p) =>
          p.categoryKey === "visiting-card-design" ||
          p.category?.toLowerCase().includes("visiting") ||
          p.category?.toLowerCase().includes("card")
      );
    }

    if (activeCategory === "invitation") {
      return all.filter(
        (p) =>
          p.categoryKey === "invitation" ||
          p.category?.toLowerCase().includes("invitation")
      );
    }

    if (activeCategory === "publication") {
      return all.filter(
        (p) =>
          p.categoryKey === "book-design" ||
          p.categoryKey === "catalogue-design" ||
          p.category?.toLowerCase().includes("book") ||
          p.category?.toLowerCase().includes("catalogue") ||
          p.category?.toLowerCase().includes("publication")
      );
    }

    if (activeCategory === "marketing-collateral") {
      return all.filter(
        (p) =>
          p.categoryKey === "post-design" ||
          p.categoryKey === "catalogue-design" ||
          p.categoryKey === "marketing-collateral" ||
          p.categoryKey === "label-design" ||
          p.category?.toLowerCase().includes("collateral")
      );
    }

    // Direct match fallback
    const directMatches = all.filter(
      (p) =>
        p.categoryKey === activeCategory ||
        p.category?.toLowerCase().includes(activeCategory)
    );

    return directMatches.length > 0 ? directMatches : all;
  }, [activeCategory]);

  return (
    <section className="playbook-works-section" id="playbook-works" aria-label="Products and Selected Works">
      <div className="playbook-container">
        {/* Section Headline matching Image 2 */}
        <div className="playbook-header-wrap">
          <p className="playbook-eyebrow-tag" style={{ font: "700 12px/1 var(--font-sans)", letterSpacing: "0.22em", color: "#1C2752", textTransform: "uppercase", marginBottom: "10px" }}>
            PRINT &amp; PACKAGING
          </p>
          <h2 className="playbook-main-title" style={{ font: "900 italic clamp(30px, 4.2vw, 56px)/1.08 var(--font-display)", textTransform: "uppercase", color: "#0F172A", margin: "0 0 12px 0", letterSpacing: "-0.01em" }}>
            MADE TO BE HELD, SHELVED AND SHIPPED
          </h2>
          <p className="playbook-subtitle" style={{ font: "400 15px/1.6 var(--font-sans)", color: "#475569", margin: "0 0 28px 0" }}>
            Browse the kinds of work we produce, from brochures to event builds.
          </p>
        </div>

        {/* Filter Buttons Bar matching Image 3 with all requested buttons */}
        <div className="playbook-tabs-nav-bar" role="tablist" aria-label="Work Categories">
          <div className="playbook-tabs-scroll-wrap">
            {PLAYBOOK_CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`playbook-tab-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => handleSelectTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Responsive Grid showing only image accordingly */}
        <div className="playbook-works-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.id || index}-${activeCategory}`}
              className="playbook-work-card playbook-image-only-card"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
              }}
              aria-label={`View ${project.title || "Design"}`}
            >
              <div className="playbook-card-visual">
                <img
                  src={project.image}
                  alt={project.title || "Creative Design"}
                  className="playbook-card-img"
                  loading="lazy"
                />
                <div className="playbook-card-overlay">
                  <span className="playbook-view-zoom-pill">
                    <ZoomIn className="w-4 h-4" />
                    <span>View Detail</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="playbook-empty-state">
            <p>No works found for this specific filter.</p>
            <button
              type="button"
              className="playbook-tab-btn is-active"
              onClick={() => handleSelectTab("all")}
            >
              SHOW ALL WORKS
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal for High-Resolution Project Preview - Show ONLY image */}
      {selectedProject && (
        <div
          className="playbook-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="playbook-modal-box playbook-modal-image-only" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="playbook-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="playbook-modal-img-only-wrap">
              <img
                src={selectedProject.image}
                alt={selectedProject.title || "Project Artwork"}
                className="playbook-modal-pure-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
