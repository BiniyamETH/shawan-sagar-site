/* =============================================================================
   SHAWAN SAGAR  —  SITE MEDIA CONFIG
   -----------------------------------------------------------------------------
   This is the ONLY file you need to touch to change the photos and videos.
   Edit the values below, save, and refresh the page.

   HOW TO USE YOUR OWN FILES
   1. Drop your images / videos into the  /assets  folder.
   2. Point the setting at them, e.g.:
        heroVideo: "assets/my-drone-shot.mp4"
        aboutImage: "assets/shawan-headshot.jpg"
   3. You can also paste any full web link (https://...).

   Leave a value as an empty string  ""  to fall back to the built-in
   animated background (used for heroVideo only).
   ============================================================================= */

window.SITE_MEDIA = {

  /* ---------------------------------------------------------------------------
     HERO — the background cross-fades through this list of HOUSES, one every
     ~6 seconds, each with a slow zoom. Add / remove / reorder freely.
     An entry is either:
        "https://.../house.jpg"                 a photo
        { video: "https://.../clip.mp4",         a short clip
          poster: "https://.../still.jpg" }
     --------------------------------------------------------------------------- */
  heroSlides: [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80", // white 2-storey, big lawn
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", // dark modern, dusk
    "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1600&q=80", // brick detached, trees
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80", // wood modern, warm lights
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80", // stone detached + garage
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80", // house down a tree-lined drive
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80", // white house, pool, blue sky
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80", // modern white/wood, dusk
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1600&q=80", // grey house, big lawn
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80"  // white luxury modern, pool
  ],
  //  swap any line for a clip, e.g.:
  //  { video: "https://assets.mixkit.co/videos/48394/48394-720.mp4", poster: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600" },  // aerial over a subdivision

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

  /* ---------------------------------------------------------------------------
     ABOUT — the tall portrait image next to "Real estate, done properly."
     Best result: a vertical photo, roughly 900 x 1100 px.
     --------------------------------------------------------------------------- */
  aboutImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",

  /* ===========================================================================
     LISTINGS ("homes for sale") live in  js/listings.js  — edit that by hand,
     or use the  admin.html  form.
     =========================================================================== */
};
