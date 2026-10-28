import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { ScrollRevealProvider } from "../components/ScrollRevealProvider";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-7xl font-bold text-foreground">404</h1><h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2><p className="mt-2 text-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p><Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link></div></div>;
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-xl font-semibold text-foreground">This page didn&apos;t load</h1><p className="mt-2 text-sm text-muted-foreground">Something went wrong. Please try again.</p><button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground">Try again</button></div></div>;
}
export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SS Production House — Graphic Designer & Spatial Studio" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" },
      { rel: "icon", type: "image/png", href: "/sslogo.png" },
      { rel: "shortcut icon", type: "image/png", href: "/sslogo.png" },
      { rel: "apple-touch-icon", href: "/sslogo.png" },
    ],
  }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><ScrollRevealProvider /><Outlet /><FloatingWhatsApp /></QueryClientProvider>; }
