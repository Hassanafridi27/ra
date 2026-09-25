export const areas = [
  "Accrington",
  "Altrincham",
  "Ashton-under-Lyne",
  "Bacup",
  "Barnsley",
  "Blackburn",
  "Bolton",
  "Bootle",
  "Bridgeford",
  "Burnley",
  "Buxton",
  "Bury",
  "Cheadle",
  "Chorley",
  "Chorlton",
  "Clitheroe",
  "Crewe",
  "Darwen",
  "Denton",
  "Droylsden",
  "Ellesmere Port",
  "Fulwood",
  "Glossop",
  "Halifax",
  "High Peak",
  "Holmfirth",
  "Huddersfield",
  "Hulton",
  "Hyde",
  "Irlam",
  "Kendal",
  "Knutsford",
  "Lancaster",
  "Leeds",
  "Leigh",
  "Leyland",
  "Liverpool",
  "Lymm",
  "Macclesfield",
  "Manchester",
  "Marple",
  "Middlewich",
  "Morley",
  "Nantwich",
  "Nelson",
  "Northwich",
  "Oldham",
  "Pontefract",
  "Prescot",
  "Preston",
  "Prestbury",
  "Rochdale",
  "Runcorn",
  "Salford",
  "Sandbach",
  "Sefton",
  "Sheffield",
  "Southport",
  "St Helens",
  "Stockport",
  "Tameside",
  "Trafford",
  "Wakefield",
  "Warrington",
  "Wigan",
];

export const slugifyArea = (areaName) =>
  areaName
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const defaultReviews = [
  [
    "Gareth Beaumont",
    "Fantastic service! Very quick and professional. Kept fully updated and very reasonable price.",
  ],
  [
    "Jo",
    "Turned up exactly when they said they would. Very reasonably priced. Quick and efficient.",
  ],
  [
    "David Wright",
    "So easy, kept up to date with time frames. Friendly guy who turned up. 10/10 service.",
  ],
  [
    "Christopher",
    "Fantastic service from initial booking to fitting. Great choice of tyres and speedy fitting.",
  ],
];

const areaContentOverrides = {
  manchester: {
    headline: "Mobile tyre fitting in Manchester",
    subtitle:
      "Fast, professional tyre replacement and emergency support across Manchester and nearby roads. We bring the workshop to your driveway, workplace or roadside location with minimal disruption.",
    summary:
      "Same-day mobile fitting, puncture repair, locking wheel nut removal and roadside tyre support designed around your schedule.",
  },
  droylsden: {
    headline: "Same Day Fitting in Droylsden, Manchester",
    subtitle:
      "If you’re looking for a tyre fitting centre in Droylsden or the surrounding area, AAA Tyres is the one for you.",
    summary:
      "We’re a one-stop shop for all your fitting and servicing needs, from wheel alignment and balancing to brake, bulb, battery, wiper and exhaust work.",
    introParagraphs: [
      "If you’re looking for a tyre fitting centre in Droylsden or the surrounding area, AAA Tyres is the one for you. We’re a one-stop shop for all your fitting and servicing needs, offering wheel alignment and balancing as well as replacements or repairs to brakes, bulbs, batteries, wipers and exhausts.",
      "The service we’re proudest of is our ability to offer impartial advice to all our local customers. We combine experience with best practice to help you get the most out of your vehicle, whether you know exactly what you want or you’re dealing with a problem you can’t work out.",
      "No matter what vehicle or price range you’re working with, we’re dedicated to customer service and making sure you leave happy. We have a wide range of tyre brands and the information you need to make an informed decision.",
      "And because we want you to have a smooth experience, we offer online booking in advance and you only need to make payment when the fitting is complete. You can book online 24/7, call us on 0161 370 6982, email aaatyresmanchester@gmail.com, or visit us in person.",
    ],
  },
};

export const areaDirectory = areas.map((name) => {
  const slug = slugifyArea(name);
  const baseContent = {
    name,
    slug,
    heroImage: "/b.jpeg",
    headline: `Mobile tyre fitting in ${name}`,
    subtitle: `Fast, professional tyre replacement and emergency support across ${name} and nearby roads. We bring the workshop to your driveway, workplace or roadside location with minimal disruption.`,
    summary:
      "Same-day mobile fitting, puncture repair, locking wheel nut removal and roadside tyre support designed around your schedule.",
    introParagraphs: [
      `Looking for mobile tyres in ${name}? We are a company offering mobile tyre fitting in ${name}, which means our vans are fully equipped with all the equipment needed to change your tyres. Instead of waiting in a cold garage, we’ll come to your home, workplace or even your gym for your next tyre change. With our equipment, we are able to change every tyre on the market today for any vehicle.`,
      `We can help you out with your tyres on the drive. We aim to come to you within 30-60 minutes, and if you’re stuck anywhere else, RA Mobile Tyre Fitter will come to any location in ${name} to fit your mobile tyres.`,
      `Has your tyre failed you late at night or in the middle of nowhere and you have no spare wheel? Don’t worry, our mobile tyre fitting service means we can help to repair or replace your tyre. One of our tyre technicians will be with you within 30-60 minutes. We keep a wide range of part-worn and new tyres in stock so we can provide an emergency service for any vehicle no matter the tyre size.`,
    ],
    features: [
      "Same-day mobile tyre fitting",
      "Emergency roadside call-outs",
      "Premium, mid-range and budget options",
      "Locking nut removal and valve replacement",
      "Friendly local service with transparent pricing",
    ],
    stats: [
      { label: "Response time", value: "30–60 min" },
      { label: "Service area", value: "Local + nearby" },
      { label: "Booking", value: "7 days" },
    ],
    serviceList: [
      "Front and rear tyre replacement",
      "Puncture and tyre repair",
      "Valve and TPMS sensor replacement",
      "Battery jump start and replacement",
      "Emergency call-out assistance",
    ],
    quote: `Need tyres in ${name}? We’ll get you back on the road without the hassle of a garage visit.`,
    reviews: defaultReviews,
  };

  return {
    ...baseContent,
    ...(areaContentOverrides[slug] || {}),
  };
});

export const getAreaBySlug = (slug) =>
  areaDirectory.find((area) => area.slug === slug) || null;
