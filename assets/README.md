# /assets — your photos & videos

Put your own image and video files in this folder, then point the site at them
from **`../js/config.js`** (the only file you need to edit).

## Example

1. Copy files here:

   ```
   assets/
     hero-skyline.mp4
     shawan-headshot.jpg
     listing-northyork-1.jpg
     condo-tour.mp4
   ```

2. Open `js/config.js` and reference them:

   ```js
   heroVideo:  "assets/hero-skyline.mp4",
   aboutImage: "assets/shawan-headshot.jpg",

   gallery: [
     { type: "image", src: "assets/listing-northyork-1.jpg", tag: "Sold", caption: "Detached · North York" },
     { type: "video", src: "assets/condo-tour.mp4", poster: "assets/listing-northyork-1.jpg", tag: "Walkthrough", caption: "Condo tour · Downtown" }
   ]
   ```

3. Save and refresh the browser.

## Recommended sizes

| Slot        | Type   | Size (px)      | Notes                                  |
|-------------|--------|----------------|----------------------------------------|
| heroVideo   | .mp4   | 1920×1080      | short loop, no audio needed, < ~10 MB  |
| aboutImage  | .jpg   | 900×1100 (tall)| vertical portrait                      |
| gallery img | .jpg   | 900×675 (4:3)  | landscape                              |
| gallery vid | .mp4   | 1280×960 (4:3) | keep short                             |

Any `https://` link works too — you don't have to download files locally.
