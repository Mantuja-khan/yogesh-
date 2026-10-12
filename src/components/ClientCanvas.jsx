import { lazy, Suspense, useEffect, useState } from "react";

const DesignerScene = lazy(() => import("@/components/DesignerScene"));
const StudioBackdrop = lazy(() => import("@/components/StudioBackdrop"));

function useClientReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}

export function Hero3D() {
  const ready = useClientReady();
  if (!ready) return <div className="hero-3d-fallback" aria-hidden="true" />;
  return (
    <Suspense fallback={<div className="hero-3d-fallback" aria-hidden="true" />}>
      <DesignerScene />
    </Suspense>
  );
}

export function Page3DBackdrop() {
  const ready = useClientReady();
  if (!ready) return <div className="page-3d-fallback" aria-hidden="true" />;
  return (
    <Suspense fallback={<div className="page-3d-fallback" aria-hidden="true" />}>
      <StudioBackdrop />
    </Suspense>
  );
}
