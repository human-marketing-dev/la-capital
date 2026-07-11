"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureParams } from "../lib/tracking";

/* Captures + persists URL attribution params on every route change. Mounted in
   the root layout inside a <Suspense> boundary (useSearchParams requires one, or
   it opts the whole tree out of static rendering). Renders nothing. */
export function TrackingInit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureParams(new URLSearchParams(searchParams.toString()));
  }, [pathname, searchParams]);

  return null;
}
