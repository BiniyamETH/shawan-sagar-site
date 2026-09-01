/* =============================================================================
   SHAWAN SAGAR  —  SITE MEDIA CONFIG
   -----------------------------------------------------------------------------
   This is the ONLY file you need to touch to change the photos and videos.
   Edit the values below, save, and refresh the page.

   HOW TO USE YOUR OWN FILES
   1. Drop your images / videos into the  /assets  folder.
   2. Point the setting at them, e.g.:
        heroVideo: "assets/my-drone-shot.mp4"
        enquireBg: "assets/office.jpg"
   3. You can also paste any full web link (https://...).

   Tip: keep every local image under ~1600px wide / 200KB. If you add a
   "photo.webp" next to "photo.jpg", the site serves the smaller .webp
   automatically (and falls back to the .jpg on older browsers).

   Leave a value as an empty string  ""  to fall back to the built-in
   animated background (used for heroVideo only).
   ============================================================================= */

window.SITE_MEDIA = {

  /* ---------------------------------------------------------------------------
     HERO — the background plays this list of HOUSE CLIPS, one every ~7 seconds,
     cross-fading between them with a slow zoom. Add / remove / reorder freely.
     An entry is either:
        { video: "https://.../clip.mp4",         a short clip
          poster: "https://.../still.jpg" }      shown instantly while it loads
        "https://.../house.jpg"                 or just a photo
     heroSlideSeconds = how long each clip stays before the next (lower = faster;
     the cross-fade and slow zoom auto-adjust to stay smooth, floor ~0.3).
     heroClipSpeed    = video playback rate (1 = normal, 1.5 = faster).
     --------------------------------------------------------------------------- */
  heroSlideSeconds: 7,
  heroClipSpeed: 1.5,
  heroSlides: [
    { video: "assets/hero-1-residential-street.mp4", poster: "assets/hero-1-poster.jpg" }, // elegant houses on a quiet residential street
    { video: "assets/hero-2-stone-brick-house.mp4", poster: "assets/hero-2-poster.jpg" }, // grand stone & brick house
    { video: "assets/hero-3-house-facade.mp4",      poster: "assets/hero-3-poster.jpg" }, // charming house facade, warm tones
    { video: "assets/hero-4-modern-exterior.mp4",   poster: "assets/hero-4-poster.jpg" }  // modern house exterior
  ],
  //  prefer stills? just drop in photo URLs instead, e.g.:
  //  "assets/hero-fallback.jpg",  // white 2-storey, big lawn

  /* Only used if heroSlides above is emptied out: */
  heroImage: "assets/hero-fallback.jpg",
  heroVideo: "",

  /* ---------------------------------------------------------------------------
     ENQUIRE — full-bleed background photo behind the "Get your free market
     evaluation" form. 1600 x 900 or wider; it sits dark and low-contrast.
     --------------------------------------------------------------------------- */
  enquireBg: "assets/enquire-bg.jpg",

  /* ---------------------------------------------------------------------------
     FORM — where the enquiry form sends to.
       ""  (default) opens the visitor's email app addressed to Shawan.
       Paste a Formspree / Getform / Basin endpoint URL to receive submissions
       straight to your inbox with no email-app step, e.g.
       formEndpoint: "https://formspree.io/f/xxxxxxx"
     --------------------------------------------------------------------------- */
  formEndpoint: "",

  /* ===========================================================================
     LISTINGS ("homes for sale") live in  js/listings.js  — edit that by hand,
     or use the  admin.html  form.
     =========================================================================== */
};
