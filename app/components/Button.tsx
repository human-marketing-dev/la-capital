import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* La Capital button. Conversion-first: `wa` (WhatsApp green) is the primary
   action, `brand` (yellow) is the submit/brand action, `dark`/outlines are
   secondary. Hover/press are handled entirely in CSS (see globals.css). */
type Variant = "wa" | "brand" | "dark" | "outline-light" | "outline-ink";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<Variant, string> = {
  wa: "lc-btn--wa",
  brand: "lc-btn--brand",
  dark: "lc-btn--dark",
  "outline-light": "lc-btn--outline-light",
  "outline-ink": "lc-btn--outline-ink",
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
    ...rest
  } = props;

  const cls = classes(variant, size, full, className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonElProps)}>
      {icon}
      {children}
    </button>
  );
}
