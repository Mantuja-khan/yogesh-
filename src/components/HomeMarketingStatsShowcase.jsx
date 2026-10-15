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
                  Are You Ready To Take Your Marketing
                </h3>
                <h2 className="stats-main-heading">
                  TO THE NEXT LEVEL WITH US?
                </h2>
              </div>

              {/* 7 Key Metrics Grid */}
              <div className="stats-rows-container">
                {/* Row 1: 4 metrics */}
                <div className="stats-row-top">
                  <div className="stat-metric-cell">
                    <span className="stat-big-number">200+</span>
                    <span className="stat-sub-label">Happy Clients</span>
                  </div>

                  <div className="stat-metric-cell">
                    <span className="stat-big-number">1M</span>
                    <span className="stat-sub-label">Paid Media</span>
                  </div>

                  <div className="stat-metric-cell">
                    <span className="stat-big-number">50K</span>
                    <span className="stat-sub-label">Key Word's Optimised</span>
                  </div>

                  <div className="stat-metric-cell">
                    <span className="stat-big-number">200+</span>
                    <span className="stat-sub-label">Website Revamped</span>
                  </div>
                </div>

                {/* Row 2: 3 wide metrics */}
                <div className="stats-row-bottom">
                  <div className="stat-metric-cell stat-cell-expanded">
                    <span className="stat-big-number">Top 10</span>
                    <span className="stat-sub-label">
                      Creative agencies in Gurgaon — industry listings
                    </span>
                  </div>

                  <div className="stat-metric-cell stat-cell-expanded">
                    <span className="stat-big-number">
                      4.6<span className="stat-star-glyph">★</span>
                    </span>
                    <span className="stat-sub-label">
                      Google Business rating from client reviews
                    </span>
                  </div>

                  <div className="stat-metric-cell stat-cell-expanded">
                    <span className="stat-big-number">11+ yrs</span>
                    <span className="stat-sub-label">
                      Of branding &amp; creative design experience
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
              <span className="dark-award-eyebrow">We are</span>
              <h4 className="dark-award-title">Award Winning</h4>
              <p className="dark-award-subtitle">Social Media Marketing Agency</p>
              <Link to="/contact" className="dark-award-btn-outline">
                Know More
              </Link>
            </div>

            {/* Bottom Card: White Every Industry Covered Card */}
            <div className="stats-light-industry-card">
              <h4 className="light-industry-title">
                Every Industry<br />Covered
              </h4>
              <Link to="/works" className="light-industry-btn-solid">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
