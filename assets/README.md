# /assets — your photos & videos

Put your own image and video files in this folder, then point the site at them
from **`../js/config.js`** (the only file you need to edit for media).

## Example

1. Copy files here:

   ```
   assets/
     hero-skyline.mp4
     listing-northyork-1.jpg
   ```

2. Open `js/config.js` and reference them:

   ```js
   heroSlides: [
     { video: "assets/hero-skyline.mp4", poster: "assets/listing-northyork-1.jpg" },
   ],
   enquireBg: "assets/listing-northyork-1.jpg",
   ```

3. Save and refresh the browser.

Homes for sale (photos + video) are a separate file — see `js/listings.js`, or
edit them visually through `admin.html`.

## Recommended sizes

| Slot        | Type   | Size (px)      | Notes                                  |
|-------------|--------|----------------|-----------------------------------------|
| heroSlides video | .mp4 | 1920×1080  | short loop, no audio needed, < ~10 MB  |
| heroSlides poster | .jpg | 1600×900  | shown instantly while the clip loads, and as the fallback if it fails |
| enquireBg   | .jpg   | 1600×900 or wider | sits dark and low-contrast behind the form |

Any `https://` link works too — you don't have to download files locally.
