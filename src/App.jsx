import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRevealProvider } from "./components/ScrollRevealProvider";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

// Route Pages
import HomePage from "./routes/index";
import WorksPage from "./routes/works";
import PackagingDesignPage from "./routes/packaging-design";
import UiUxDesignPage from "./routes/ui-ux-design";
import WebsiteDesignPage from "./routes/website-design";
import BrandDevelopmentPage from "./routes/brand-development";
import BrandStrategyPage from "./routes/brand-strategy";
import ProductShapeDesignPage from "./routes/product-shape-design";
import PhotographyPage from "./routes/photography";
import SocialMediaMarketingPage from "./routes/social-media-marketing";
import PaidMarketingPage from "./routes/paid-marketing";
import SearchEngineOptimizationPage from "./routes/search-engine-optimization";
import AdsDesignPage from "./routes/ads-design";
import ServicesPage from "./routes/services";
import ProfilePage from "./routes/profile";
import ClientsPage from "./routes/clients";
import ContactPage from "./routes/contact";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollRevealProvider />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/packaging-design" element={<PackagingDesignPage />} />
        <Route path="/ui-ux-design" element={<UiUxDesignPage />} />
        <Route path="/website-design" element={<WebsiteDesignPage />} />
        <Route path="/brand-development" element={<BrandDevelopmentPage />} />
        <Route path="/brand-strategy" element={<BrandStrategyPage />} />
        <Route path="/product-shape-design" element={<ProductShapeDesignPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/social-media-marketing" element={<SocialMediaMarketingPage />} />
        <Route path="/paid-marketing" element={<PaidMarketingPage />} />
        <Route path="/search-engine-optimization" element={<SearchEngineOptimizationPage />} />
        <Route path="/ads-design" element={<AdsDesignPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Redirect aliases */}
        <Route path="/about" element={<Navigate to="/profile" replace />} />
        <Route path="/our-clients" element={<Navigate to="/clients" replace />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
