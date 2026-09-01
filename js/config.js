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
    { video: "https://assets.mixkit.co/videos/8190/8190-720.mp4",   poster: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80" }, // villas on a sunny day
    { video: "https://assets.mixkit.co/videos/8630/8630-720.mp4",   poster: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80" }, // country house with pool at sunset
    { video: "https://assets.mixkit.co/videos/48394/48394-720.mp4", poster: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80" }, // flying over quiet suburban streets
    { video: "https://assets.mixkit.co/videos/24945/24945-720.mp4", poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" }, // modern houses at the edge of town
    { video: "https://assets.mixkit.co/videos/8603/8603-720.mp4",   poster: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80" }, // aerial over a manor house + orchard
    { video: "https://assets.mixkit.co/videos/27543/27543-720.mp4", poster: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80" }  // modern house on the beach
  ],
  //  prefer stills? just drop in photo URLs instead, e.g.:
  //  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",  // white 2-storey, big lawn

  /* Only used if heroSlides above is emptied out: */
  heroImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
  heroVideo: "",

  /* ---------------------------------------------------------------------------
     ENQUIRE — full-bleed background photo behind the "Get your free market
     evaluation" form. 1600 x 900 or wider; it sits dark and low-contrast.
     --------------------------------------------------------------------------- */
  enquireBg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",

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
