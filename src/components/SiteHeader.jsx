import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronRight, Menu, X, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio } from "@/lib/portfolioData";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname || "/";

  useEffect(() => {
    const handleScroll = () => {
      // At hero section (top <= 40px): completely transparent / no color
      // Scrolled down (> 40px): solid white background
      setIsScrolled(window.scrollY > 40);
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
        titleColor: "#1C2752", // Dark blue accent
        link: "/profile",
        items: [
          { label: "Who we are", link: "/profile" },
          { label: "How we work", link: "/profile" },
          { label: "Our Services", link: "/services" },
          { label: "Our Clients", link: "/clients" },
          { label: "Contact Us", link: "/contact" },
        ],
      },
      {
        id: "brand-strategy",
        title: "Brand Strategy",
        link: "/brand-strategy",
        items: [
          { label: "Brand Development", link: "/brand-development" },
          { label: "Brand Strategy", link: "/brand-strategy" },
        ],
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        link: "/social-media-marketing",
        items: [
          { label: "Search Engine Optimization", link: "/search-engine-optimization" },
          { label: "Social Media Marketing", link: "/social-media-marketing" },
          { label: "Paid Marketing", link: "/paid-marketing" },
        ],
      },
    ],
    col2: [
      {
        id: "packaging",
        title: "Packaging",
        link: "/packaging-design",
        items: [
          { label: "Packaging Design", link: "/packaging-design" },
          { label: "Product Shape Design", link: "/product-shape-design" },
        ],
      },
      {
        id: "advertising",
        title: "Advertising",
        link: "/photography",
        items: [
          { label: "Photography", link: "/photography" },
          { label: "Ads Design", link: "/ads-design" },
        ],
      },
      {
        id: "web",
        title: "Web",
        link: "/website-design",
        items: [
          { label: "UI/UX", link: "/ui-ux-design" },
          { label: "Web Design & Development", link: "/website-design" },
        ],
      },
    ],
    col3: [
      {
        id: "brand-design",
        title: "Brand Design",
        link: "/works",
        categoryKey: "logo-design",
        items: [
          { label: "Book Design", link: "/works", categoryKey: "book-design" },
          { label: "Box Design", link: "/works", categoryKey: "box-design" },
          { label: "Catalogue", link: "/works", categoryKey: "catalogue" },
          { label: "Logo", link: "/works", categoryKey: "logo-design" },
          { label: "Meter Design", link: "/works", categoryKey: "meter-design" },
          { label: "Social Media post", link: "/works", categoryKey: "post-design" },
          { label: "Visiting card", link: "/works", categoryKey: "visiting-card-design" },
          { label: "Invitartion", link: "/works", categoryKey: "invitation" },
        ],
      },
    ],
    contact: {
      id: "contact-direct",
      title: "Contact & Studio",
      link: "/contact",
      email: portfolio.email || "acc.ssproductionhouse@gmail.com",
      phones: [portfolio.phone || "+91 96714 45186"],
      location: portfolio.location || "E-GF-56, Capital Highstreet, Phoolbagh, Bhiwadi - 301019",
    },
  };

  const handleLinkClick = (item) => {
    setMenuOpen(false);
    if (item.categoryKey) {
      navigate(`/works?category=${item.categoryKey}`);
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
          {/* Left: SS Production House Brand Text */}
          <Link
            to="/"
            className="navbar-brand-text-col"
            aria-label={`${portfolio.name} Home`}
            onClick={() => {
              setMenuOpen(false);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("ss_replay_logo_intro"));
              }
            }}
          >
            <div className="site-firm-ss-brand-row">
              <span className="site-firm-ss-large">SS</span>
              <span className="site-firm-vertical-divider" aria-hidden="true" />
              <div className="site-firm-prod-col">
                <span className="site-firm-word-production">PRODUCTION</span>
                <span className="site-firm-word-house">HOUSE</span>
              </div>
            </div>
          </Link>

          {/* Center: Brand Logo */}
          <Link
            to="/"
            className="navbar-center-logo-link"
            aria-label={`${portfolio.name} Logo`}
            onClick={() => {
              setMenuOpen(false);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("ss_replay_logo_intro"));
              }
            }}
          >
            <div className="navbar-scrolled-logo-pod">
              <img src={portfolio.logo} alt={portfolio.name} className="site-firm-logo-img" />
            </div>
          </Link>

          {/* Right: Minimalist Menu Button */}
          <div className="navbar-right-menu-col">
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
                        to={`/works?category=${sec.categoryKey}`}
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
                                to={`/works?category=${sub.categoryKey}`}
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
                        to="/works?category=logo-design"
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
                                to={`/works?category=${sub.categoryKey}`}
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

              </div>
            </div>

            {/* Contact & Map Section: Contact info on the left, Map on the right */}
            <div className="creamy-contact-map-row">
              <div className="creamy-contact-left-col">
                <Link
                  to={menuSections.contact.link}
                  className="creamy-section-title-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="creamy-chevron-circle">
                    <ChevronRight className="w-3 h-3" />
                  </span>
                  <span className="creamy-title-text" style={{ color: "#93C5FD" }}>
                    {menuSections.contact.title}
                  </span>
                </Link>

                <div className="creamy-contact-details">
                  <div className="creamy-contact-detail-item">
                    <span className="creamy-contact-detail-label">
                      <Mail className="w-3 h-3 inline mr-1 text-[#93C5FD]" /> Email ID
                    </span>
                    <a
                      href={`mailto:${menuSections.contact.email}`}
                      className="creamy-contact-email"
                    >
                      {menuSections.contact.email}
                    </a>
                  </div>

                  <div className="creamy-contact-detail-item">
                    <span className="creamy-contact-detail-label">
                      <Phone className="w-3 h-3 inline mr-1 text-[#93C5FD]" /> Phone Numbers
                    </span>
                    <div className="creamy-contact-phones">
                      {menuSections.contact.phones.map((phone, i) => (
                        <span key={i}>
                          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                          {i < menuSections.contact.phones.length - 1 && (
                            <span className="phone-sep"> | </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="creamy-contact-detail-item">
                    <span className="creamy-contact-detail-label">
                      <MapPin className="w-3 h-3 inline mr-1 text-[#93C5FD]" /> Studio Location
                    </span>
                    <p className="creamy-contact-address">
                      {menuSections.contact.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Section at right side */}

            </div>

            {/* Bottom Bar inside Creamy Menu */}
            <div className="creamy-menu-footer">
              <div className="creamy-footer-left">
                <span className="creamy-status-dot" />
                <span>Available for Packaging, Brand Identity &amp; 3D Staging</span></div>
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
