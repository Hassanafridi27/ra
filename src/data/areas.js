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

const areaContentOverrides = {
  manchester: {
    headline: "Mobile tyre fitting in Manchester",
    subtitle:
      "Fast, professional tyre replacement and emergency support across Manchester and nearby roads. We bring the workshop to your driveway, workplace or roadside location with minimal disruption.",
    summary:
      "Same-day mobile fitting, puncture repair, locking wheel nut removal and roadside tyre support designed around your schedule.",
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
  };

  return {
    ...baseContent,
    ...(areaContentOverrides[slug] || {}),
  };
});

export const getAreaBySlug = (slug) =>
  areaDirectory.find((area) => area.slug === slug) || null;
