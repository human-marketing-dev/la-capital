"use client";

import type { CSSProperties, ReactNode } from "react";
import { pushEvent } from "../lib/tracking";

/* Small client anchor that fires a measurement event on click via the central
   tracking helper. For raw links that aren't <Button> (footer links, the brand
   placeholder call button, the reverse-routing catalog link). */
export function TrackedLink({
  event,
  payload,
  href,
  className,
  style,
  target,
  rel,
  children,
}: {
  event: string;
  payload?: Record<string, unknown>;
  href: string;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      target={target}
      rel={rel}
      onClick={() => pushEvent(event, payload)}
    >
      {children}
    </a>
  );
}
