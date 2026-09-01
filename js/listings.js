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
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ],
    video: ""
  }
];
