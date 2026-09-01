#!/usr/bin/env python3
"""
Build the Shawan Sagar site — 34 pages that share one header, footer and set
of effects.  Edit the content below (or partials/home-main.html), then run:

    python build.py

Every .html file in PAGES is (re)written.  css/, js/ and partials/ are left alone.
"""
import os, re, html, pathlib

ROOT = pathlib.Path(__file__).parent
SITE_NAME = "Shawan Sagar"
PHONE = "416.876.0773"
TEL = "+14168760773"
EMAIL = "shawanibs@gmail.com"

# --------------------------------------------------------------------------- nav
NAV_ITEMS = [
    ("what-i-do",     "What I Do",     "what-i-do.html"),
    ("how-it-works",  "How It Works",  "how-it-works.html"),
    ("about",         "About",         "about.html"),
    ("homes",         "Homes",         "homes.html"),
    ("areas",         "Areas",         "areas.html"),
    ("faq",           "FAQ",           "faq.html"),
    ("contact",       "Contact",       "contact.html"),
]

AREAS = [
    ("toronto",     "Toronto",     "Downtown, the Beaches, Leslieville, the Annex and everything in between — the core of the market Shawan works every week."),
    ("east-york",   "East York",   "Leaside, Danforth Village and O'Connor–Parkview: tight-knit pockets where the right pricing and quick marketing matter."),
    ("scarborough", "Scarborough", "From the Bluffs to Agincourt — a huge range of homes and price points, and a lot of first-time-buyer opportunity."),
    ("north-york",  "North York",  "Willowdale, Bayview Village, Lawrence Park North and beyond — larger detached homes where negotiation makes a real dollar difference."),
    ("etobicoke",   "Etobicoke",   "Mimico, the Kingsway, Islington and Humber Bay: lakeside condos and established detached streets alike."),
    ("markham",     "Markham",     "Unionville, Cornell and Berczy — family-driven demand, new and resale, with buyers who move fast on the right home."),
    ("pickering",   "Pickering",   "Amberlea, Rosebank and the growing City Centre — commuter-friendly value just east of the city."),
    ("ajax",        "Ajax",        "Lakeside communities and newer subdivisions with strong first-time and move-up buyer activity."),
    ("mississauga", "Mississauga", "Port Credit, Lorne Park, Streetsville and the Square One core — a full spectrum from waterfront to high-rise."),
    ("brampton",    "Brampton",    "Springdale, Mount Pleasant and Credit Valley — scalable marketing for a fast-moving, high-volume market."),
]

# --------------------------------------------------------------- shared snippets
def head(title, desc):
    full = title if title.startswith(SITE_NAME) else f"{title} | {SITE_NAME} — HomeLife Today Realty"
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(full)}</title>
  <meta name="description" content="{html.escape(desc)}" />
  <meta name="theme-color" content="#05070e" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%97%86%3C/text%3E%3C/svg%3E" />
  <noscript><style>[data-reveal],[data-reveal-words] .word{{opacity:1!important;transform:none!important;filter:none!important}}.hero__video,.fx-particles{{display:none}}</style></noscript>
</head>
<body>
  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
  <canvas class="fx-particles" id="fxParticles" aria-hidden="true"></canvas>
  <div class="fx-grid" aria-hidden="true"></div>
  <div class="fx-aurora" aria-hidden="true"><span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span></div>
  <div class="fx-noise" aria-hidden="true"></div>
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
"""

def nav(active):
    links = []
    for key, label, href in NAV_ITEMS:
        cur = ' class="is-current" aria-current="page"' if key == active else ""
        links.append(f'<a href="{href}"{cur}>{label}</a>')
    return f"""  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="index.html" class="brand" aria-label="{SITE_NAME} — home">
        <span class="brand__mark" aria-hidden="true">◆</span>
        <span class="brand__text">Shawan <span>Sagar</span></span>
      </a>
      <nav class="nav__links" id="navLinks" aria-label="Primary">
        {''.join(links)}
      </nav>
      <a href="tel:{TEL}" class="btn btn--ghost nav__call" data-magnetic>
        <span class="pulse-dot" aria-hidden="true"></span> Call {PHONE}
      </a>
      <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>
"""

FOOTER_GROUPS = [
    ("Buying", [
        ("Working with buyers", "buyers.html"),
        ("First-time buyers", "first-time-buyers.html"),
        ("Mortgages & lenders", "mortgages.html"),
        ("Relocating to the GTA", "relocating-to-the-gta.html"),
        ("Investment properties", "investment-properties.html"),
    ]),
    ("Selling", [
        ("Working with sellers", "sellers.html"),
        ("Free market evaluation", "market-evaluation.html"),
        ("Pricing your home", "pricing-your-home.html"),
        ("Staging", "staging.html"),
        ("The selling process", "selling-process.html"),
        ("Negotiation", "negotiation.html"),
        ("Closing day", "closing-day.html"),
        ("Downsizing", "downsizing.html"),
        ("Moving checklist", "moving-checklist.html"),
    ]),
    ("Areas served", [(name, f"area-{slug}.html") for slug, name, _ in AREAS]),
    ("More", [
        ("About Shawan", "about.html"),
        ("How it works", "how-it-works.html"),
        ("Homes for sale", "homes.html"),
        ("Common questions", "faq.html"),
        ("Testimonials", "testimonials.html"),
        ("Contact", "contact.html"),
    ]),
]

def footer():
    cols = ""
    for title, items in FOOTER_GROUPS:
        lis = "".join(f'<li><a href="{href}">{html.escape(t)}</a></li>' for t, href in items)
        cols += f'<div><h4>{title}</h4><ul>{lis}</ul></div>'
    return f"""  <section class="ctaband">
    <div class="container ctaband__inner">
      <div data-reveal>
        <h2>Thinking of a move?</h2>
        <p>Start with a free, confidential call. No pressure, no obligation.</p>
      </div>
      <div class="ctaband__actions" data-reveal>
        <a href="tel:{TEL}" class="btn btn--primary" data-magnetic>Call {PHONE}</a>
        <a href="contact.html" class="btn btn--ghost" data-magnetic>Send a message</a>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <span class="brand__mark" aria-hidden="true">◆</span>
          <div><strong>{SITE_NAME}</strong><span>Real Estate Sales Representative</span></div>
        </div>
        <nav class="footer__nav" aria-label="Site">{cols}</nav>
      </div>
      <p class="footer__meta">HomeLife Today Realty Ltd., Brokerage · Toronto · Independently owned and operated. Not intended to solicit buyers or sellers currently under contract with a brokerage.</p>
      <p class="footer__copy">© <span id="year">2026</span> {SITE_NAME}. All rights reserved. · Direct {PHONE} · Office 416.298.3200 · {EMAIL}</p>
    </div>
  </footer>

  <a href="tel:{TEL}" class="fab" aria-label="Call {SITE_NAME}">
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.58 3.6 1 1 0 01-.24 1z" fill="currentColor"/></svg>
    <span class="fab__ring" aria-hidden="true"></span>
  </a>

  <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Project details">
    <div class="lightbox__panel">
      <button class="lightbox__close" id="lightboxClose" aria-label="Close">✕</button>
      <div class="lightbox__media" id="lightboxStage"></div>
      <div class="lightbox__info" id="lightboxInfo"></div>
    </div>
  </div>

  <script>
    (function () {{
      var b = "?t=" + Date.now();
      document.write('<script src="js/config.js' + b + '"><\\/script>');
      document.write('<script src="js/listings.js' + b + '"><\\/script>');
      document.write('<script src="js/main.js' + b + '"><\\/script>');
    }})();
  </script>
</body>
</html>
"""

def page_hero(kicker, title, lead, img="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"):
    return f"""    <section class="page-hero">
      <div class="page-hero__bg" style="background-image:url('{img}')" aria-hidden="true"></div>
      <div class="page-hero__scrim" aria-hidden="true"></div>
      <div class="container page-hero__inner">
        <p class="kicker" data-reveal>{html.escape(kicker)}</p>
        <h1 class="page-hero__title" data-reveal data-reveal-words>{html.escape(title)}</h1>
        <p class="page-hero__lead" data-reveal>{html.escape(lead)}</p>
      </div>
    </section>
"""

def section(inner, alt=False):
    cls = "section section--alt" if alt else "section"
    return f'    <section class="{cls}"><div class="container">{inner}</div></section>\n'

def prose(blocks):
    out = '<div class="prose" data-reveal>'
    for b in blocks:
        out += b
    return out + "</div>"

def ticklist(items):
    return '<ul class="ticklist">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

def linkgrid(items):
    cells = ""
    for label, href, note in items:
        cells += f'<a class="linkcard" href="{href}" data-reveal data-tilt><span class="linkcard__t">{html.escape(label)}</span><span class="linkcard__n">{html.escape(note)}</span><span class="linkcard__go">Open →</span></a>'
    return f'<div class="linkgrid">{cells}</div>'

def wrap(slug, title, desc, active, body):
    return head(title, desc) + nav(active) + '  <main id="top">\n' + body + '  </main>\n' + footer()

def write(slug, content):
    (ROOT / f"{slug}.html").write_text(content, encoding="utf-8")
    print("  wrote", slug + ".html")

# --------------------------------------------------------------------------- home
HOME_MAIN = (ROOT / "partials" / "home-main.html").read_text(encoding="utf-8")

def build_home():
    doc = head(SITE_NAME + " — Real Estate Sales Representative | HomeLife Today Realty",
               "Shawan Sagar, Real Estate Sales Representative with HomeLife Today Realty Ltd., Brokerage. An expert, efficient & experienced realtor serving Toronto and the GTA. Free, confidential market evaluations.")
    doc += nav("home")
    doc += HOME_MAIN
    doc += footer()
    write("index", doc)

# -------------------------------------------------------------- content pages
def build_pages():
    P = []  # (slug, title, desc, active, body)

    # ---- What I Do
    P.append(("what-i-do", "What I do for you",
        "A full plan for buyers and sellers across Toronto and the GTA — pricing, negotiation, marketing and guidance to close.",
        "what-i-do",
        page_hero("What I do for you", "Whether you're buying or selling, you get a full plan.",
                  "Every client gets a clear strategy from day one — not just a listing or a lockbox.")
        + section(
            '<div class="split">'
            + f'<article class="card" data-reveal data-tilt><div class="card__glow" aria-hidden="true"></div><h3>For buyers</h3>'
            + ticklist(["Ideal prices through adept negotiation",
                        "Unrivaled mortgage rates through trusted lenders",
                        "Confidential consultation &amp; market evaluation",
                        "First look at listings that actually fit your brief"])
            + '<p class="card__note"><a href="buyers.html">More on working with buyers →</a></p></article>'
            + f'<article class="card" data-reveal data-tilt><div class="card__glow" aria-hidden="true"></div><h3>For sellers</h3>'
            + ticklist(["Multiple open houses",
                        "Flyers, feature sheets &amp; property websites",
                        "Community newspapers",
                        "Social media ads",
                        "Best marketing &amp; top negotiating for expected prices"])
            + '<p class="card__note">*Staging available (conditions apply) · <a href="sellers.html">More on selling →</a></p></article>'
            + '</div>')
        + section(
            '<header class="section__head" data-reveal><p class="kicker">Go deeper</p><h2 class="section__title">Guides for each step.</h2></header>'
            + linkgrid([
                ("Free market evaluation", "market-evaluation.html", "What your home is worth today"),
                ("Pricing your home", "pricing-your-home.html", "Grounded in real comparables"),
                ("Staging", "staging.html", "What it does and when it's worth it"),
                ("The selling process", "selling-process.html", "List to close, step by step"),
                ("First-time buyers", "first-time-buyers.html", "Where to start"),
                ("Mortgages & lenders", "mortgages.html", "Getting a competitive rate"),
                ("Negotiation", "negotiation.html", "How offers actually get won"),
                ("Closing day", "closing-day.html", "Conditions, paperwork, keys"),
            ]), alt=True)))

    # ---- How It Works
    steps = [
        ("01", "Free consultation", "A confidential conversation about your goals, your timeline, and your budget — no obligation, no pressure."),
        ("02", "Market evaluation", "A clear look at what comparable homes in your area are actually selling for, so your pricing is grounded in real numbers."),
        ("03", "Strategy &amp; marketing", "Sellers get open houses, feature sheets, and online exposure. Buyers get first look at listings that fit and honest advice on each one."),
        ("04", "Negotiation &amp; close", "Firm negotiation on your behalf, then guidance through offers, conditions, and paperwork right to closing day."),
    ]
    steps_html = '<ol class="steps">' + "".join(
        f'<li class="step" data-reveal><span class="step__num">{n}</span><div class="step__body"><h3>{t}</h3><p>{d}</p></div></li>'
        for n, t, d in steps) + "</ol>"
    P.append(("how-it-works", "How it works",
        "Four straightforward steps, whether you're listing your home or looking for your next one.",
        "how-it-works",
        page_hero("How it works", "Four straightforward steps.",
                  "Whether you're listing your home or looking for your next one.")
        + section(steps_html)
        + section(prose([
            "<h2>What each stage looks like</h2>",
            "<p>The consultation is a conversation, not a pitch — you leave it knowing your options and what a realistic timeline looks like. The market evaluation puts real recent sales in front of you so any number we talk about is defensible. Marketing is built around your specific home and buyer, then negotiation is handled firmly and calmly on your behalf.</p>",
            "<p>You always know what is happening and why. Nothing is signed, sent or spent without your say-so.</p>",
        ]), alt=True)))

    # ---- About
    P.append(("about", "About Shawan Sagar",
        "Real estate, done properly — straight answers, strong negotiation, and marketing that actually reaches buyers.",
        "about",
        page_hero("About", "Real estate, done properly.",
                  "Shawan works with buyers and sellers across Toronto and the GTA, backed by HomeLife's higher standards.",
                  img="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80")
        + section(prose([
            "<p>Buying or selling a home is one of the biggest financial decisions most families ever make. Shawan approaches every file with straight answers, strong negotiation, and marketing that actually reaches buyers.</p>",
            "<p>Consultations are always confidential and come with a market evaluation of your home at no cost.</p>",
            '<blockquote class="pullquote">"Expert, efficient &amp; experienced — that\'s not a slogan, it\'s the standard for every client."<cite>Shawan Sagar · Sales Representative</cite></blockquote>',
        ]))
        + section(
            '<div class="statgrid" data-reveal>'
            '<div class="stat"><span class="stat__value" data-count="10" data-suffix="+">10+</span><span class="stat__label">Areas served</span></div>'
            '<div class="stat"><span class="stat__value" data-count="4">4</span><span class="stat__label">Step process</span></div>'
            '<div class="stat"><span class="stat__value" data-count="100" data-suffix="%">100%</span><span class="stat__label">Confidential</span></div>'
            '<div class="stat"><span class="stat__value" data-count="0" data-prefix="$">$0</span><span class="stat__label">Cost to start</span></div>'
            '</div>', alt=True)))

    # ---- Homes for sale (JS grid + photo-carousel popup, driven by js/listings.js)
    P.append(("homes", "Homes for sale",
        "The homes Shawan Sagar is selling across Toronto and the GTA. Tap any home for the full photo set, price and details.",
        "homes",
        page_hero("Homes for sale", "The homes Shawan is selling.",
                  "Tap any home for the full photo set, the price and the details — then book a viewing.")
        + section('<div class="listings" id="listings" data-reveal></div>'
                  '<p class="muted-note" data-reveal>These are sample listings — real homes and photos are managed in '
                  '<code>admin.html</code> (or <code>js/listings.js</code> by hand).</p>')))

    # ---- Areas index
    P.append(("areas", "Areas served",
        "Working with buyers and sellers across Toronto and the surrounding GTA.",
        "areas",
        page_hero("Areas served", "Toronto and the surrounding GTA.",
                  "Don't see your area? Call and ask — it's likely covered.")
        + section(linkgrid([(name, f"area-{slug}.html", blurb.split(" — ")[0][:60] + "…")
                            for slug, name, blurb in AREAS]))))

    # ---- FAQ
    faqs = [
        ("What does it cost to have a market evaluation done?",
         "Nothing. A market evaluation is free and comes with no obligation — it's simply a grounded look at what your home could sell for in today's market."),
        ("I'm a first-time buyer. Where do I start?",
         "Start with a call. We'll talk through your budget and timeline, connect you with a trusted lender for a mortgage pre-approval, and then start looking at listings that genuinely fit your brief."),
        ("How long does it take to sell a home?",
         "It depends on the area, the price, the condition of the home, and the season. The market evaluation gives you a realistic timeline before you list, and the marketing plan is built to shorten it."),
        ("Is staging available?",
         "Yes — staging is available, with some conditions depending on the property and listing. We'll go over what makes sense for your home during the consultation."),
        ("Do you help with mortgages?",
         "Shawan works with trusted lenders and can connect you with competitive mortgage rates. The lending itself is handled by the lender; the introduction and coordination are part of the service."),
        ("Is my information kept private?",
         "Always. Every consultation and market evaluation is confidential."),
    ]
    faq_html = '<div class="faq__list" data-reveal>' + "".join(
        f'<details class="qa"><summary>{q}<span class="qa__icon" aria-hidden="true"></span></summary><div class="qa__body"><p>{a}</p></div></details>'
        for q, a in faqs) + "</div>"
    P.append(("faq", "Common questions", "Good things to know before you buy or sell.",
        "faq",
        page_hero("Common questions", "Good things to know.",
                  "The questions that come up most often — and honest answers.")
        + section('<div class="faq">' + faq_html + '</div>')))

    # ---- Contact (includes the enquiry form)
    form = """<form class="enquire__form" id="enquireForm" action="mailto:%s" method="post" enctype="text/plain" novalidate data-reveal>
      <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" placeholder="Your name" required /></div>
      <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required /></div>
      <div class="field"><label for="f-phone">Phone <span>(optional)</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="(416) 000-0000" /></div>
      <div class="field"><label for="f-intent">I want to…</label><select id="f-intent" name="intent"><option>Buy a home</option><option>Sell my home</option><option>Buy and sell</option><option>Just exploring</option></select></div>
      <div class="field field--full"><label for="f-area">Neighbourhood / area</label><input id="f-area" name="area" type="text" placeholder="e.g. North York, Scarborough, Markham…" /></div>
      <div class="field field--full"><label for="f-msg">Anything else? <span>(optional)</span></label><textarea id="f-msg" name="message" rows="4" placeholder="Timeline, budget, questions…"></textarea></div>
      <button type="submit" class="btn btn--primary" data-magnetic>Request my free evaluation <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <p class="enquire__status" id="enquireStatus" role="status" aria-live="polite"></p>
    </form>""" % EMAIL
    P.append(("contact", "Contact", "Reach Shawan directly for a confidential consultation — no pressure, no obligation.",
        "contact",
        page_hero("Contact", "Thinking of a move? Start with a call.",
                  "Reach Shawan directly for a confidential consultation.")
        + section('<div class="contact__grid" data-reveal>'
            f'<a class="contact__card" href="tel:{TEL}" data-tilt><span class="contact__label">Direct</span><span class="contact__value">{PHONE}</span><span class="contact__cta">Tap to call →</span></a>'
            f'<a class="contact__card" href="mailto:{EMAIL}" data-tilt><span class="contact__label">Email</span><span class="contact__value">{EMAIL}</span><span class="contact__cta">Send a message →</span></a>'
            '<div class="contact__card" data-tilt><span class="contact__label">Office</span><span class="contact__value">416.298.3200</span><span class="contact__cta">HomeLife Today Realty</span></div>'
            '<div class="contact__card" data-tilt><span class="contact__label">Fax</span><span class="contact__value">416.298.3440</span><span class="contact__cta">Documents</span></div>'
            '</div>')
        + section('<section class="section enquire" id="enquire" style="padding:0"><div class="enquire__bg" id="enquireBg" aria-hidden="true"></div>'
                  '<div class="enquire__inner">'
                  '<div class="enquire__intro" data-reveal><p class="kicker">Enquire</p><h2 class="section__title">Get your free market evaluation.</h2>'
                  '<p class="section__lead">Tell Shawan a little about your move. No obligation, and everything stays confidential.</p>'
                  + ticklist(["A reply within one business day", "Free, no-pressure consultation", "Your details are never shared with anyone"])
                  + '</div>' + form + '</div></section>', alt=True)))

    # ---- Guide / info pages -------------------------------------------------
    GUIDES = [
        ("buyers", "Working with buyers", "what-i-do",
         "How Shawan helps buyers across Toronto and the GTA — from search to keys.",
         [("A search built around your brief",
           "<p>Before looking at a single listing, we get specific: budget, must-haves, deal-breakers, timeline and the areas that actually work for your life. Then you get first look at listings that fit — and honest advice on the ones that don't.</p>"),
          ("Financing that's ready before you offer",
           "<p>Shawan connects you with trusted lenders for a real pre-approval and competitive rates, so when the right home appears you can move with confidence.</p>"),
          ("Negotiation on your side",
           "<p>Firm, informed negotiation to land the right price and terms — then guidance through conditions, inspection and paperwork to closing.</p>")]),
        ("sellers", "Working with sellers", "what-i-do",
         "Pricing, preparation and marketing that actually reaches buyers.",
         [("Price it on real numbers",
           "<p>A market evaluation puts recent comparable sales in front of you so the list price is defensible — not a guess. See <a href='pricing-your-home.html'>pricing your home</a>.</p>"),
          ("Prepare and present",
           "<p>A short prep list, professional photography and video, feature sheets and a property website. Staging is available with conditions — see <a href='staging.html'>staging</a>.</p>"),
          ("Marketing with reach",
           "<p>Multiple open houses, social media advertising, community newspapers and full online exposure — the plan is built for your specific home and buyer.</p>")]),
        ("market-evaluation", "Free market evaluation", "what-i-do",
         "What your home is worth today — free, confidential, no obligation.",
         [("What you get",
           "<p>A grounded estimate of your home's current value, based on recent comparable sales in your area, its condition and the season — plus a realistic timeline if you were to list.</p>"),
          ("What it costs",
           "<p>Nothing. It's free and comes with no obligation. It's usually the first thing worth knowing before you make any move.</p>"),
          ("Book one",
           "<p>Reach Shawan directly at <a href='tel:%s'>%s</a> or use the <a href='contact.html'>contact form</a>. Everything stays confidential.</p>" % (TEL, PHONE))]),
        ("first-time-buyers", "First-time buyers", "what-i-do",
         "Where to start when you're buying your first home in the GTA.",
         [("Start with a conversation",
           "<p>We talk through your budget, your timeline and the trade-offs that matter to you — no pressure to do anything.</p>"),
          ("Get pre-approved",
           "<p>A trusted lender gives you a real number and a competitive rate. Now your search is grounded and your offers are credible.</p>"),
          ("See the right homes",
           "<p>You get first look at listings that fit your brief and honest advice on each one — including when to walk away.</p>")]),
        ("selling-process", "The selling process", "what-i-do",
         "List to close, step by step.",
         [("1 — Consultation & evaluation",
           "<p>Goals, timeline, and a market evaluation grounded in real comparable sales.</p>"),
          ("2 — Prepare & photograph",
           "<p>A short prep list, then professional photography and video, feature sheets and a property website.</p>"),
          ("3 — Launch & market",
           "<p>Open houses, social advertising, community placement and full online exposure.</p>"),
          ("4 — Offers, negotiation & close",
           "<p>Firm negotiation on your behalf, then guidance through conditions and paperwork to <a href='closing-day.html'>closing day</a>.</p>")]),
        ("staging", "Staging", "what-i-do",
         "What staging does, and when it's worth it.",
         [("Why it helps",
           "<p>Staging helps buyers picture themselves in the space and photographs better online, where most buyers first see your home.</p>"),
          ("How it works here",
           "<p>Staging is available with some conditions depending on the property and listing. We'll go over what makes sense for your home during the consultation — sometimes it's a full main floor, sometimes it's just decluttering and a few pieces.</p>")]),
        ("mortgages", "Mortgages & lenders", "what-i-do",
         "Getting a competitive rate through trusted lenders.",
         [("Introductions, not lending",
           "<p>Shawan works with trusted lenders and can connect you with competitive rates. The lending itself is handled by the lender; the introduction and coordination are part of the service.</p>"),
          ("Get pre-approved first",
           "<p>A pre-approval tells you your real budget and makes your offers stronger. It's the right first step for buyers — see <a href='first-time-buyers.html'>first-time buyers</a>.</p>")]),
        ("pricing-your-home", "Pricing your home", "what-i-do",
         "Grounded in real comparables — not a guess.",
         [("Comparable sales",
           "<p>We look at what similar homes in your area actually sold for recently — adjusted for condition, lot, and finishes — so the list price can be defended.</p>"),
          ("Market conditions",
           "<p>Season, inventory and buyer demand all move the number. The evaluation accounts for where the market is right now, not six months ago.</p>"),
          ("Strategy",
           "<p>Depending on the home and the market, we choose the pricing approach that gets the strongest result — and revisit it if the feedback says to.</p>")]),
        ("negotiation", "Negotiation", "what-i-do",
         "How offers actually get won.",
         [("Preparation",
           "<p>Knowing the comparables, the other side's motivation and your own limits before anything is on the table.</p>"),
          ("Calm and firm",
           "<p>Negotiation is handled steadily on your behalf — price, conditions, closing date and inclusions — to protect your position without losing the deal.</p>")]),
        ("closing-day", "Closing day", "what-i-do",
         "Conditions, paperwork and keys.",
         [("Before closing",
           "<p>Conditions are cleared, financing is finalized, and your lawyer prepares the paperwork. Shawan keeps the timeline moving and flags anything that needs your attention.</p>"),
          ("On the day",
           "<p>Funds transfer, title changes hands, and keys are released. You'll know exactly what to expect and when.</p>")]),
        ("moving-checklist", "Moving checklist", "what-i-do",
         "A simple checklist for the weeks around your move.",
         [("6–4 weeks out",
           "<p>Book movers, start a change-of-address list, begin decluttering, and confirm your closing date with your lawyer.</p>"),
          ("2 weeks out",
           "<p>Transfer utilities, forward mail, and confirm arrangements with the moving company and building (if applicable).</p>"),
          ("Moving week",
           "<p>Pack an essentials box, confirm the walkthrough, and note meter readings on the way out.</p>")]),
        ("relocating-to-the-gta", "Relocating to the GTA", "what-i-do",
         "Moving to Toronto or the surrounding region from elsewhere.",
         [("Get oriented",
           "<p>We start with how you'll actually live here — commute, schools, amenities — and narrow to the <a href='areas.html'>areas</a> that fit before you fly in or tour remotely.</p>"),
          ("Tour efficiently",
           "<p>Showings are grouped so a single trip covers what matters, with video walkthroughs for anything you can't see in person.</p>")]),
        ("downsizing", "Downsizing", "what-i-do",
         "Selling the family home and moving to something simpler.",
         [("Timing the two moves",
           "<p>We plan the sale and the purchase together so you're not caught between them — including bridge options if the dates don't line up.</p>"),
          ("Less stuff, less stress",
           "<p>A realistic prep and declutter plan, with staging where it helps, so the home shows well without overwhelming you.</p>")]),
        ("investment-properties", "Investment properties", "what-i-do",
         "Buying to rent or hold in the GTA.",
         [("Run the numbers",
           "<p>We look at realistic rents, carrying costs and condo fees so the return is based on real figures, not hope.</p>"),
          ("Location and tenant demand",
           "<p>Some areas rent faster and hold value better than others — we focus the search where the fundamentals are strongest.</p>")]),
        ("testimonials", "Testimonials", "about",
         "What clients say about working with Shawan.",
         [("In their words",
           "<blockquote class='pullquote'>\"Straight answers the whole way through, and the house sold over asking in the first week.\"<cite>Seller · North York</cite></blockquote>"
           "<blockquote class='pullquote'>\"As first-time buyers we had no idea where to start. We never felt rushed, and we got the place we wanted.\"<cite>Buyers · Scarborough</cite></blockquote>"
           "<blockquote class='pullquote'>\"The marketing actually reached people — the open houses were busy and the offers reflected it.\"<cite>Seller · Etobicoke</cite></blockquote>"),
          ("Add your own",
           "<p>These are placeholder quotes. Replace them with real client testimonials before going live.</p>")]),
    ]
    guide_kicker = {"what-i-do": "What I do", "about": "About"}
    for slug, title, active, desc, blocks in GUIDES:
        body_blocks = "".join(f"<h2>{h}</h2>{b}" for h, b in blocks)
        P.append((slug, title, desc, active,
            page_hero(guide_kicker.get(active, "Guide"), title,
                      desc, img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80")
            + section(prose([body_blocks]))))

    # ---- thank-you
    P.append(("thank-you", "Thank you", "Your message is on its way.", "contact",
        page_hero("Thank you", "Message on its way.",
                  "Shawan will be in touch within one business day. For anything urgent, call " + PHONE + ".")
        + section(prose(["<p><a class='btn btn--primary' data-magnetic href='index.html'>Back to home</a></p>"]))))

    # ---- Area pages ------------------------------------------------------
    for i, (slug, name, blurb) in enumerate(AREAS):
        nearby = [(AREAS[(i+1) % len(AREAS)]), (AREAS[(i+2) % len(AREAS)]), (AREAS[(i-1) % len(AREAS)])]
        near_html = linkgrid([(n, f"area-{s}.html", b.split(".")[0][:55] + "…") for s, n, b in nearby])
        P.append((f"area-{slug}", f"{name} real estate", active_key := "areas",
            f"Shawan Sagar works with buyers and sellers in {name} — pricing, negotiation and marketing that reaches buyers.",
            page_hero(f"Areas served — {name}", f"Buying or selling in {name}.", blurb)
            + section(
                '<header class="section__head" data-reveal><h2 class="section__title">What Shawan does in ' + name + '</h2></header>'
                + '<div class="split">'
                + '<article class="card" data-reveal data-tilt><div class="card__glow" aria-hidden="true"></div><h3>Selling in ' + name + '</h3>'
                + ticklist(["Market evaluation from recent " + name + " sales",
                            "Professional photography, video &amp; a property website",
                            "Open houses, social advertising &amp; community placement",
                            "Firm negotiation for the expected price"]) + '</article>'
                + '<article class="card" data-reveal data-tilt><div class="card__glow" aria-hidden="true"></div><h3>Buying in ' + name + '</h3>'
                + ticklist(["First look at " + name + " listings that fit your brief",
                            "Pre-approval &amp; competitive rates through trusted lenders",
                            "Honest advice on each home — including when to pass",
                            "Confidential consultation, no obligation"]) + '</article>'
                + '</div>')
            + section('<header class="section__head" data-reveal><p class="kicker">Nearby</p><h2 class="section__title">Also serving these areas</h2></header>' + near_html
                      + '<p class="muted-note" data-reveal><a href="areas.html">See all areas →</a></p>', alt=True)))

    seen = set()
    for slug, title, desc, active, body in P:
        assert slug not in seen, slug
        seen.add(slug)
        write(slug, wrap(slug, title, desc, active, body))
    return len(P), seen

# --------------------------------------------------------------------------- run
if __name__ == "__main__":
    print("Building site…")
    build_home()
    n, slugs = build_pages()
    slugs.update({"index", "admin"})   # admin.html is hand-written, keep it
    # remove stale generated pages (e.g. after a rename)
    for f in ROOT.glob("*.html"):
        if f.stem not in slugs:
            f.unlink()
            print("  removed stale", f.name)
    total = n + 1
    print(f"\nDone — {total} pages written.")
    if total != 34:
        print(f"!! expected 34, got {total}")
