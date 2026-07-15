import type { CSSProperties } from "react";

/* Off-screen honeypot styling for the lead forms. Kept visible to the DOM
   (bots fill it) but out of view and out of the tab order for humans — NOT
   display:none, which many bots skip. Pair with name="website", aria-hidden,
   tabIndex={-1}, autoComplete="off". */
export const honeypotStyle: CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: 1,
  height: 1,
  opacity: 0,
  overflow: "hidden",
};
