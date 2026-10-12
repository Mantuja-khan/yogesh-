import { Mascot } from "page-mascot";
import { useEffect, useRef } from "react";

export function StudioMascot({ size = 120, className = "", label = "SS Studio Mascot" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dispatch initial pointer position so mascot immediately tracks
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    window.dispatchEvent(new PointerEvent("pointermove", { clientX: initX, clientY: initY }));

    // Enhance mouse scroll interaction: when user scrolls the mouse wheel,
    // dynamically steer the pointer focus up/down so the mascot moves its head actively with the wheel!
    let simulatedY = initY;
    const handleWheel = (e) => {
      const step = Math.sign(e.deltaY) * 160;
      simulatedY = Math.min(Math.max(simulatedY + step, 40), window.innerHeight - 40);
      window.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: window.innerWidth * 0.5,
          clientY: simulatedY,
        })
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className={`studio-mascot-container ${className}`} ref={containerRef}>
      <Mascot
        directions="/mascots/kamran-directions.webp"
        reactions="/mascots/kamran-reactions.webp"
        size={size}
        label={label}
        className="studio-mascot-avatar"
      />
    </div>
  );
}
