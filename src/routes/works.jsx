import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Page3DBackdrop } from "@/components/ClientCanvas";
import { StudioMascot } from "@/components/StudioMascot";
import { PlaybookWorksSection } from "@/components/PlaybookWorksSection";
import { MeaningfulContactSection } from "@/components/MeaningfulContactSection";
import { TextReveal } from "@/components/TextReveal";

export const Route = createFileRoute("/works")({
  validateSearch: (search) => ({
    category: typeof search?.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products & Design Works — SS Production House" },
      {
        name: "description",
        content:
          "Explore our complete product catalog and design portfolio across Book Design, Box Design, Label Design, Logo, Meter Design, Mockup, Product Photoshoot, Social Media Posts, and Visiting Cards.",
      },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const search = useSearch({ from: "/works" });
  const navigate = useNavigate({ from: "/works" });
  const cursorRef = useRef(null);
  const selectedCategory = search?.category || "all";

  useEffect(() => {
    const move = (event) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const handleCategoryChange = (newCat) => {
    if (newCat === "all") {
      navigate({ search: {}, replace: true });
    } else {
      navigate({ search: { category: newCat }, replace: true });
    }
  };

  return (
    <div className="portfolio-shell page-shell" ref={cursorRef}>
      <div className="cursor-wash" aria-hidden="true" />
      <SiteHeader />

      <main className="page-main">
        {/* Page Hero Header with 3D Backdrop & Studio Mascot */}
        <section className="page-header-section page-header-3d">
          <div className="page-header-3d-stage" aria-hidden="true">
            <Page3DBackdrop />
          </div>
          <div className="page-header-inner page-header-with-mascot">
            <div className="page-header-text">
              <p className="section-index">
                <span>01</span> <TextReveal triggerOnMount delay={0.06}>Products &amp; Selected Works</TextReveal>
              </p>
              <h1 className="page-hero-title">
                <TextReveal triggerOnMount delay={0.16} stagger={0.06}>
                  Crafted for Impact.
                </TextReveal>
                <br />
                <em>
                  <TextReveal triggerOnMount delay={0.32} stagger={0.06}>
                    Tactile Design Reel.
                  </TextReveal>
                </em>
              </h1>
              <p className="page-hero-lead">
                <TextReveal triggerOnMount delay={0.48} stagger={0.016}>
                  Every product dieline, packaging architecture, commercial photoshoot, and hardcover book is crafted with obsession for detail, material precision, and print excellence.
                </TextReveal>
              </p>
            </div>
            <div className="page-header-mascot-slot">
              <StudioMascot size={260} label="Works Mascot" />
            </div>
          </div>
        </section>

        {/* Dedicated Interactive Products & Works Grid with ALL Buttons (matching Image 3) */}
        <PlaybookWorksSection
          initialCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Meaningful Discussion Contact Section matching Image 2 */}
        <MeaningfulContactSection />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
