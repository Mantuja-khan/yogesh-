import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/lib/portfolioData";
import { DottedSquare8x8 } from "@/components/DottedSquare8x8";

export function SiteFooter({ showDottedSquares = false }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const disciplines = portfolio.nav.find((n) => n.id === "works")?.dropdown || [];

  return (
    <footer className={`site-footer-expanded ${showDottedSquares ? "has-dotted-squares" : ""}`} aria-label="Site Footer">
      {/* 5 x 8X8 Dotted Squares at random positions in footer */}
      {showDottedSquares && (
        <div className="footer-dotted-squares-container" aria-hidden="true">
          <DottedSquare8x8
            className="footer-dot-square footer-dot-1"
            size={76}
            style={{ top: "12%", left: "4%", transform: "rotate(-6deg)" }}
          />
          <DottedSquare8x8
            className="footer-dot-square footer-dot-2"
            size={84}
            style={{ top: "22%", right: "6%", transform: "rotate(8deg)" }}
          />
          <DottedSquare8x8
            className="footer-dot-square footer-dot-3"
            size={68}
            style={{ bottom: "28%", left: "16%", transform: "rotate(4deg)" }}
          />
          <DottedSquare8x8
            className="footer-dot-square footer-dot-4"
            size={72}
            style={{ bottom: "16%", right: "12%", transform: "rotate(-12deg)" }}
          />
          <DottedSquare8x8
            className="footer-dot-square footer-dot-5"
            size={80}
            style={{ top: "54%", left: "44%", transform: "rotate(3deg)" }}
          />
        </div>
      )}


      {/* Main 4-Column Grid */}
      <div className="footer-top-grid">
        {/* Brand & Studio Identity */}
        <div className="footer-brand-col">
          <Link to="/" className="brand-logo-wrap footer-brand-logo-link" aria-label={`${portfolio.name} home`}>
            <img src={portfolio.logo} alt={portfolio.name} className="site-logo-img footer-logo" />
            <div className="footer-brand-meta">
              <span className="footer-brand-name">SS PRODUCTION HOUSE</span>
              <span className="footer-brand-title">Yogesh Dahiya · Visual Director</span>
            </div>
          </Link>
          <p className="footer-brand-desc">{portfolio.intro}</p>
          <div className="footer-status-pill">
            <span className="status-dot" />
            <span>Accepting 2026 Design Briefs</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="footer-links-col">
          <span className="footer-col-title">Navigation</span>
          <ul className="footer-nav-list">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/profile">Designer Profile</Link></li>
            <li><Link to="/services">Services &amp; Scope</Link></li>
            <li><Link to="/works">Works &amp; 3D Stills</Link></li>
            <li><Link to="/clients">Clients &amp; Testimonials</Link></li>
            <li><Link to="/contact">Contact &amp; Inquiries</Link></li>
          </ul>
        </div>

        {/* Creative Disciplines */}
        <div className="footer-links-col">
          <span className="footer-col-title">Creative Disciplines</span>
          <ul className="footer-nav-list">
            {disciplines.map((item) => (
              <li key={item.id}>
                <Link to="/works" search={{ category: item.id }} className="footer-discipline-link">
                  <span>{item.label}</span>
                  <ArrowUpRight className="footer-discipline-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Studio Contact */}
        <div className="footer-links-col footer-contact-col">
          <span className="footer-col-title">Studio Direct</span>
          <div className="footer-contact-item">
            <Mail className="w-4 h-4 footer-contact-icon" />
            <div>
              <span className="footer-contact-label">Email Inquiries</span>
              <a href={`mailto:${portfolio.email}`} className="footer-contact-value">{portfolio.email}</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <Phone className="w-4 h-4 footer-contact-icon" />
            <div>
              <span className="footer-contact-label">Direct Line / Phone</span>
              <a href={`tel:${portfolio.phone}`} className="footer-contact-value">{portfolio.phone}</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <MapPin className="w-4 h-4 footer-contact-icon" />
            <div>
              <span className="footer-contact-label">Studio Base</span>
              <span className="footer-contact-value">{portfolio.location}</span>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="footer-socials-pill-row">
            {["Instagram", "Behance", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                title={`Visit ${s}`}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="site-footer">
        <p className="site-footer-copyright">
          © {new Date().getFullYear()} {portfolio.name} · Yogesh Dahiya. All rights reserved. Crafted for visionary brands with architectural precision.
        </p>

        <Button
          variant="ghost"
          onClick={scrollToTop}
          className="footer-back-top-btn"
          aria-label="Scroll back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </Button>
      </div>
    </footer>
  );
}
