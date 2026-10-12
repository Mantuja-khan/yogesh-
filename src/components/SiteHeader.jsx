import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/lib/portfolioData";
import pendantLampImg from "@/assets/pendant_lamp.png";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileWorksOpen, setMobileWorksOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setIsDropdownOpen(false);
    setMobileWorksOpen(false);
  }, [currentPath]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`editorial-nav ${isScrolled || menuOpen ? "is-scrolled" : ""}`}>
      <div className="scroll-progress-bar" aria-hidden="true" />
      
      {/* Brand Logo & Small-Screen Pendant Lamp Group */}
      <div className="nav-brand-group">
        <Link to="/" className="wordmark brand-logo-wrap" aria-label={`${portfolio.name} home`}>
          <img src={portfolio.logo} alt={portfolio.name} className="site-logo-img" />
        </Link>

        {/* Pendant Lamp: On small screens, displayed at the right side of the logo and swings like a pendulum */}
        <div className="header-mobile-lamp-container" aria-hidden="true">
          <div className="header-mobile-lamp-cord" />
          <img
            src={pendantLampImg}
            alt="Pendant Lamp"
            className="header-mobile-lamp-img"
            draggable={false}
          />
          <div className="header-mobile-lamp-glow" />
        </div>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        {portfolio.nav.map((item) => {
          if (item.dropdown) {
            const isWorksActive = currentPath.startsWith("/works");
            return (
              <div
                key={item.id}
                className="nav-dropdown-wrapper"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={item.path}
                  className={`nav-dropdown-trigger ${isWorksActive || isDropdownOpen ? "active" : ""}`}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`nav-chevron ${isDropdownOpen ? "rotated" : ""}`} />
                </Link>

                <div className={`nav-dropdown-menu ${isDropdownOpen ? "is-open" : ""}`} role="menu">
                  <div className="dropdown-menu-header">
                    <span>Creative Disciplines</span>
                    <span className="dropdown-badge">{item.dropdown.length} Categories</span>
                  </div>
                  <div className="dropdown-items-grid">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to="/works"
                        search={{ category: subItem.id }}
                        role="menuitem"
                        className="dropdown-menu-item"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="dropdown-item-left">
                          <span className="dropdown-item-dot" />
                          <span className="dropdown-item-title">{subItem.label}</span>
                        </span>
                        <ArrowUpRight className="dropdown-item-arrow" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-link-item ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="nav-meta">
        <span><i /> Available for design</span>
        {!menuOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="nav-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={false}
          >
            <Menu />
          </Button>
        )}
      </div>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Navigation Coming from the Right */}
      <nav
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button
            type="button"
            className="mobile-menu-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mobile-menu-items-list">
          {portfolio.nav.map((item, index) => {
            const slideStyle = { "--item-index": index };
            if (item.dropdown) {
              return (
                <div key={item.id} className="mobile-dropdown-wrapper mobile-nav-slide-item" style={slideStyle}>
                  <div className="mobile-dropdown-header">
                    <Link
                      to={item.path}
                      className="mobile-nav-main-btn"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="mobile-accordion-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileWorksOpen((prev) => !prev);
                      }}
                      aria-label="Toggle works subcategories"
                    >
                      <ChevronDown className={`mobile-chevron ${mobileWorksOpen ? "rotated" : ""}`} />
                    </button>
                  </div>
                  <div className={`mobile-sub-menu ${mobileWorksOpen ? "is-open" : ""}`}>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to="/works"
                        search={{ category: subItem.id }}
                        className="mobile-sub-item"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>{subItem.label}</span>
                        <ArrowUpRight />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.id}
                to={item.path}
                className="mobile-link-item mobile-nav-slide-item"
                style={slideStyle}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowUpRight />
              </Link>
            );
          })}
        </div>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-status">
            <span className="status-dot" />
            <span>Available for design</span>
          </div>
          <a
            href={`tel:${portfolio.phone || "+919671445186"}`}
            className="mobile-menu-phone"
          >
            {portfolio.phone || "+91 96714 45186"}
          </a>
        </div>
      </nav>
    </header>
  );
}
