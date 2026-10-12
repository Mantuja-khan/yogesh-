import React from "react";
import { portfolio } from "@/lib/portfolioData";

export function FloatingWhatsApp() {
  // Format phone number for WhatsApp url: remove spaces, plus, hyphens
  const rawPhone = portfolio.phone || "+919671445186";
  const cleanPhone = rawPhone.replace(/[^\d]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello Yogesh, I would like to inquire about design and production services.")}`;

  return (
    <aside aria-label="WhatsApp Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        {/* Blinking / Pulsing radar wave rings */}
        <span className="whatsapp-pulse-ring" aria-hidden="true" />
        <span className="whatsapp-pulse-ring whatsapp-pulse-ring-2" aria-hidden="true" />

        {/* WhatsApp Icon SVG */}
        <svg
          viewBox="0 0 32 32"
          className="whatsapp-icon-svg"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.64.73 5.12 2 7.24L2 30l6.98-1.96C11.04 29.2 13.44 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.54c-2.26 0-4.38-.66-6.18-1.8l-.44-.28-4.58 1.28 1.3-4.46-.3-.48C4.54 19.96 3.9 18.04 3.9 16c0-6.68 5.42-12.1 12.1-12.1 6.68 0 12.1 5.42 12.1 12.1s-5.42 12.1-12.1 12.1zm6.64-9.06c-.36-.18-2.16-1.06-2.5-1.18-.34-.12-.58-.18-.82.18-.24.36-.94 1.18-1.16 1.42-.22.24-.44.26-.8.08-.36-.18-1.52-.56-2.9-1.8-1.08-.96-1.8-2.14-2.02-2.5-.22-.36-.02-.56.16-.74.16-.16.36-.42.54-.62.18-.2.24-.34.36-.58.12-.24.06-.44-.02-.62-.1-.18-.82-1.98-1.12-2.7-.3-.72-.6-.62-.82-.64h-.7c-.24 0-.62.1-.94.44-.32.36-1.24 1.22-1.24 2.96 0 1.74 1.26 3.44 1.44 3.68.18.24 2.48 3.8 6.02 5.32.84.36 1.5.58 2.02.74.86.28 1.64.24 2.26.14.7-.1 2.16-.88 2.46-1.74.3-.86.3-1.6.22-1.74-.1-.14-.34-.22-.7-.4z" />
        </svg>

        {/* Hover Tooltip Label */}
        <span className="whatsapp-tooltip-tag">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
