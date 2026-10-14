import React, { useState, useEffect, useCallback } from "react";

/**
 * LogoPreloader Component
 *
 * Smooth, premium website preloader animation:
 * - Clean, pure white full-screen background (#FFFFFF)
 * - Two diagonal cuts of the logo:
 *   1. Left-bottom cut enters from the bottom-left with subtle rotation
 *   2. Right-upward cut enters from the top-right with subtle rotation
 * - Subtle snapping effect as the two cuts seamlessly assemble in the center
 * - Brand typography reveals right below the logo:
 *   "SS PRODUCTION HOUSE"
 *   "DESIGN  |  PACKAGING  |  TRANSPORT"
 * - Holds complete brand lockup in center for ~1 second
 * - Smoothly scales down maintaining proportions while fading out
 * - Homepage appears immediately after animation finishes
 */

export function LogoPreloader({ onComplete, isStandalone = false }) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleReplay = useCallback(() => {
    setIsFadingOut(false);
    setIsDismissed(false);
    setAnimationKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // 0.0s - 1.05s: Two cuts slide in from left-bottom & right-upward
    // 1.05s - 1.18s: Snap connection & master emblem lock
    // 1.18s - 1.45s: Brand typography reveals below
    // 1.45s - 2.45s: Hold complete logo in center for ~1s
    // 2.45s - 2.90s: Smooth scale-down & fade-out into homepage
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2450);

    const finishTimer = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 2900);

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
      className={`preloader-overlay ${isFadingOut ? "preloader-fade-out" : ""} ${isStandalone ? "is-standalone" : ""}`}
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
              />

              {/* 2. Right-Upward Cut: Enters from right upward */}
              <img
                src="/preloader-pieces/cut_right_top.png"
                alt="Logo Right-Upward Cut"
                className="preloader-piece piece-cut-right-top"
                draggable={false}
              />

              {/* Master Seamless Logo (cross-fades at snap moment for zero-gap raster perfection) */}
              <img
                src="/preloader-pieces/section_master.png"
                alt="SS Production House Logo Emblem"
                className="preloader-master-logo"
                draggable={false}
              />
            </div>

            {/* Typography Section (Appears after emblem snaps, matching the uploaded reference image) */}
            <div className="preloader-typography-wrap" aria-hidden="true">
              <img
                src="/preloader-pieces/brand_typography_clean.png"
                alt="SS PRODUCTION HOUSE - DESIGN | PACKAGING | TRANSPORT"
                className="preloader-typography-img"
                draggable={false}
              />
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
