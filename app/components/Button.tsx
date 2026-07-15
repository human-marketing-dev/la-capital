"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { pushEvent } from "../lib/tracking";
import { openWhatsAppWidget } from "../lib/whatsappWidget";

/* La Capital button. Conversion-first: `wa` (WhatsApp green) is the primary
   action, `brand` (yellow) is the submit/brand action, `dark`/outlines are
   secondary. Hover/press are handled entirely in CSS (see globals.css).
   Pass `track="<event>"` to fire that measurement event on click (via the
   central tracking helper) — used for tel:, "cómo llegar" and WhatsApp CTAs. */
type Variant =
  | "wa"
  | "brand"
  | "dark"
  | "outline-light"
  | "outline-ink"
  | "ink-yellow";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<Variant, string> = {
  wa: "lc-btn--wa",
  brand: "lc-btn--brand",
  dark: "lc-btn--dark",
  "outline-light": "lc-btn--outline-light",
  "outline-ink": "lc-btn--outline-ink",
  "ink-yellow": "lc-btn--ink-yellow",
};

const SIZE_CLASS: Record<Size, string> = {
  sm: "lc-btn--sm",
  md: "",
  lg: "lc-btn--lg",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Measurement event fired on click via the central tracking helper. */
  track?: string;
  /** Open the floating WhatsApp chat card on click instead of navigating. */
  opensWhatsAppWidget?: boolean;
};

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & { href: string };
type ButtonElProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };

function classes(variant: Variant, size: Size, full?: boolean, extra?: string) {
  return [
    "lc-btn",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    full ? "lc-btn--full" : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: AnchorProps | ButtonElProps) {
  const {
    variant = "brand",
    size = "md",
    full,
    icon,
    children,
    className,
    track,
    opensWhatsAppWidget,
    onClick,
    ...rest
  } = props;

  const cls = classes(variant, size, full, className);

  const handleClick =
    track || opensWhatsAppWidget || onClick
      ? (e: MouseEvent<HTMLElement>) => {
          if (opensWhatsAppWidget) {
            e.preventDefault();
            openWhatsAppWidget();
          } else if (track) {
            pushEvent(track);
          }
          (onClick as ((ev: MouseEvent<HTMLElement>) => void) | undefined)?.(e);
        }
      : undefined;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof BaseProps>;
    return (
      <a href={href} className={cls} onClick={handleClick} {...anchorRest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button
      className={cls}
      onClick={handleClick}
      {...(rest as Omit<ButtonElProps, keyof BaseProps>)}
    >
      {icon}
      {children}
    </button>
  );
}
