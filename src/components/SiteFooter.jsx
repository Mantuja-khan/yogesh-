import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Star } from "lucide-react";
import { portfolio } from "@/lib/portfolioData";

export function SiteFooter({ showDottedSquares = false }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements?.email;
    if (input && input.value) {
      alert("Thank you for subscribing to our weekly newsletter!");
      input.value = "";
    }
  };

  return (
    <footer className="site-footer-expanded" aria-label="Site Footer">
      {/* Floating Vertical 'Call Now' Tab on far left matching Image 2 */}
      <a
        href="tel:+919671445186"
        className="footer-call-now-tab"
        aria-label="Call Now"
        title="Call Now"
      >
        <span>Call Now</span>
      </a>

      {/* Main 3-Column Modern Grid matching Image 2 */}
      <div className="footer-image-two-grid">
        {/* Column 1: Brand Logo, Taglines, Status Pill, Google My Business, Newsletter */}
        <div className="footer-brand-hero-col">
          <Link to="/" className="footer-brand-logo-link" aria-label="SS Production House home">
            <img
              src={portfolio.logo}
              alt={portfolio.name}
              className="footer-hero-logo-img"
            />
            <div className="footer-brand-firm-text-wrap">
              <span className="footer-brand-firm-title">SS production house</span>
              <span className="footer-brand-firm-sub">Visual &amp; Packaging Studio</span>
            </div>
          </Link>

          <h3 className="footer-hero-brand-title">
            Trusted Partners In Digital Innovation.
          </h3>
          <p className="footer-hero-brand-desc">
            Our developers and visual designers excel in both tech and design, crafting innovative solutions that command attention.
          </p>

          {/* Accepting 2026 Design Briefs Section */}


          {/* Google My Business Review Badge directly below Accepting 2026 Design Briefs */}
          <GoogleMyBusinessBadge />

          {/* Weekly Newsletter Form matching Image 2 */}

        </div>

        {/* Column 2: Our Works */}
        <div className="footer-col-our-works">
          <span className="footer-column-title">Our Works</span>
          <ul className="footer-links-list-clean">
            <li>
              <Link to="/works">All Projects</Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "box-design" }}>
                Box Design
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "book-design" }}>
                Book Design
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "label-design" }}>
                Label Design
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "logo-design" }}>
                Logo Design
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "product-photoshoot" }}>
                Product Photoshoot
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "mockup" }}>
                Mockups
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "visiting-card" }}>
                Visiting Card
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services matching Image 2 */}
        <div className="footer-col-services">
          <span className="footer-column-title">Services</span>
          <ul className="footer-links-list-clean">
            <li>
              <Link to="/services">Web Development</Link>
            </li>
            <li>
              <Link to="/services">App Development</Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "box-design" }}>
                E-Commerce
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "logo-design" }}>
                Graphic Design
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "box-design" }}>
                Packaging Design
              </Link>
            </li>
            <li>
              <Link to="/works" search={{ category: "product-photoshoot" }}>
                Product Photoshoot
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Get Started, Contact Us, Payment Trust Cards matching Image 2 */}
        <div className="footer-col-get-started">
          <span className="footer-column-title">Get Started</span>
          <ul className="footer-links-list-clean">
            <li>
              <Link to="/contact">Start a Project</Link>
            </li>
            <li>
              <Link to="/contact">Schedule a free call</Link>
            </li>
          </ul>

          <div className="footer-contact-details-group">
            <span className="footer-column-title" style={{ marginBottom: "2px" }}>
              Contact Us
            </span>
            <a href={`mailto:${portfolio.email || "info@ssproductionhouse.com"}`}>
              {portfolio.email || "info@ssproductionhouse.com"}
            </a>
            <a href="tel:+919671445186">( 817 ) 799-8644 · +91-9671445186</a>
            <p>DLF Cyber City, Phase II, Gurugram, Haryana 122002, India</p>
          </div>

          {/* Payment Trust Cards Row matching Image 2 */}

        </div>
      </div>

      {/* Bottom Row matching Image 2 */}
      <div className="footer-bottom-image-two-bar">
        <span>
          © {new Date().getFullYear()} {portfolio.name} . All rights reserved.
        </span>
        <div className="footer-bottom-links">
          <Link to="/contact">Terms &amp; Conditions</Link>
          <Link to="/contact">Privacy Policy</Link>
          <button
            type="button"
            onClick={scrollToTop}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
            }}
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

{/* Google My Business Component matching Image 1 */ }
function GoogleMyBusinessBadge() {
  return (
    <div
      className="google-my-business-badge-card"
      aria-label="Google My Business Rating for SS Production House"
    >
      {/* Left: Google Store Awning Logo + Text */}
      <div className="gmb-logo-left">
        <svg
          className="gmb-store-svg"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Blue store base building */}
          <rect x="6" y="18" width="36" height="24" rx="4" fill="#4285F4" />
          <path d="M6 18H42V38C42 40.2 40.2 42 38 42H10C7.8 42 6 40.2 6 38V18Z" fill="#1A73E8" />
          {/* Awning Scallops */}
          <path d="M6 14C6 11.8 7.8 10 10 10H14L13 22H6V14Z" fill="#669DF6" />
          <path d="M14 10H20L19 22H13L14 10Z" fill="#4285F4" />
          <path d="M20 10H28L27 22H19L20 10Z" fill="#1A73E8" />
          <path d="M28 10H34L35 22H27L28 10Z" fill="#4285F4" />
          <path d="M34 10H38C40.2 10 42 11.8 42 14V22H35L34 10Z" fill="#669DF6" />
          {/* White 'G' in store window */}
          <circle cx="24" cy="30" r="7.5" fill="#FFFFFF" />
          <path
            d="M24 25.5C21.5 25.5 19.5 27.5 19.5 30C19.5 32.5 21.5 34.5 24 34.5C26.5 34.5 28.2 32.7 28.2 30.2H24V28.5H30.1C30.2 29 30.2 29.6 30.2 30.2C30.2 33.8 27.8 36.3 24 36.3C20.5 36.3 17.7 33.5 17.7 30C17.7 26.5 20.5 23.7 24 23.7C25.7 23.7 27.2 24.3 28.3 25.4L26.9 26.8C26.2 26.1 25.2 25.5 24 25.5Z"
            fill="#1A73E8"
          />
        </svg>

        <div className="gmb-brand-text">
          <span className="gmb-google-word">
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </span>
          <span className="gmb-my-business-sub">My Business</span>
        </div>
      </div>

      {/* Vertical Divider Line */}
      <div className="gmb-vertical-divider" aria-hidden="true" />

      {/* Right: Agency Name, 4.6 Stars, Location */}
      <div className="gmb-info-right">
        <h4 className="gmb-agency-title">SS PRODUCTION HOUSE</h4>
        <div className="gmb-rating-row">
          <span className="gmb-score-num">4.6</span>
          <div className="gmb-stars-row" aria-label="4.6 out of 5 stars">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <Star className="w-3.5 h-3.5 fill-[#F59E0B]/70 text-[#F59E0B]" />
          </div>
          <span className="gmb-reviews-count">105 Google reviews</span>
        </div>
        <p className="gmb-agency-location">Advertising agency in Gurgaon, Haryana</p>
      </div>
    </div>
  );
}
