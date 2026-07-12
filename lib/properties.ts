export type AmenityType = "mrt" | "school" | "dining" | "leisure" | "retail";

export interface Amenity {
  name: string;
  type: AmenityType;
  distance: string;
  lat: number;
  lng: number;
}

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Property {
  slug: string;
  name: string;
  headline: string;
  address: string;
  district: string;
  neighbourhood: string;
  neighbourhoodSlug: string;
  price: number;
  priceOnRequest?: boolean;
  beds: number;
  baths: number;
  builtSqft: number;
  landSqft?: number;
  psf: number;
  tenure: string;
  type: string;
  topYear: number;
  status: "For Sale" | "Under Offer";
  lat: number;
  lng: number;
  hero: PropertyImage;
  gallery: PropertyImage[];
  description: string[];
  highlights: string[];
  /** Matterport space ID — demo space; replace with the listing's own scan. */
  matterportId: string;
  /** YouTube video ID for the walkthrough — replace with the listing's own film. */
  youtubeId: string | null;
  videoPoster: string;
  amenities: Amenity[];
}

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const properties: Property[] = [
  {
    slug: "cluny-hill-residence",
    name: "The Cluny Hill Residence",
    headline: "A landmark Good Class Bungalow beside the Botanic Gardens",
    address: "Cluny Hill, District 10",
    district: "D10 · Bukit Timah / Tanglin",
    neighbourhood: "Bukit Timah",
    neighbourhoodSlug: "bukit-timah",
    price: 36_800_000,
    beds: 6,
    baths: 7,
    builtSqft: 12_980,
    landSqft: 15_070,
    psf: 2442,
    tenure: "Freehold",
    type: "Good Class Bungalow",
    topYear: 2024,
    status: "For Sale",
    lat: 1.3231,
    lng: 103.8152,
    hero: {
      src: u("photo-1613490493576-7fde63acd811", 2200),
      alt: "Evening view of the Cluny Hill Residence with illuminated pool",
    },
    gallery: [
      {
        src: u("photo-1613490493576-7fde63acd811", 2200),
        alt: "Evening facade with infinity-edge pool",
      },
      {
        src: u("photo-1600607687939-ce8a6c25118c"),
        alt: "Double-volume living room with garden outlook",
      },
      {
        src: u("photo-1600210492486-724fe5c67fb0"),
        alt: "Sculptural staircase in the entrance gallery",
      },
      {
        src: u("photo-1556912167-f556f1f39fdf"),
        alt: "Chef's kitchen in honed marble and walnut",
      },
      {
        src: u("photo-1615874959474-d609969a20ed"),
        alt: "Principal suite overlooking the rain trees",
      },
      {
        src: u("photo-1600566753190-17f0baa2a6c3"),
        alt: "Poolside terrace at dusk",
      },
      {
        src: u("photo-1584622650111-993a426fbf0a"),
        alt: "Principal bath in book-matched travertine",
      },
    ],
    description: [
      "Set on elevated ground along one of Singapore's most coveted Good Class Bungalow avenues, The Cluny Hill Residence is a newly completed estate of rare composure — 15,070 square feet of freehold land wrapped in the green canopy of the UNESCO-listed Botanic Gardens, two minutes from Nanyang Primary and the cafés of Cluny Court.",
      "The house itself is a study in quiet luxury: a double-volume reception gallery, six garden-facing suites, a 25-metre lap pool set among century-old rain trees, and a basement entertainment floor with a climate-controlled cellar for eight hundred bottles. A private lift serves all four levels; staff quarters and a self-contained guest annexe sit discreetly to the east of the plot.",
      "GCB opportunities on Cluny Hill surface once or twice a decade. This one is offered with vacant possession and immediate occupancy.",
    ],
    highlights: [
      "15,070 sqft elevated freehold plot in the Cluny Hill GCB Area",
      "25-metre lap pool amid mature rain trees",
      "Private lift, basement cellar & entertainment floor",
      "Self-contained guest annexe and staff wing",
      "400m to Singapore Botanic Gardens MRT",
      "1km radius of Nanyang Primary School",
    ],
    matterportId: "SxQL3iGyoDo",
    youtubeId: null,
    videoPoster: u("photo-1600566753086-00f18fb6b3ea", 2000),
    amenities: [
      { name: "Botanic Gardens MRT (CC19/DT9)", type: "mrt", distance: "400 m", lat: 1.3224, lng: 103.8154 },
      { name: "Singapore Botanic Gardens", type: "leisure", distance: "450 m", lat: 1.3138, lng: 103.8159 },
      { name: "Nanyang Primary School", type: "school", distance: "900 m", lat: 1.3208, lng: 103.8065 },
      { name: "Hwa Chong Institution", type: "school", distance: "1.6 km", lat: 1.3266, lng: 103.8025 },
      { name: "Cluny Court dining", type: "dining", distance: "450 m", lat: 1.3227, lng: 103.8146 },
      { name: "Dempsey Hill", type: "dining", distance: "1.8 km", lat: 1.3044, lng: 103.8095 },
    ],
  },
  {
    slug: "aurelia-orchard-boulevard",
    name: "Aurelia on Orchard Boulevard",
    headline: "A four-bedroom sky residence above Singapore's grandest avenue",
    address: "Orchard Boulevard, District 9",
    district: "D09 · Orchard / River Valley",
    neighbourhood: "Orchard & River Valley",
    neighbourhoodSlug: "orchard-river-valley",
    price: 12_500_000,
    beds: 4,
    baths: 4,
    builtSqft: 2_933,
    psf: 4262,
    tenure: "Freehold",
    type: "Luxury Condominium",
    topYear: 2023,
    status: "For Sale",
    lat: 1.3029,
    lng: 103.8258,
    hero: {
      src: u("photo-1600607687920-4e2a09cf159d", 2200),
      alt: "Living room of the Aurelia sky residence with floor-to-ceiling glass",
    },
    gallery: [
      {
        src: u("photo-1600607687920-4e2a09cf159d", 2200),
        alt: "Living room with floor-to-ceiling glazing",
      },
      {
        src: u("photo-1512918728675-ed5a9ecdebfd"),
        alt: "Open-plan dining and show kitchen",
      },
      {
        src: u("photo-1522708323590-d24dbb6b0267"),
        alt: "Family lounge with skyline outlook",
      },
      {
        src: u("photo-1590490360182-c33d57733427"),
        alt: "Principal bedroom facing the Orchard skyline",
      },
      {
        src: u("photo-1552321554-5fefe8c9ef14"),
        alt: "Marble-clad principal bathroom",
      },
      {
        src: u("photo-1571896349842-33c89424de2d"),
        alt: "Residents' cantilevered infinity pool",
      },
    ],
    description: [
      "On the 28th floor of one of Orchard Boulevard's most tightly held freehold towers, this 2,933 square foot residence commands an uninterrupted sweep from the Botanic Gardens to the Marina Bay skyline. Three-metre ceilings and full-height glazing on two elevations give the principal rooms the feel of a private observatory.",
      "The four-bedroom layout was reconfigured by its current owners with Poliform wardrobes, a Boffi show kitchen and a separate wet kitchen; two private lift lobbies open directly into the apartment. Residents enjoy a 50-metre cantilevered pool, private dining salon and one of the lowest-density facility decks in District 9.",
      "Orchard Boulevard MRT on the Thomson–East Coast Line sits 200 metres from the porte-cochère — one stop to Orchard, seven minutes to Marina Bay.",
    ],
    highlights: [
      "Full-floor-feel: private lift lobbies on both wings",
      "3-metre ceilings, glazing on two elevations",
      "Boffi show kitchen + separate wet kitchen",
      "50-metre cantilevered residents' pool",
      "200 m to Orchard Boulevard MRT (TE13)",
      "Freehold in the heart of District 9",
    ],
    matterportId: "SxQL3iGyoDo",
    youtubeId: null,
    videoPoster: u("photo-1567767292278-a4f21aa2d36e", 2000),
    amenities: [
      { name: "Orchard Boulevard MRT (TE13)", type: "mrt", distance: "200 m", lat: 1.3025, lng: 103.8241 },
      { name: "ION Orchard", type: "retail", distance: "850 m", lat: 1.304, lng: 103.8318 },
      { name: "Tanglin Mall", type: "retail", distance: "500 m", lat: 1.3049, lng: 103.8218 },
      { name: "River Valley Primary School", type: "school", distance: "1.1 km", lat: 1.2942, lng: 103.8318 },
      { name: "Les Amis, Shaw Centre", type: "dining", distance: "900 m", lat: 1.3056, lng: 103.8317 },
      { name: "UE Square & Robertson Quay", type: "dining", distance: "1.3 km", lat: 1.2925, lng: 103.8378 },
    ],
  },
  {
    slug: "meyer-seafront-penthouse",
    name: "The Meyer Seafront Penthouse",
    headline: "A duplex penthouse with 40 metres of uninterrupted sea frontage",
    address: "Meyer Road, District 15",
    district: "D15 · East Coast / Katong",
    neighbourhood: "East Coast & Katong",
    neighbourhoodSlug: "east-coast-katong",
    price: 8_980_000,
    beds: 4,
    baths: 5,
    builtSqft: 4_715,
    psf: 1905,
    tenure: "Freehold",
    type: "Duplex Penthouse",
    topYear: 2021,
    status: "For Sale",
    lat: 1.2976,
    lng: 103.8926,
    hero: {
      src: u("photo-1600585154340-be6161a56a0c", 2200),
      alt: "The Meyer Seafront Penthouse terrace at golden hour",
    },
    gallery: [
      {
        src: u("photo-1600585154340-be6161a56a0c", 2200),
        alt: "Terrace and pool deck at golden hour",
      },
      {
        src: u("photo-1600121848594-d8644e57abab"),
        alt: "Private roof pool facing the sea",
      },
      {
        src: u("photo-1493809842364-78817add7ffb"),
        alt: "Double-height living room",
      },
      {
        src: u("photo-1616486338812-3dadae4b4ace"),
        alt: "Lounge with curated furnishings",
      },
      {
        src: u("photo-1560448204-e02f11c3d0e2"),
        alt: "Guest suite with morning light",
      },
      {
        src: u("photo-1616594039964-ae9021a400a0"),
        alt: "Study overlooking the coastline",
      },
    ],
    description: [
      "Along Meyer Road — the East Coast's original millionaires' row — this 4,715 square foot duplex penthouse holds what so few Singapore homes can offer: forty metres of uninterrupted sea frontage, from Marina Bay's towers to the ships resting on the horizon.",
      "The lower floor is given to a double-height living and dining hall behind a full wall of glass; upstairs, four en-suite bedrooms open onto a wraparound terrace with a private eight-metre pool and outdoor kitchen. Interiors were completed in 2023 by a celebrated local studio in oak, travertine and bronze.",
      "Katong Park MRT is a four-minute walk, the East Coast Park underpass a two-minute cycle, and the shophouse cafés of Katong five minutes by car. Freehold, with two private parking bays and a full-height storeroom.",
    ],
    highlights: [
      "40 m of direct, unblockable sea frontage",
      "Private 8-metre rooftop pool & outdoor kitchen",
      "Double-height living hall behind full glazing",
      "Interiors by an award-winning Singapore studio (2023)",
      "350 m to Katong Park MRT (TE24)",
      "Freehold with two private parking bays",
    ],
    matterportId: "SxQL3iGyoDo",
    youtubeId: null,
    videoPoster: u("photo-1613977257363-707ba9348227", 2000),
    amenities: [
      { name: "Katong Park MRT (TE24)", type: "mrt", distance: "350 m", lat: 1.2976, lng: 103.8853 },
      { name: "East Coast Park", type: "leisure", distance: "400 m", lat: 1.2993, lng: 103.8963 },
      { name: "Tao Nan School", type: "school", distance: "1.4 km", lat: 1.3037, lng: 103.9091 },
      { name: "Chin Mee Chin Confectionery", type: "dining", distance: "1.5 km", lat: 1.3062, lng: 103.9052 },
      { name: "i12 Katong", type: "retail", distance: "1.2 km", lat: 1.3052, lng: 103.9053 },
      { name: "Parkway Parade", type: "retail", distance: "1.8 km", lat: 1.3013, lng: 103.9053 },
    ],
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return `S$${price.toLocaleString("en-SG")}`;
}

export function formatPriceShort(price: number) {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `S$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/0$/, "")}M`;
  }
  return `S$${Math.round(price / 1000)}K`;
}

export interface SoldRecord {
  name: string;
  district: string;
  type: string;
  soldPrice: number;
  overAsking?: string;
  days: number;
  image: PropertyImage;
}

export const recentlySold: SoldRecord[] = [
  {
    name: "Ocean Drive Villa",
    district: "D04 · Sentosa Cove",
    type: "Waterfront Bungalow",
    soldPrice: 19_500_000,
    overAsking: "4% over asking",
    days: 23,
    image: { src: u("photo-1512917774080-9991f1c4c750", 1200), alt: "Sentosa Cove waterfront bungalow" },
  },
  {
    name: "The Nassim, Tower 2",
    district: "D10 · Nassim",
    type: "4-Bedroom Residence",
    soldPrice: 14_280_000,
    days: 17,
    image: { src: u("photo-1600047509807-ba8f99d2cdde", 1200), alt: "The Nassim residence exterior" },
  },
  {
    name: "Holland Grove Semi-D",
    district: "D10 · Holland",
    type: "Semi-Detached",
    soldPrice: 8_650_000,
    overAsking: "6% over asking",
    days: 12,
    image: { src: u("photo-1600585154526-990dced4db0d", 1200), alt: "Holland Grove semi-detached house" },
  },
  {
    name: "Amber Park Penthouse",
    district: "D15 · Amber Road",
    type: "Penthouse",
    soldPrice: 7_900_000,
    days: 26,
    image: { src: u("photo-1502672260266-1c1ef2d93688", 1200), alt: "Amber Park penthouse interior" },
  },
  {
    name: "Bishopsgate Residence",
    district: "D10 · Chatsworth",
    type: "3-Bedroom + Study",
    soldPrice: 6_880_000,
    overAsking: "3% over asking",
    days: 15,
    image: { src: u("photo-1600566753086-00f18fb6b3ea", 1200), alt: "Bishopsgate residence living room" },
  },
  {
    name: "Cairnhill Nine",
    district: "D09 · Cairnhill",
    type: "2-Bedroom Investment",
    soldPrice: 3_150_000,
    days: 9,
    image: { src: u("photo-1522708323590-d24dbb6b0267", 1200), alt: "Cairnhill Nine apartment" },
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ammar sold our Nassim apartment in seventeen days, at a price two other agencies told us was impossible. Every viewing was curated, every buyer qualified. Flawless.",
    name: "Sarah & Dominic Teo",
    role: "Sellers, The Nassim",
  },
  {
    quote:
      "We were relocating from London with three weeks' notice. Ammar shortlisted five homes, arranged everything remotely, and negotiated S$400K off our Meyer Road purchase.",
    name: "James Whitfield",
    role: "Buyer, District 15",
  },
  {
    quote:
      "Discretion was everything for us. Ammar ran a completely off-market process for our GCB and brought us a buyer within the month. A consummate professional.",
    name: "Mdm. L. Chen",
    role: "Seller, Bukit Timah GCB",
  },
  {
    quote:
      "As first-time buyers of a landed home we had endless questions. Ammar walked us through TDSR, stamp duties and renovation costs like a private banker would. We felt protected.",
    name: "Priya & Arjun Nair",
    role: "Buyers, Holland Grove",
  },
  {
    quote:
      "Four transactions with Ammar over eight years — two bought, two sold, every one above expectation. He is the only agent our family office calls.",
    name: "Marcus Lim",
    role: "Family Office Principal",
  },
  {
    quote:
      "His WhatsApp market notes are better than most bank research. When the Katong penthouse we wanted appeared, we were the first — and only — viewers.",
    name: "Elaine & Rich Osborne",
    role: "Buyers, East Coast",
  },
];
