import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio } from "@/lib/portfolioData";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState?.location?.pathname || "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  // Lock body scroll when mega menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mega-menu-is-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mega-menu-is-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mega-menu-is-open");
    };
  }, [menuOpen]);

  // Mega menu structure matching the updated user requirements
  const menuSections = {
    col1: [
      {
        id: "about",
        title: "About",
        titleColor: "#1E4DFF", // Blue accent replacing pink
        link: "/profile",
        items: [
          { label: "Who we are", link: "/profile" },
          { label: "How we work", link: "/profile" },
        ],
      },
      {
        id: "brand-strategy",
        title: "Brand Strategy",
        link: "/services",
        items: [
          { label: "Brand Development", link: "/services" },
          { label: "Brand Story", link: "/services" },
        ],
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        link: "/services",
        items: [
          { label: "Search Engine Optimization", link: "/services" },
          { label: "Social Media Marketing", link: "/services" },
          { label: "Paid Marketing", link: "/services" },
          { label: "Influencer Marketing", link: "/services" },
        ],
      },
    ],
    col2: [
      {
        id: "packaging",
        title: "Packaging",
        link: "/works",
        categoryKey: "box-design",
        items: [
          { label: "Packaging Design", link: "/works", categoryKey: "box-design" },
          { label: "Product Shape Design", link: "/works", categoryKey: "box-design" },
        ],
      },
      {
        id: "advertising",
        title: "Advertising",
        link: "/works",
        categoryKey: "product-photoshoot",
        items: [
          { label: "Photography", link: "/works", categoryKey: "product-photoshoot" },
          { label: "Film Making, TVCs", link: "/works", categoryKey: "product-photoshoot" },
          { label: "Wayfinding Signage", link: "/works", categoryKey: "indoor" },
          { label: "3D Modeling & Animation", link: "/works", categoryKey: "box-design" },
          { label: "Billboards & Airport Branding", link: "/works", categoryKey: "outdoor" },
          { label: "Ads Design", link: "/works", categoryKey: "post-design" },
        ],
      },
      {
        id: "web",
        title: "Web",
        link: "/services",
        items: [
          { label: "UI/UX", link: "/services" },
          { label: "Web Design & Development", link: "/services" },
        ],
      },
    ],
    col3: [
      {
        id: "brand-design",
        title: "Brand Design",
        link: "/works",
        categoryKey: "logo-design",
        // The 9 buttons requested by the user
        items: [
          { label: "Book Design", link: "/works", categoryKey: "book-design" },
          { label: "Box Design", link: "/works", categoryKey: "box-design" },
          { label: "Lable", link: "/works", categoryKey: "label-design" },
          { label: "Logo", link: "/works", categoryKey: "logo-design" },
          { label: "Meter Design", link: "/works", categoryKey: "meter-design" },
          { label: "Mochup", link: "/works", categoryKey: "mockup" },
          { label: "Social Media post", link: "/works", categoryKey: "post-design" },
          { label: "Visiting card", link: "/works", categoryKey: "visiting-card-design" },
          { label: "Invitartion", link: "/works", categoryKey: "invitation" },
        ],
      },
      {
        id: "contact-direct",
        title: "Contact",
        titleColor: "#1E4DFF",
        link: "/contact",
        email: portfolio.email || "hello@ssproductionhouse.com",
        phones: ["+91-9671445186", "+91-9899977006"],
      },
    ],
  };

  const handleLinkClick = (item) => {
    setMenuOpen(false);
    if (item.categoryKey) {
      navigate({ to: "/works", search: { category: item.categoryKey } });
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("ss_select_work_category", { detail: { category: item.categoryKey } })
        );
      }
    }
  };

  return (
    <>
      <header
        className={`editorial-nav minimalist-nav ${isScrolled ? "is-scrolled" : ""} ${menuOpen ? "is-menu-active" : ""
          }`}
      >
        <div className="nav-container-minimal">
          {/* Left: Brand Logo & Firm Name Only */}
          <Link
            to="/"
            className="brand-logo-firm-wrap"
            aria-label={`${portfolio.name} Home`}
            onClick={() => {
              setMenuOpen(false);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("ss_replay_logo_intro"));
              }
            }}
          >
            <img src={portfolio.logo} alt={portfolio.name} className="site-firm-logo-img" />
            <div className="site-firm-name-wrap">
              <div className="site-firm-ss-brand-row">
                <span className="site-firm-ss-large">SS</span>
                <span className="site-firm-vertical-divider" aria-hidden="true" />
                <div className="site-firm-prod-col">
                  <span className="site-firm-word-production">PRODUCTION</span>
                  <span className="site-firm-word-house">HOUSE</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Right: Menu Bar Button Only */}
          <button
            type="button"
            className={`navbar-minimal-menu-btn ${menuOpen ? "is-active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="menu-btn-label">{menuOpen ? "CLOSE" : "MENU"}</span>
            <div className="menu-icon-indicator">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </div>
          </button>
        </div>
      </header>

      {/* Mega Menu Dropdown Overlay with Creamy White Background */}
      <div
        className={`creamy-mega-menu-overlay ${menuOpen ? "is-visible" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div
          className="creamy-mega-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div className="creamy-mega-menu-panel" role="dialog" aria-modal="true">
          <div className="creamy-mega-menu-content-scroll">
            <div className="creamy-mega-grid">
              {/* Column 1: About, Brand Strategy, Digital Marketing */}
              <div className="creamy-col">
                {menuSections.col1.map((sec) => (
                  <div key={sec.id} className="creamy-section-group">
                    <Link
                      to={sec.link}
                      className="creamy-section-title-btn"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="creamy-chevron-circle">
                        <ChevronRight className="w-3 h-3" />
                      </span>
                      <span
                        className="creamy-title-text"
                        style={sec.titleColor ? { color: sec.titleColor } : undefined}
                      >
                        {sec.title}
                      </span>
                    </Link>
                    {sec.items && (
                      <ul className="creamy-sublist">
                        {sec.items.map((sub, i) => (
                          <li key={i}>
                            <Link
                              to={sub.link}
                              className="creamy-sublink"
                              onClick={() => setMenuOpen(false)}
                            >
                              <span className="sublink-dash">-</span>
                              <span>{sub.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2: Packaging, Advertising, Web */}
              <div className="creamy-col">
                {menuSections.col2.map((sec) => (
                  <div key={sec.id} className="creamy-section-group">
                    {sec.categoryKey ? (
                      <Link
                        to="/works"
                        search={{ category: sec.categoryKey }}
                        className="creamy-section-title-btn"
                        onClick={() => handleLinkClick(sec)}
                      >
                        <span className="creamy-chevron-circle">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        <span className="creamy-title-text">{sec.title}</span>
                      </Link>
                    ) : (
                      <Link
                        to={sec.link}
                        className="creamy-section-title-btn"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="creamy-chevron-circle">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        <span className="creamy-title-text">{sec.title}</span>
                      </Link>
                    )}
                    {sec.items && (
                      <ul className="creamy-sublist">
                        {sec.items.map((sub, i) => (
                          <li key={i}>
                            {sub.categoryKey ? (
                              <Link
                                to="/works"
                                search={{ category: sub.categoryKey }}
                                className="creamy-sublink"
                                onClick={() => handleLinkClick(sub)}
                              >
                                <span className="sublink-dash">-</span>
                                <span>{sub.label}</span>
                              </Link>
                            ) : (
                              <Link
                                to={sub.link}
                                className="creamy-sublink"
                                onClick={() => setMenuOpen(false)}
                              >
                                <span className="sublink-dash">-</span>
                                <span>{sub.label}</span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 3: Brand Design (9 requested buttons) + Contact */}
              <div className="creamy-col">
                {/* Brand Design */}
                {menuSections.col3
                  .filter((s) => s.id === "brand-design")
                  .map((sec) => (
                    <div key={sec.id} className="creamy-section-group">
                      <Link
                        to="/works"
                        search={{ category: "logo-design" }}
                        className="creamy-section-title-btn"
                        onClick={() => handleLinkClick(sec)}
                      >
                        <span className="creamy-chevron-circle">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        <span className="creamy-title-text">{sec.title}</span>
                      </Link>
                      {sec.items && (
                        <ul className="creamy-sublist">
                          {sec.items.map((sub, i) => (
                            <li key={i}>
                              <Link
                                to="/works"
                                search={{ category: sub.categoryKey }}
                                className="creamy-sublink"
                                onClick={() => handleLinkClick(sub)}
                              >
                                <span className="sublink-dash">-</span>
                                <span>{sub.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                {/* Direct Contact Block */}
                {menuSections.col3
                  .filter((s) => s.id === "contact-direct")
                  .map((sec) => (
                    <div key={sec.id} className="creamy-section-group creamy-contact-group">
                      <Link
                        to={sec.link}
                        className="creamy-section-title-btn"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="creamy-chevron-circle">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        <span
                          className="creamy-title-text"
                          style={{ color: sec.titleColor || "#1E4DFF" }}
                        >
                          {sec.title}
                        </span>
                      </Link>
                      <div className="creamy-contact-details">
                        <a
                          href={`mailto:${sec.email}`}
                          className="creamy-contact-email"
                        >
                          {sec.email}
                        </a>
                        <div className="creamy-contact-phones">
                          {sec.phones.map((phone, i) => (
                            <span key={i}>
                              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                              {i < sec.phones.length - 1 && <span className="phone-sep"> | </span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Bottom Bar inside Creamy Menu */}
            <div className="creamy-menu-footer">
              <div className="creamy-footer-left">
                <span className="creamy-status-dot" />
                <span>Available for Packaging, Brand Identity &amp; 3D Staging</span>
              </div>
              <div className="creamy-footer-right">
                <span>Location: {portfolio.location || "Bhiwadi, NCR India"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
