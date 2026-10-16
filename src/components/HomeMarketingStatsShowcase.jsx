import { Link } from "@tanstack/react-router";

export function HomeMarketingStatsShowcase() {
  return (
    <section
      className="home-marketing-stats-section"
      id="marketing-growth"
      aria-label="Marketing & Growth Metrics"
    >
      <div className="home-marketing-stats-container">
        <div className="home-marketing-stats-grid">
          {/* Left Card: Chamfered Pure White Stats Card with Amber Frame */}
          <div className="stats-chamfer-main-card">
            {/* Decorative Corner Chamfer Accent SVG matching reference image */}
            <svg
              className="stats-chamfer-svg-frame"
              viewBox="0 0 1000 520"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Top-Right Chamfer Corner Line */}
              <path
                d="M 520 3 L 945 3 L 997 55 L 997 517"
                stroke="#D99438"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Bottom-Left Chamfer Corner Line */}
              <path
                d="M 3 130 L 3 465 L 55 517 L 720 517"
                stroke="#D99438"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Card Inner Content */}
            <div className="stats-chamfer-content">
              {/* Heading matching user reference */}
              <div className="stats-header-group">
                <h3 className="stats-eyebrow-heading">
                  ARE YOU READY TO ELEVATE YOUR BRAND?
                </h3>
                <h2 className="stats-main-heading">
                  TO THE NEXT LEVEL WITH CREATIVE DESIGN.</h2>
              </div>

              {/* 7 Key Metrics Grid */}
              <div className="stats-rows-container">
                {/* Row 1: 4 metrics */}
                <div className="stats-row-top">
                  <div className="stat-metric-cell">
                    <span className="stat-big-number">200+</span>
                    <span className="stat-sub-label">Design Projects</span>
                  </div>

                  <div className="stat-metric-cell">
                    <span className="stat-big-number">100%</span>
                    <span className="stat-sub-label">Satisfaction</span>
                  </div>

                  <div className="stat-metric-cell">
                    <span className="stat-big-number">100+</span>
                    <span className="stat-sub-label">Packaging Designs</span>
                  </div>

                  <div className="stat-metric-cell">
                    <span className="stat-big-number">50+</span>
                    <span className="stat-sub-label">Brand Identities</span>
                  </div>
                </div>

                {/* Row 2: 3 wide metrics */}
                <div className="stats-row-bottom">
                  <div className="stat-metric-cell stat-cell-expanded">
                    <span className="stat-big-number">20+</span>
                    <span className="stat-sub-label">
                      Industries Served
                    </span>
                  </div>

                  <div className="stat-metric-cell stat-cell-expanded">
                    <span className="stat-big-number">
                      100%<span className="stat-star-glyph">★</span>
                    </span>
                    <span className="stat-sub-label">
                      Creative Focus
                    </span>
                  </div>

                  <div className="stat-metric-cell stat-cell-expanded">
                    <span className="stat-big-number">2+ yrs</span>
                    <span className="stat-sub-label">
                      creative design experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Cards matching reference image */}
          <div className="stats-right-stacked-col">
            {/* Top Card: Black Award Winning Card */}
            <div className="stats-dark-award-card">
              <span className="dark-award-eyebrow">We create </span>
              <h4 className="dark-award-title">AWESOME SOCIAL MEDIA CONTENT &</h4>
              <p className="dark-award-subtitle">Packaging & Graphic Design Studio</p>
              <Link to="/contact" className="dark-award-btn-outline">
                Packaging & Branding
              </Link>
            </div>

            {/* Bottom Card: White Every Industry Covered Card */}
            <div className="stats-light-industry-card">
              <h4 className="light-industry-title">
                Creative Graphic <br />Design
              </h4>
              <Link to="/works" className="light-industry-btn-solid">
                Explore Designs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
