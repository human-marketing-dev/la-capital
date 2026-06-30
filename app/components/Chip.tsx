import type { ReactNode } from "react";

/* Material / product / compatibility pill. `light` on white surfaces,
   `dark` on the ink compatibility band. */
export function Chip({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span className={tone === "dark" ? "lc-chip lc-chip--dark" : "lc-chip"}>
      {children}
    </span>
  );
}
