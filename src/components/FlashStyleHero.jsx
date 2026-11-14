import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { StudioMascot } from "@/components/StudioMascot";
import "@/flash-hero.css";

const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/place/SS+PRODUCTION+HOUSE/@28.2119449,76.8604442,99m/data=!3m1!1e3!4m6!3m5!1s0x390d371285b76843:0x4f7956668d0651de!8m2!3d28.2119124!4d76.860826!16s%2Fg%2F11p2d4h4bp?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D";

export function FlashStyleHero() {
  return (
    <section className="fh" aria-label="SS Production House Hero">

      {/* Decorative concentric glow rings */}
      <div className="fh__rings" aria-hidden="true">
        <span className="fh__ring fh__ring--1" />
        <span className="fh__ring fh__ring--2" />
        <span className="fh__ring fh__ring--3" />
      </div>

      {/* ══════════════════════════════════
          HEADING
          "Welcome To"   → glass/chalk
          "SS"           → logo blue bold
          "PRODUCTION HOUSE" → dark bold all-caps (matches logo image)
          tagline        → DESIGN | PACKAGING | TRANSPORT
          ══════════════════════════════════ */}
      <div className="fh__heading-wrap">
        <h1 className="fh__h1" aria-label="Welcome To SS Production House">
          <span className="fh__line fh__line--glass">Welcome To</span>

          {/* Matches the uploaded logo image exactly */}
          <span className="fh__line fh__line--brand">
            <span className="fh__ss">SS</span>
            <span className="fh__production">PRODUCTION HOUSE</span>
          </span>

          {/* Tagline below brand line — matches logo image */}
          <span className="fh__brand-tagline">
            DESIGN &nbsp;|&nbsp; PACKAGING &nbsp;|&nbsp; TRANSPORT
          </span>
        </h1>
      </div>

      {/* ══════════════════════════════════
          BODY — 3-column grid
          ══════════════════════════════════ */}
      <div className="fh__body">

        {/* LEFT: Google card + tagline */}
        <div className="fh__col fh__col--left">

          {/* Google review card — fully clickable → Google profile */}
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fh__gcard"
            aria-label="SS Production House on Google — 5.0 stars · 1 review"
          >
            <div className="fh__gcard-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="fh__gcard-body">
              <span className="fh__gcard-name">SS Production House</span>
              <div className="fh__gcard-stars">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="fh__star fh__star--filled" />
                ))}
                <span className="fh__gcard-score">5.0</span>
              </div>
              <span className="fh__gcard-label">1 Google Review ↗</span>
            </div>
          </a>

          <p className="fh__tagline">
            The ultimate design<br />studio is here.
          </p>
        </div>

        {/* CENTER: hand holding phone mockup */}
        <div className="fh__col fh__col--center">
          <div className="fh__phone-wrap">
            <img
              src="/hero-phone-mockup.jpg"
              alt="SS Production House — Bhiwadi Graphic Design Studio"
              className="fh__phone-img"
              loading="eager"
              draggable="false"
            />
            <div className="fh__live-badge">
              <span className="fh__live-dot" />
              Bhiwadi · Rajasthan
            </div>
          </div>
        </div>

        {/* RIGHT: mascot character + byeline + CTA */}
        <div className="fh__col fh__col--right">

          {/* Mascot character — logo removed, just the character */}
          <div className="fh__mascot-slot">
            <StudioMascot size={96} label="SS Studio Mascot" />
          </div>

          <p className="fh__byeline">
            Bye bye dull branding. See your brand transformed with
            luxury packaging &amp; identity design. Adios boring visuals.
          </p>

          <div className="fh__cta-row">
            <Link to="/works" className="fh__btn fh__btn--dark">
              View Portfolio
            </Link>
            <Link to="/contact" className="fh__btn fh__btn--light">
              Contact Us
            </Link>
          </div>

          <Link
            to="/contact"
            className="fh__fab"
            aria-label="Start a project"
            title="Start a project"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
