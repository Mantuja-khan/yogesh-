import { useEffect, useRef, useState } from "react";

export function SeamlessHeroBackgroundVideo() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v1.muted = true;
    v2.muted = true;
    v1.play().catch(() => {});

    // Only allow video to run for 20 seconds max
    const MAX_RUN_TIME = 20;

    // Seamless pre-empt looping: 0.35s before reaching 20s (or duration), switch to V2 at 0
    const handleV1Time = () => {
      const targetDuration = Math.min(v1.duration || MAX_RUN_TIME, MAX_RUN_TIME);
      if (v1.currentTime >= targetDuration - 0.35) {
        v2.currentTime = 0;
        v2.play().catch(() => {});
        setActiveVideo(2);
      }
      if (v1.currentTime >= MAX_RUN_TIME) {
        v1.currentTime = 0;
      }
    };

    // Seamless pre-empt looping: 0.35s before reaching 20s (or duration), switch to V1 at 0
    const handleV2Time = () => {
      const targetDuration = Math.min(v2.duration || MAX_RUN_TIME, MAX_RUN_TIME);
      if (v2.currentTime >= targetDuration - 0.35) {
        v1.currentTime = 0;
        v1.play().catch(() => {});
        setActiveVideo(1);
      }
      if (v2.currentTime >= MAX_RUN_TIME) {
        v2.currentTime = 0;
      }
    };

    v1.addEventListener("timeupdate", handleV1Time);
    v2.addEventListener("timeupdate", handleV2Time);

    return () => {
      v1.removeEventListener("timeupdate", handleV1Time);
      v2.removeEventListener("timeupdate", handleV2Time);
    };
  }, []);

  return (
    <div className="hero-bg-video-wrapper" aria-hidden="true">
      <video
        ref={video1Ref}
        src="/ssproduction.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="hero-bg-video-element"
        style={{
          position: "absolute",
          inset: 0,
          opacity: activeVideo === 1 ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          zIndex: activeVideo === 1 ? 2 : 1,
        }}
        onEnded={() => {
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0;
            video2Ref.current.play().catch(() => {});
            setActiveVideo(2);
          }
        }}
      />
      <video
        ref={video2Ref}
        src="/ssproduction.mp4"
        muted
        playsInline
        preload="auto"
        className="hero-bg-video-element"
        style={{
          position: "absolute",
          inset: 0,
          opacity: activeVideo === 2 ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          zIndex: activeVideo === 2 ? 2 : 1,
        }}
        onEnded={() => {
          if (video1Ref.current) {
            video1Ref.current.currentTime = 0;
            video1Ref.current.play().catch(() => {});
            setActiveVideo(1);
          }
        }}
      />
      {/* Scrim Overlay: Gradient on desktop, clear and vibrant on mobile */}
      <div className="hero-bg-video-scrim" />
    </div>
  );
}
