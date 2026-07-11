/* Global ambient types. `window.dataLayer` is the GTM / GA4 event queue; it is
   pushed to today from the WhatsApp widget CTA and will be the target of the
   central tracking helper once GTM is installed. */
export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
