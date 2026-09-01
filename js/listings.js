/* =============================================================================
   THE HOMES SHAWAN IS SELLING
   -----------------------------------------------------------------------------
   Easiest: open  admin.html  in a browser, use the form, click Save.
   (Works on your own computer — no website or hosting needed.)

   Or edit by hand — each { } block below is one home. Copy a block to add another.

     status  : "For sale" | "Sold" | "Pending" | "Leased"
     price   : any text, e.g. "$1,199,000"
     address : street + area
     beds, baths : numbers
     type    : "Detached" | "Semi-detached" | "Condo" | "Townhome" | "Bungalow" …
     blurb   : a sentence or two
     photos  : list of picture links — a file you put in /assets
               ("assets/42-maple-1.jpg") or a full https:// link.
               The FIRST photo is the cover shown on the card.
     video   : "" or a walkthrough link (optional)

   Save the file and refresh — the "Homes for sale" section updates. No rebuild.
   ============================================================================= */
window.SITE_LISTINGS = [
  {
    status: "For sale",
    price: "$1,199,000",
    address: "42 Maple Grove Ave, North York",
    beds: 4, baths: 3, type: "Detached",
    blurb: "Renovated 4-bed on a 40-ft lot, minutes to Yonge & Sheppard. New kitchen, finished basement, private drive.",
    photos: [
      "assets/maple-grove-1.jpg",
      "assets/maple-grove-2.jpg",
      "assets/maple-grove-3.jpg",
      "assets/maple-grove-4.jpg",
      "assets/maple-grove-5.jpg"
    ],
    video: ""
  },
  {
    status: "For sale",
    price: "$789,000",
    address: "1201–55 Front St E, Downtown Toronto",
    beds: 2, baths: 2, type: "Condo",
    blurb: "Bright 2-bed + den corner suite with an open kitchen, floor-to-ceiling windows and a west-facing balcony. Locker + parking.",
    photos: [
      "assets/front-st-1.jpg",
      "assets/front-st-2.jpg",
      "assets/front-st-3.jpg"
    ],
    video: ""
  },
  {
    status: "For sale",
    price: "$1,050,000",
    address: "8 Birchcliff Rd, Etobicoke",
    beds: 3, baths: 2, type: "Bungalow",
    blurb: "Detached bungalow on a deep, mature lot. Hardwood throughout, updated bath, separate side entrance — great income potential.",
    photos: [
      "assets/birchcliff-1.jpg",
      "assets/birchcliff-2.jpg",
      "assets/birchcliff-3.jpg",
      "assets/birchcliff-4.jpg"
    ],
    video: ""
  },
  {
    status: "Pending",
    price: "$1,375,000",
    address: "26 Cornell Common, Markham",
    beds: 4, baths: 4, type: "Townhome",
    blurb: "Executive freehold townhome in Cornell — 9-ft ceilings, double garage, walk to the community centre and GO.",
    photos: [
      "assets/cornell-1.jpg",
      "assets/cornell-2.jpg",
      "assets/cornell-3.jpg"
    ],
    video: ""
  },
  {
    status: "Sold",
    price: "Sold — $1,140,000",
    address: "73 Woodville Ave, East York",
    beds: 3, baths: 2, type: "Semi-detached",
    blurb: "Sold firm in 8 days, over asking. First-time-seller consultation, staging, and a full online + community campaign.",
    photos: [
      "assets/woodville-1.jpg",
      "assets/woodville-2.jpg",
      "assets/woodville-3.jpg"
    ],
    video: ""
  },
  {
    status: "For sale",
    price: "$1,650,000",
    address: "19 Rosedale Heights Dr, Toronto",
    beds: 5, baths: 4, type: "Detached",
    blurb: "Renovated 5-bed on a premium Rosedale lot — chef's kitchen, landscaped garden, walk to the ravine.",
    photos: [
      "assets/rosedale-1.jpg",
      "assets/rosedale-2.jpg"
    ],
    video: ""
  }
];
