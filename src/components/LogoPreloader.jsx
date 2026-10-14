import React, { useState, useEffect, useCallback } from "react";

/**
 * LogoPreloader Component
 *
 * Smooth, premium website preloader animation:
 * - Clean, pure white full-screen background (#FFFFFF)
 * - Two diagonal cuts of the logo:
 *   1. Left-bottom cut enters from the bottom-left with subtle rotation
 *   2. Right-upward cut enters from the top-right with subtle rotation
 * - Seamless snap connection in center
 * - Pure HTML/CSS brand typography below (No images used for text!):
 *   "SS PRODUCTION HOUSE"
 *   "DESIGN   |   PACKAGING   |   TRANSPORT"
 * - Holds complete brand lockup in center for ~1 second
 * - Smoothly scales down maintaining proportions while fading out
 * - Homepage appears immediately after animation finishes
 */

export function LogoPreloader({ onComplete, isStandalone = false }) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleReplay = useCallback(() => {
    setIsFadingOut(false);
    setIsDismissed(false);
    setIsReady(true);
    setAnimationKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Ensure images are cached/ready
    const img1 = new Image();
    img1.src = "/preloader-pieces/cut_left_bottom.png";
    const img2 = new Image();
    img2.src = "/preloader-pieces/cut_right_top.png";
    const img3 = new Image();
    img3.src = "/preloader-pieces/section_master.png";

    setIsReady(true);

    // 0.0s - 1.20s: Two cuts slide in from left-bottom & right-upward
    // 1.20s - 1.40s: Snap connection & master emblem lock
    // 1.40s - 1.80s: Brand typography reveals below
    // 1.80s - 3.20s: Hold complete logo in center for ~1.4s
    // 3.20s - 3.65s: Smooth scale-down & fade-out into homepage
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3200);

    const finishTimer = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 3650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [animationKey, onComplete]);

  if (isDismissed && !isStandalone) {
    return null;
  }

  return (
    <div
      className={`preloader-overlay ${isFadingOut ? "preloader-fade-out" : ""} ${isStandalone ? "is-standalone" : ""} ${isReady ? "is-ready" : ""}`}
      key={animationKey}
      aria-label="Website Loading Preloader"
    >
      <div className="preloader-screen">
        {/* Centered Assembly Lockup */}
        <div className="preloader-stage">
          <div className="preloader-brand-lockup">
            {/* Circular Emblem Stage */}
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

            {/* Pure CSS/HTML Typography: Exact Font, Colors, Tapered Rules, and Proportions from reference image */}
            <div className="preloader-brand-typography" aria-label="SS Production House">
              <div className="preloader-text-wrapper">
                <span className="preloader-rule-left" aria-hidden="true" />
                <span className="preloader-brand-text">SS PRODUCTION HOUSE</span>
                <span className="preloader-rule-right" aria-hidden="true" />
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
