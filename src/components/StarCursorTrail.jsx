import { useEffect, useRef } from "react";

export function StarCursorTrail({ className = "", countMultiplier = 1, colors }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let isMouseDown = false;
    let lastMousePos = null;

    const palette = colors || [
      "#4169E1", // Royal Blue
      "#ffffff", // Crisp Diamond White
      "#60a5fa", // Bright Electric Blue
      "#93c5fd", // Soft Ice Sparkle
      "#38bdf8", // Cyan Flare
      "#ffd700", // Subtle Gold Spark
    ];

    const resize = () => {
      if (!canvas || !parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Render 4-pointed sparkling star
    function drawSparkleStar(ctx, cx, cy, spikes, outerRadius, innerRadius, angle, color, alpha) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      let rot = (Math.PI / 2) * 3;
      let x = 0;
      let y = 0;
      const step = Math.PI / spikes;

      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }

    function createParticle(x, y, vx = 0, vy = 0, extraSparks = false) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.6 + 0.8) * (extraSparks ? 2.8 : 1);
      const isStar = Math.random() > 0.22; // ~78% diamond sparkle stars, ~22% glowing micro-dust
      const size = Math.random() * 9 + 4.5;

      return {
        x,
        y,
        vx: vx * 0.22 + Math.cos(angle) * speed,
        vy: vy * 0.22 + Math.sin(angle) * speed - 0.3, // gentle buoyant rise
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 1,
        decay: Math.random() * 0.018 + 0.01,
        isStar,
        twinkleRate: Math.random() * 0.3 + 0.1,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    }

    const spawnParticles = (clientX, clientY, count, extraSparks = false) => {
      const rect = parent.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      let vx = 0;
      let vy = 0;
      if (lastMousePos) {
        vx = x - lastMousePos.x;
        vy = y - lastMousePos.y;
      }
      lastMousePos = { x, y };

      const actualCount = Math.max(1, Math.round(count * countMultiplier));
      for (let i = 0; i < actualCount; i++) {
        // slight jitter around cursor tip for realistic dust scatter
        const jitterX = x + (Math.random() - 0.5) * 16;
        const jitterY = y + (Math.random() - 0.5) * 16;
        particles.push(createParticle(jitterX, jitterY, vx, vy, extraSparks));
      }

      if (particles.length > 350) {
        particles.splice(0, particles.length - 350);
      }
    };

    const handlePointerMove = (e) => {
      const count = isMouseDown ? 12 : 5;
      spawnParticles(e.clientX, e.clientY, count, isMouseDown);
    };

    const handlePointerDown = (e) => {
      isMouseDown = true;
      spawnParticles(e.clientX, e.clientY, 18, true);
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    const handlePointerLeave = () => {
      isMouseDown = false;
      lastMousePos = null;
    };

    parent.addEventListener("pointermove", handlePointerMove, { passive: true });
    parent.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    parent.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    let lastTime = performance.now();
    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // realistic air resistance
        p.vy *= 0.95;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;
        p.twinklePhase += p.twinkleRate;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const twinkle = 0.75 + 0.25 * Math.sin(p.twinklePhase);
        const alpha = Math.max(0, p.life * twinkle);
        const currentSize = p.size * (0.35 + 0.65 * p.life);

        if (p.isStar) {
          drawSparkleStar(
            ctx,
            p.x,
            p.y,
            4,
            currentSize,
            currentSize * 0.25,
            p.rotation,
            p.color,
            alpha
          );
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, currentSize * 0.45), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, Math.max(0, alpha * 0.9));
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      parent.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [countMultiplier, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`star-cursor-trail-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
