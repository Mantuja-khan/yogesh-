import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * LogoPreloader Component
 *
 * Smooth, premium website preloader animation:
 * - Clean, pure white full-screen background (#FFFFFF)
 * - Two diagonal cuts of the logo:
 *   1. Left-bottom cut enters from the bottom-left with subtle rotation
 *   2. Right-upward cut enters from the top-right with subtle rotation
 * - Seamless snap connection in center & master emblem lock
 * - Pure HTML/CSS brand typography below:
 *   "SS PRODUCTION HOUSE"
 *   "DESIGN   |   PACKAGING   |   TRANSPORT"
 * - Holds complete brand lockup in center for ~1 second
 * - When loading animation finishes, the animated emblem seamlessly glides up to the exact
 *   header logo position in the navigation bar with an ultra-smooth cubic-bezier curve.
 * - Website and header reveal underneath in real-time as the logo lands pixel-perfect.
 */

export function LogoPreloader({ onComplete, isStandalone = false }) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isFlyingToHeader, setIsFlyingToHeader] = useState(false);
  const [flightCoords, setFlightCoords] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const logoFlightBoxRef = useRef(null);

  const handleReplay = useCallback(() => {
    setIsFlyingToHeader(false);
    setFlightCoords(null);
    setIsDismissed(false);
    setIsReady(true);
    if (typeof document !== "undefined") {
      document.body.classList.add("preloader-active");
    }
    setAnimationKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("preloader-active");
    }

    // Ensure images are cached/ready
    const img1 = new Image();
    img1.src = "/preloader-pieces/cut_left_bottom.png";
    const img2 = new Image();
    img2.src = "/preloader-pieces/cut_right_top.png";
    const img3 = new Image();
    img3.src = "/preloader-pieces/section_master.png";

    setIsReady(true);

    // Timeline:
    // 0.0s - 1.20s: Two cuts slide in from left-bottom & right-upward
    // 1.20s - 1.35s: Tactile snapping connection & master emblem lock
    // 1.35s - 1.60s: Brand typography reveals below
    // 1.60s - 2.50s: Complete assembled logo held steadily in center
    // 2.50s: Transition begins -> compute exact delta & scale to target header logo,
    //        smoothly fly logo to header position while background fades to transparent
    // 3.40s: Flight completes seamlessly right where the header logo sits!
    const flyTimer = setTimeout(() => {
      const preloaderLogoEl = logoFlightBoxRef.current;
      const headerLogoEl =
        document.querySelector(".navbar-center-logo-link .site-firm-logo-img") ||
        document.querySelector(".navbar-center-logo-link");

      let deltaX = 0;
      let deltaY = -220;
      let scale = 0.38;

      if (preloaderLogoEl && headerLogoEl) {
        const preloaderRect = preloaderLogoEl.getBoundingClientRect();
        const headerRect = headerLogoEl.getBoundingClientRect();

        const pCenterX = preloaderRect.left + preloaderRect.width / 2;
        const pCenterY = preloaderRect.top + preloaderRect.height / 2;

        const hCenterX = headerRect.left + headerRect.width / 2;
        const hCenterY = headerRect.top + headerRect.height / 2;

        deltaX = hCenterX - pCenterX;
        deltaY = hCenterY - pCenterY;
        const targetW = headerRect.width || 76;
        const sourceW = preloaderRect.width || 200;
        scale = targetW / sourceW;
      } else if (preloaderLogoEl) {
        const preloaderRect = preloaderLogoEl.getBoundingClientRect();
        const pCenterY = preloaderRect.top + preloaderRect.height / 2;
        deltaY = 42 - pCenterY;
        scale = 76 / (preloaderRect.width || 200);
      }

      setFlightCoords({ x: deltaX, y: deltaY, scale });
      setIsFlyingToHeader(true);
    }, 2500);

    const finishTimer = setTimeout(() => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("preloader-active");
      }
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 3400);

    return () => {
      clearTimeout(flyTimer);
      clearTimeout(finishTimer);
      if (typeof document !== "undefined") {
        document.body.classList.remove("preloader-active");
      }
    };
  }, [animationKey, onComplete]);

  if (isDismissed && !isStandalone) {
    return null;
  }

  return (
    <div
      className={`preloader-overlay ${isFlyingToHeader ? "is-flying-active" : ""} ${isStandalone ? "is-standalone" : ""} ${isReady ? "is-ready" : ""}`}
      key={animationKey}
      aria-label="Website Loading Preloader"
    >
      <div className="preloader-screen">
        {/* Centered Assembly Lockup */}
        <div className={`preloader-stage ${isFlyingToHeader ? "is-flying-stage" : ""}`}>
          <div className={`preloader-brand-lockup ${isFlyingToHeader ? "is-flying-lockup" : ""}`}>
            {/* Circular Emblem Flight Stage (Smoothly flies to header logo position) */}
            <div
              ref={logoFlightBoxRef}
              className={`preloader-flight-box ${isFlyingToHeader ? "is-in-flight" : ""}`}
              style={
                isFlyingToHeader && flightCoords
                  ? {
                      transform: `translate3d(${flightCoords.x}px, ${flightCoords.y}px, 0) scale(${flightCoords.scale})`,
                    }
                  : undefined
              }
            >
              <div className="preloader-logo-container">
                {/* 1. Left-Bottom Cut: Slides in from left bottom */}
                <img
                  src="/preloader-pieces/cut_left_bottom.png"
                  alt="Logo Left-Bottom Cut"
                  className="preloader-piece piece-cut-left-bottom"
                  draggable={false}
                  loading="eager"
                />

                {/* 2. Right-Upward Cut: Enters from right upward */}
                <img
                  src="/preloader-pieces/cut_right_top.png"
                  alt="Logo Right-Upward Cut"
                  className="preloader-piece piece-cut-right-top"
                  draggable={false}
                  loading="eager"
                />

                {/* Master Seamless Logo (cross-fades at snap moment for zero-gap raster perfection) */}
                <img
                  src="/preloader-pieces/section_master.png"
                  alt="SS Production House Logo Emblem"
                  className="preloader-master-logo"
                  draggable={false}
                  loading="eager"
                />
              </div>
            </div>

            {/* Pure CSS/HTML Typography: Exact Font, Colors, and Proportions matching reference image */}
            <div
              className={`preloader-brand-typography ${isFlyingToHeader ? "is-fading-out" : ""}`}
              aria-label="SS Production House"
            >
              <div className="preloader-brand-main-title">
                <span className="preloader-brand-ss">SS</span>
                <span className="preloader-brand-prod-house">PRODUCTION HOUSE</span>
              </div>
              <div className="preloader-brand-sub-tags">
                <span className="preloader-tag-word">DESIGN</span>
                <span className="preloader-tag-bar">|</span>
                <span className="preloader-tag-word">PACKAGING</span>
                <span className="preloader-tag-bar">|</span>
                <span className="preloader-tag-word">TRANSPORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Replay Trigger for Preview */}
        {isStandalone && (
          <div className="preloader-standalone-controls">
            <button
              type="button"
              className="preloader-replay-btn"
              onClick={handleReplay}
              aria-label="Replay Preloader Animation"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Replay Animation</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoPreloader;
