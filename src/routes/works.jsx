import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Layers,
  LayoutGrid,
  X,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { portfolio } from "@/lib/portfolioData";
import { TextReveal } from "@/components/TextReveal";
import pdfIcon from "@/assets/pdf-icon.svg";

export const Route = createFileRoute("/works")({
  validateSearch: (search) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Our Works & Portfolio — SS Production House" },
      {
        name: "description",
        content: "Explore our work reel across Box Design, Catalogue Design, Book Design, Label Design, Logo Design, Meter Design, Product Photoshoot, Post Design, and Visiting Cards.",
      },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const search = useSearch({ from: "/works" });
  const navigate = useNavigate({ from: "/works" });
  const [selectedCategory, setSelectedCategory] = useState(search.category || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePdfModal, setActivePdfModal] = useState(null);
  const [activeImageModal, setActiveImageModal] = useState(null);
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);
  const cursorRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (search.category && search.category !== "all") {
      setSelectedCategory(search.category);
    } else {
      setSelectedCategory("");
    }
  }, [search.category]);

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const categories = portfolio.nav.find((n) => n.id === "works")?.dropdown || [];

  const handleCategorySelect = (categoryId) => {
    setDropdownOpen(false);
    if (!categoryId || categoryId === "all") {
      setSelectedCategory("");
      navigate({ search: {}, replace: true });
    } else {
      setSelectedCategory(categoryId);
      navigate({ search: { category: categoryId }, replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  // Projects strictly matching this category
  const categoryProjects = selectedCategory
    ? portfolio.projects.filter((p) => p.categoryKey === selectedCategory)
    : [];

  const getCategoryCount = (categoryId) => {
    return portfolio.projects.filter((p) => p.categoryKey === categoryId).length;
  };

  const getCategoryPdfCount = (categoryId) => {
    return portfolio.projects.filter((p) => p.categoryKey === categoryId && p.isPdf).length;
  };

  const openPdfViewer = (project) => {
    setActivePdfModal(project);
    setPdfPage(1);
    setPdfZoom(100);
  };

  const closePdfViewer = () => {
    setActivePdfModal(null);
  };

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main">
        {/* ============================================================
            CASE A: TOP CTA / HERO SECTION WHEN NO CATEGORY IS SELECTED
            (Shows Main Overview Hero with 3D Backdrop & Mascot)
            ============================================================ */}
        {!selectedCategory && (
          <section className="page-header-section page-header-3d">
            <div className="page-header-3d-stage" aria-hidden="true">
              <Page3DBackdrop />
            </div>
            <div className="page-header-inner page-header-with-mascot">
              <div className="page-header-text">
                <p className="section-index">
                  <span>01</span> <TextReveal triggerOnMount delay={0.06}>Works &amp; Design Disciplines</TextReveal>
                </p>
                <h1 className="page-hero-title">
                  <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                    Tactile craft.
                  </TextReveal>
                  <br />
                  <em>
                    <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                      Spatial design reel.
                    </TextReveal>
                  </em>
                </h1>
                <p className="page-hero-lead">
                  <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                    SS Production House produces bespoke packaging systems, print catalogues, monograph publications, and high-contrast commercial stills for visionary brands across the globe.
                  </TextReveal>
                </p>
                <div className="works-top-cta-actions">
                  <Link to="/contact" className="start-link">
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a href="#categories-archive" className="secondary-link">
                    <span>Explore {categories.length} Disciplines</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="page-header-mascot-slot">
                <StudioMascot size={260} label="Works Archive Mascot" />
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            CASE B: DEDICATED CATEGORY TOP CTA / HERO SECTION
            (Every category like Book Design has its own top CTA section like profile page)
            ============================================================ */}
        {selectedCategory && currentCategoryObj && (
          <section className="page-header-section page-header-3d category-dedicated-hero">
            <div className="page-header-3d-stage" aria-hidden="true">
              <Page3DBackdrop />
            </div>
            <div className="page-header-inner page-header-with-mascot">
              <div className="page-header-text">
                <p className="section-index">
                  <span>01</span> <TextReveal triggerOnMount delay={0.06}>{currentCategoryObj.label} Archive · {currentCategoryObj.count}</TextReveal>
                </p>
                <h1 className="page-hero-title">
                  <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                    {currentCategoryObj.label}.
                  </TextReveal>
                  <br />
                  <em>
                    <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                      Form &amp; Craft Intent.
                    </TextReveal>
                  </em>
                </h1>
                <p className="page-hero-lead">
                  <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                    {`${currentCategoryObj.desc}. Engineered with precision typography grids, tactile substrates, and interactive digital press specifications.`}
                  </TextReveal>
                </p>
                <div className="works-top-cta-actions">
                  <Link to="/contact" className="start-link">
                    <span>Start {currentCategoryObj.label} Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    className="secondary-link"
                    onClick={() => handleCategorySelect("all")}
                  >
                    <span>← All {categories.length} Disciplines</span>
                  </button>
                </div>
              </div>
              <div className="page-header-mascot-slot">
                <StudioMascot size={260} label={`${currentCategoryObj.label} Mascot`} />
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            MAIN VIEW: ALL CATEGORIES GRID (CORE FIELDS STYLE WITH BACKGROUND IMAGES)
            Shows when no specific category is selected
            ============================================================ */}
        {!selectedCategory && (
          <section className="page-content-section" id="categories-archive">
            <div className="works-categories-header-wrap">
              <div className="design-disciplines-header-left">
                <h2 className="design-disciplines-title">
                  <span className="dd-word-black">Design</span>{" "}
                  <span className="dd-word-blue">Disciplines.</span>
                </h2>
                <div className="dd-blue-accent-bar" aria-hidden="true" />
              </div>

              {/* Quick Jump Category Dropdown Filter */}
              <div className="works-quick-dropdown-wrap" ref={dropdownRef}>
                <div className="custom-dropdown-select-container">
                  <button
                    type="button"
                    id="works-category-dropdown-trigger"
                    className={`quick-jump-pill-btn ${dropdownOpen ? "is-active" : ""}`}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                  >
                    <LayoutGrid className="quick-jump-icon" />
                    <span className="quick-jump-text">Quick Jump to Section</span>
                    <ChevronDown className={`quick-jump-arrow ${dropdownOpen ? "is-rotated" : ""}`} />
                  </button>

                  {/* Dropdown Options Menu: ONLY Category Name */}
                  {dropdownOpen && (
                    <div className="quick-jump-clean-menu" role="listbox">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          className="quick-jump-clean-option"
                          role="option"
                          aria-selected={false}
                          onClick={() => handleCategorySelect(cat.id)}
                        >
                          <span className="quick-jump-option-name">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Core Fields Style Cards Grid with Background Image for Every Box (No PDF tag, No Project count tag) */}
            <div className="works-categories-grid">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  role="button"
                  tabIndex={0}
                  className="works-cat-card card-3d"
                  onClick={() => handleCategorySelect(cat.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleCategorySelect(cat.id);
                  }}
                >
                  <div
                    className="works-cat-bg-layer"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />
                  <div className="works-cat-overlay" />
                  
                  <div className="works-cat-card-body">
                    <div className="works-cat-card-top">
                      <span className="works-cat-num">0{idx + 1}</span>
                      <div className="works-cat-arrow-box">
                        <ArrowUpRight className="works-cat-arrow-icon" />
                      </div>
                    </div>

                    <div className="works-cat-card-bottom">
                      <h3 className="works-cat-title">{cat.label}</h3>
                      <p className="works-cat-desc">{cat.desc}</p>
                      
                      <div className="works-cat-explore-action">
                        <span>Open {cat.label} Works</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================
            DEDICATED CATEGORY WORKS PAGE
            Clean Product Cards with ONLY: Image, Name, View button, Download button
            ============================================================ */}
        {selectedCategory && currentCategoryObj && (
          <section className="category-works-page-section">
            {/* Top Navigation & Category Switcher Bar */}
            <div className="category-works-topbar">
              <button
                type="button"
                className="category-back-btn"
                onClick={() => handleCategorySelect("all")}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to All Categories</span>
              </button>

              <div className="category-switcher-box">
                <label htmlFor="switch-category-select" className="switcher-label">
                  Switch Category:
                </label>
                <div className="switcher-select-wrap">
                  <select
                    id="switch-category-select"
                    className="switcher-select"
                    value={selectedCategory}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    aria-label="Switch between categories"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="switcher-arrow" />
                </div>
              </div>
            </div>

            {/* Clean Products Grid: Image, Name, View button, Download button */}
            <div className="compact-products-container">
              {categoryProjects.length > 0 ? (
                <div className="compact-products-grid">
                  {categoryProjects.map((project) => (
                    <article key={project.id} className="compact-product-card card-3d">
                      {project.isPdf && (
                        <div className="card-pdf-icon-indicator" title="Adobe PDF Document">
                          <img src={pdfIcon} alt="Adobe PDF Document" className="card-pdf-icon-img" />
                        </div>
                      )}
                      {/* Media Area */}
                      <div
                        className="compact-product-media"
                        role="button"
                        tabIndex={0}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (project.isPdf) {
                            const targetUrl = project.pdfUrl || project.image;
                            window.open(targetUrl, "_blank", "noopener,noreferrer");
                          } else {
                            setActiveImageModal(project);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            if (project.isPdf) {
                              const targetUrl = project.pdfUrl || project.image;
                              window.open(targetUrl, "_blank", "noopener,noreferrer");
                            } else {
                              setActiveImageModal(project);
                            }
                          }
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.alt || project.title}
                          className="compact-product-img"
                          loading="lazy"
                        />
                        {project.isPdf ? (
                          <span className="compact-type-badge pdf-tag">
                            <span>PDF</span>
                          </span>
                        ) : (
                          <span className="compact-type-badge still-tag">
                            Still
                          </span>
                        )}
                      </div>

                      {/* Card Body: Name + View Button + Download Button */}
                      <div className="compact-product-body">
                        <h3 className="compact-product-title">{project.title}</h3>

                        <div className="compact-card-actions-row">
                          {/* View Button: Opens PDF directly in browser when it's a PDF document */}
                          {project.isPdf ? (
                            <a
                              href={project.pdfUrl || project.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="compact-btn btn-view"
                              title={`Open ${project.title} PDF in Chrome / Browser`}
                            >
                              <span>View PDF</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="compact-btn btn-view"
                              onClick={() => {
                                setActiveImageModal(project);
                              }}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                          )}

                          {/* Download / Drive Access Button */}
                          <a
                            href={project.pdfUrl || project.image}
                            target={project.pdfUrl?.startsWith("http") ? "_blank" : undefined}
                            rel={project.pdfUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
                            download={!project.pdfUrl?.startsWith("http")}
                            className="compact-btn btn-download"
                            title={project.pdfUrl?.startsWith("http") ? `Open ${project.title} on Google Drive` : `Download ${project.title}`}
                          >
                            {project.pdfUrl?.startsWith("http") ? (
                              <>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                                <span>Drive</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </>
                            )}
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="works-empty-state">
                  <Layers className="w-12 h-12 text-accent mx-auto mb-4 opacity-60" />
                  <h3>Projects Cataloguing in Progress</h3>
                  <p>
                    We are currently digitizing high-resolution press dielines and specifications for {currentCategoryObj.label}. Inquire directly for private portfolio access.
                  </p>
                  <Link to="/contact" className="start-link">
                    <span>Request Category Archive</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ============================================================
            BOTTOM CTA BANNER SECTION (PROFILE PAGE STYLE)
            ============================================================ */}
        <section className="page-cta-section">
          <div className="page-cta-inner">
            <p className="section-index"><span>03</span> Collaborate</p>
            <h2>Ready to produce something <em>unforgettable?</em></h2>
            <div className="cta-action-row">
              <Link to="/contact" className="start-link">
                <span>Start a Project</span>
                <ArrowUpRight />
              </Link>
              <Link to="/profile" className="secondary-link">
                <span>Explore Studio Profile</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            INTERACTIVE PDF VIEWER MODAL
            ============================================================ */}
        {activePdfModal && (
          <div className="pdf-viewer-overlay" role="dialog" aria-modal="true">
            <div className="pdf-viewer-backdrop" onClick={closePdfViewer} />

            <div className="pdf-viewer-window">
              {/* Header Bar */}
              <div className="pdf-viewer-header">
                <div className="pdf-header-info">
                  <div className="pdf-header-icon">
                    <FileText className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="pdf-header-title">{activePdfModal.title}</h4>
                    <span className="pdf-header-sub">
                      {activePdfModal.client} · {activePdfModal.pdfInfo?.issue || "Issue 01"} · {activePdfModal.pdfInfo?.size || "PDF Document"}
                    </span>
                  </div>
                </div>

                <div className="pdf-viewer-controls">
                  <div className="pdf-page-controls">
                    <button
                      type="button"
                      onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
                      disabled={pdfPage <= 1}
                      className="pdf-control-btn"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="pdf-page-num">
                      Page {pdfPage} / 8
                    </span>
                    <button
                      type="button"
                      onClick={() => setPdfPage((p) => Math.min(8, p + 1))}
                      disabled={pdfPage >= 8}
                      className="pdf-control-btn"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pdf-zoom-controls">
                    <button
                      type="button"
                      onClick={() => setPdfZoom((z) => Math.max(70, z - 15))}
                      className="pdf-control-btn"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="pdf-zoom-level">{pdfZoom}%</span>
                    <button
                      type="button"
                      onClick={() => setPdfZoom((z) => Math.min(150, z + 15))}
                      className="pdf-control-btn"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <a
                    href={activePdfModal.pdfUrl || "#"}
                    target={activePdfModal.pdfUrl?.startsWith("http") ? "_blank" : undefined}
                    rel={activePdfModal.pdfUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
                    download={!activePdfModal.pdfUrl?.startsWith("http")}
                    className="pdf-download-action-btn"
                    title={activePdfModal.pdfUrl?.startsWith("http") ? "Open Document on Google Drive" : "Download PDF"}
                  >
                    {activePdfModal.pdfUrl?.startsWith("http") ? (
                      <>
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Open on Drive</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    )}
                  </a>

                  <button
                    type="button"
                    onClick={closePdfViewer}
                    className="pdf-close-btn"
                    aria-label="Close PDF Viewer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Document Page Canvas / Viewport */}
              <div className="pdf-viewer-stage">
                <div
                  className="pdf-sheet-container"
                  style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: "top center" }}
                >
                  <div className="pdf-sheet-page">
                    <div className="pdf-page-header-mark">
                      <span>SS PRODUCTION HOUSE ARCHIVES</span>
                      <span>{activePdfModal.sku || "SPEC-DOC"}</span>
                    </div>

                    <div className="pdf-sheet-visual">
                      <img
                        src={activePdfModal.image}
                        alt={activePdfModal.alt}
                        className="pdf-sheet-img"
                      />
                    </div>

                    <div className="pdf-sheet-content">
                      <span className="pdf-sheet-issue">
                        {activePdfModal.category} · {activePdfModal.year}
                      </span>
                      <h3>{activePdfModal.title}</h3>
                      <p>{activePdfModal.blurb}</p>

                      <div className="pdf-sheet-spec-grid">
                        <div className="pdf-spec-box">
                          <strong>CLIENT:</strong>
                          <span>{activePdfModal.client}</span>
                        </div>
                        <div className="pdf-spec-box">
                          <strong>FILE TYPE:</strong>
                          <span>Interactive Vector CMYK PDF</span>
                        </div>
                        <div className="pdf-spec-box">
                          <strong>PAGES:</strong>
                          <span>{activePdfModal.pdfInfo?.pages || "48 Pages"}</span>
                        </div>
                        <div className="pdf-spec-box">
                          <strong>RESOLUTION:</strong>
                          <span>300 DPI Press Certified</span>
                        </div>
                      </div>

                      {activePdfModal.deliverables && (
                        <div className="pdf-sheet-delivs">
                          <strong>Included Deliverables:</strong>
                          <ul>
                            {activePdfModal.deliverables.map((item, idx) => (
                              <li key={idx}>✓ {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activePdfModal.pdfUrl?.startsWith("http") && (
                        <div className="pdf-drive-open-action" style={{ marginTop: "1.25rem", textAlign: "center" }}>
                          <a
                            href={activePdfModal.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="start-link"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}
                          >
                            <span>Open Full Master PDF on Google Drive</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="pdf-sheet-footer">
                      <span>Page {pdfPage} of 8</span>
                      <span>© {activePdfModal.client} · SS Production House</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="pdf-thumbnail-strip">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pdf-thumb-btn ${pdfPage === page ? "active" : ""}`}
                    onClick={() => setPdfPage(page)}
                  >
                    <span>P. {page}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            IMAGE LIGHTBOX MODAL
            ============================================================ */}
        {activeImageModal && (
          <div className="image-lightbox-overlay" role="dialog" aria-modal="true">
            <div className="image-lightbox-backdrop" onClick={() => setActiveImageModal(null)} />
            <div className="image-lightbox-card">
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setActiveImageModal(null)}
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activeImageModal.image}
                alt={activeImageModal.alt}
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <h4>{activeImageModal.title}</h4>
                <p>{activeImageModal.client} · {activeImageModal.format}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
