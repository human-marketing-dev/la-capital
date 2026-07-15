"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { pushEvent } from "../lib/tracking";
import { openWhatsAppWidget } from "../lib/whatsappWidget";

/* Small client anchor for raw links that aren't <Button> (footer links, the
   brand placeholder call button, the reverse-routing catalog link). Fires a
   measurement event on click, or — with `opensWhatsAppWidget` — opens the
   floating WhatsApp chat card instead of navigating (href stays as a no-JS
   fallback). */
export function TrackedLink({
  event,
  payload,
  href,
  className,
  style,
  target,
  rel,
  opensWhatsAppWidget,
  children,
}: {
  event?: string;
  payload?: Record<string, unknown>;
  href: string;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  opensWhatsAppWidget?: boolean;
  children: ReactNode;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (opensWhatsAppWidget) {
      e.preventDefault();
      openWhatsAppWidget();
    } else if (event) {
      pushEvent(event, payload);
    }
  };
  return (
    <a
      href={href}
      className={className}
      style={style}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
