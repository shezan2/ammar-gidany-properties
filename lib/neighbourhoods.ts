export interface NeighbourhoodStat {
  label: string;
  value: string;
}

export interface Neighbourhood {
  slug: string;
  name: string;
  district: string;
  tagline: string;
  hero: { src: string; alt: string };
  intro: string[];
  stats: NeighbourhoodStat[];
  schools: { name: string; note: string }[];
  dining: { name: string; note: string }[];
  connectivity: { name: string; note: string }[];
  marketNote: string;
  lat: number;
  lng: number;
  relatedPropertySlugs: string[];
}

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const neighbourhoods: Neighbourhood[] = [
  {
    slug: "bukit-timah",
    name: "Bukit Timah",
    district: "Districts 10 & 11",
    tagline: "Rain trees, Good Class Bungalows and Singapore's deepest school bench",
    hero: {
      src: u("photo-1600585154340-be6161a56a0c", 2000),
      alt: "Landed home along a tree-lined Bukit Timah avenue",
    },
    intro: [
      "Bukit Timah is where old Singapore money has always lived — a green corridor of Good Class Bungalow estates running from the Botanic Gardens to the foot of Bukit Timah Hill. Of the island's 39 gazetted GCB areas, more than twenty sit here, protected by planning rules that cap density and preserve the canopy.",
      "The appeal is generational. Families anchor here for the schools, stay for the gardens and nature reserve, and pass the land down. Supply is fixed by law; demand is not. That asymmetry has made Bukit Timah landed property one of the most reliable stores of wealth in Asia.",
    ],
    stats: [
      { label: "Landed median", value: "S$2,100 psf" },
      { label: "GCB areas", value: "20+ of 39" },
      { label: "Green space", value: "Botanic Gardens · Nature Reserve" },
      { label: "MRT lines", value: "Downtown · Circle" },
    ],
    schools: [
      { name: "Nanyang Primary School", note: "Perennially oversubscribed; 1km radius drives GCB demand" },
      { name: "Hwa Chong Institution", note: "Integrated programme through to A-levels" },
      { name: "Raffles Girls' Primary", note: "A short drive along Dunearn Road" },
      { name: "National Junior College", note: "Boarding programme on Hillcrest Road" },
    ],
    dining: [
      { name: "Cluny Court & Serene Centre", note: "Weekend brunch institutions by the Botanic Gardens" },
      { name: "Dempsey Hill", note: "Candlenut, Claudine and the Como cluster, ten minutes south" },
      { name: "Greenwood Avenue", note: "A quiet enclave of neighbourhood bistros" },
      { name: "Bukit Timah Market", note: "Old-school hawker breakfasts before a hill hike" },
    ],
    connectivity: [
      { name: "Botanic Gardens Interchange (CC19/DT9)", note: "Two lines into the CBD in under 15 minutes" },
      { name: "PIE & BKE", note: "Island-wide access from Adam Road" },
      { name: "Rail Corridor", note: "24km green artery for runners and cyclists" },
    ],
    marketNote:
      "GCB transactions are few and increasingly off-market — the best plots change hands quietly between family offices. Landed prices in D10 have compounded roughly 5% annually over the past decade, with newly rebuilt homes commanding significant premiums over land value.",
    lat: 1.3294,
    lng: 103.8021,
    relatedPropertySlugs: ["cluny-hill-residence"],
  },
  {
    slug: "orchard-river-valley",
    name: "Orchard & River Valley",
    district: "Districts 9 & 10",
    tagline: "The city's grandest address — retail, embassies and sky residences",
    hero: {
      src: u("photo-1525625293386-3f8f99389edd", 2000),
      alt: "Singapore city skyline at dusk",
    },
    intro: [
      "Orchard Road needs no introduction, but the residential streets folded behind it — Ardmore, Draycott, Orchard Boulevard, Nassim — are another world: low-density freehold towers, embassy gardens and some of the highest per-square-foot prices in Asia.",
      "River Valley extends the district toward the water with a more liveable rhythm: shophouse cafés, the Robertson Quay riverfront, and a deep rental market driven by international executives. Together they form the core of District 9 — the postcode by which Singapore luxury is benchmarked.",
    ],
    stats: [
      { label: "Prime condo median", value: "S$3,400 psf" },
      { label: "New benchmark", value: "S$6,100 psf (Ardmore)" },
      { label: "Rental yield", value: "2.8–3.4%" },
      { label: "MRT lines", value: "NS · TE · Future CRL" },
    ],
    schools: [
      { name: "River Valley Primary School", note: "The district's anchor primary" },
      { name: "ISS International", note: "Paterson Road campus" },
      { name: "Chatsworth International", note: "Orchard campus minutes away" },
      { name: "Anglo-Chinese School (Junior)", note: "Winstedt Road, one district over" },
    ],
    dining: [
      { name: "Les Amis", note: "Three MICHELIN stars at Shaw Centre" },
      { name: "Iggy's & Buona Terra", note: "Fine dining row along Bukit Timah Road" },
      { name: "Robertson Quay", note: "Riverside dining from Publico to Common Man" },
      { name: "Killiney Road", note: "Kaya toast and laksa heritage, unchanged for decades" },
    ],
    connectivity: [
      { name: "Orchard (NS22/TE14) & Orchard Boulevard (TE13)", note: "Thomson–East Coast Line put the Boulevard on the map" },
      { name: "Great World (TE15)", note: "River Valley's own station since 2022" },
      { name: "CTE", note: "Direct expressway access from Cairnhill" },
    ],
    marketNote:
      "The Thomson–East Coast Line has quietly re-rated Orchard Boulevard: what was a chauffeur district is now a two-minute walk to rail. Foreign-buyer ABSD at 60% has thinned speculative demand, leaving genuine owner-occupiers to negotiate from strength on older freehold stock.",
    lat: 1.3016,
    lng: 103.8286,
    relatedPropertySlugs: ["aurelia-orchard-boulevard"],
  },
  {
    slug: "east-coast-katong",
    name: "East Coast & Katong",
    district: "District 15",
    tagline: "Seafront living, Peranakan shophouses and the island's best breakfasts",
    hero: {
      src: u("photo-1600607687920-4e2a09cf159d", 2000),
      alt: "Seafront residence interior looking out to the water",
    },
    intro: [
      "District 15 is Singapore's original resort coast — a stretch of Meyer Road towers, Amber Road heritage and Katong shophouses where the city exhales. Families move east for the sea air, the food, and a pace that the prime districts can't offer.",
      "The Thomson–East Coast Line changed the calculus: Katong Park, Tanjong Katong and Marine Parade stations opened in 2024, stitching the coast to the CBD in twelve minutes. Seafront freehold stock — always tightly held — has re-rated accordingly.",
    ],
    stats: [
      { label: "Condo median", value: "S$1,900 psf" },
      { label: "Seafront premium", value: "15–25%" },
      { label: "Coastline", value: "15 km East Coast Park" },
      { label: "New MRT", value: "TE24–TE26 (2024)" },
    ],
    schools: [
      { name: "Tao Nan School", note: "One of the island's most sought-after primaries" },
      { name: "CHIJ Katong Convent", note: "Heritage girls' school in the heart of Katong" },
      { name: "Victoria School", note: "Siglap's storied boys' institution" },
      { name: "Canadian International School", note: "Tanjong Katong campus" },
    ],
    dining: [
      { name: "328 Katong Laksa", note: "The bowl that defines the district" },
      { name: "Chin Mee Chin Confectionery", note: "Kaya toast in an unchanged 1925 shophouse" },
      { name: "Joo Chiat Road", note: "Peranakan fine dining to natural wine bars" },
      { name: "East Coast Lagoon Food Village", note: "Satay by the sea — the only hawker centre on the beach" },
    ],
    connectivity: [
      { name: "Katong Park & Marine Parade MRT (TE)", note: "Twelve minutes to Shenton Way since 2024" },
      { name: "ECP", note: "Ten minutes to the CBD, fifteen to Changi" },
      { name: "East Coast Park Connector", note: "Cycle to Marina Bay along the water" },
    ],
    marketNote:
      "Meyer and Amber Road freeholds trade at a fraction of District 9 psf while offering something D9 never can — the sea. With the TEL fully open and no new seafront land supply, the long-term case for the coast is among the strongest on the island.",
    lat: 1.3039,
    lng: 103.9021,
    relatedPropertySlugs: ["meyer-seafront-penthouse"],
  },
  {
    slug: "holland-village",
    name: "Holland Village",
    district: "District 10",
    tagline: "Bohemian village energy wrapped in prime-district fundamentals",
    hero: {
      src: u("photo-1493809842364-78817add7ffb", 2000),
      alt: "Warm living space in a Holland Village home",
    },
    intro: [
      "Holland Village has spent fifty years being Singapore's most liveable contradiction: a laid-back bar-and-brunch village sitting on some of the most valuable residential land in the country. The low-rise centre is ringed by leafy landed estates — Holland Grove, Namly, Binjai — and a new generation of luxury developments.",
      "It draws a particular buyer: professionals and creatives who want prime-district addresses without prime-district formality. Homes here rent fast and vacancy is rare.",
    ],
    stats: [
      { label: "Condo median", value: "S$2,300 psf" },
      { label: "Landed enclaves", value: "Holland Grove · Namly · Binjai" },
      { label: "Vibe", value: "Village core, embassy calm" },
      { label: "MRT", value: "Circle Line (CC21)" },
    ],
    schools: [
      { name: "Henry Park Primary", note: "The neighbourhood's famously oversubscribed primary" },
      { name: "Anglo-Chinese School (International)", note: "Holland Road campus" },
      { name: "Nexus International", note: "Aljunied-turned-Ulu Pandan campus nearby" },
      { name: "NUS", note: "Ten minutes west along the AYE" },
    ],
    dining: [
      { name: "Lorong Mambong", note: "The bar-lined heart of the village" },
      { name: "Chip Bee Gardens", note: "Bakeries, ateliers and quiet bistros across the road" },
      { name: "One Holland Village", note: "The 2023 mixed-use development that renewed the centre" },
      { name: "Dempsey & Botanic fringe", note: "Five minutes to the Dempsey dining cluster" },
    ],
    connectivity: [
      { name: "Holland Village MRT (CC21)", note: "Circle Line to town and one-north" },
      { name: "AYE & Holland Road", note: "Quick runs to the CBD and the west coast tech belt" },
      { name: "one-north", note: "Singapore's R&D district, one stop away — a deep tenant pool" },
    ],
    marketNote:
      "One Holland Village's completion reset the neighbourhood's benchmark psf, and the landed enclaves behind it continue to see quiet en-bloc and rebuild activity. For investors, proximity to one-north and NUS keeps rental demand structurally strong.",
    lat: 1.3111,
    lng: 103.7961,
    relatedPropertySlugs: [],
  },
  {
    slug: "sentosa-cove",
    name: "Sentosa Cove",
    district: "District 4",
    tagline: "Singapore's only oceanfront address — berth your boat at the bottom of the garden",
    hero: {
      src: u("photo-1512917774080-9991f1c4c750", 2000),
      alt: "Waterfront villa with private pool at Sentosa Cove",
    },
    intro: [
      "Sentosa Cove is unique in Singapore law and in Singapore life: the only place on the island where foreigners may own landed homes, and the only neighbourhood where a private berth is part of the floor plan. Four hundred waterfront villas and a ring of low-rise condominiums share the marina with ONE°15 and the fairways of Sentosa Golf Club.",
      "It is a resort that happens to be fifteen minutes from the CBD. For international families and yacht owners, nothing else on the island — arguably in Asia — competes.",
    ],
    stats: [
      { label: "Villa range", value: "S$15M – S$40M+" },
      { label: "Foreign ownership", value: "Allowed (landed, with approval)" },
      { label: "Marina", value: "ONE°15, 270 berths" },
      { label: "Golf", value: "Serapong — world top 100" },
    ],
    schools: [
      { name: "Early years on-island", note: "Kindergartens at Sentosa; international schools 15 minutes away" },
      { name: "ISS & EtonHouse", note: "Harbourfront-side campuses closest to the bridge" },
      { name: "Dover Court International", note: "A 20-minute drive west" },
      { name: "Tanjong Pagar primaries", note: "Mainland options just over the causeway" },
    ],
    dining: [
      { name: "Quayside Isle", note: "Marina-front dining from Sabio to Miska" },
      { name: "Sentosa Golf Club", note: "Members' dining above the Serapong" },
      { name: "Capella & Sofitel", note: "Resort dining five minutes from home" },
      { name: "Keppel Bay", note: "Privé and the mainland marina scene across the water" },
    ],
    connectivity: [
      { name: "Sentosa Gateway", note: "One bridge — 15 minutes to Raffles Place" },
      { name: "Harbourfront MRT (NE1/CC29)", note: "Rail link at the mainland end of the bridge" },
      { name: "ONE°15 Marina", note: "Sail out past the southern islands from your doorstep" },
    ],
    marketNote:
      "The Cove trades in cycles: quiet years, then sudden repricing when global capital rediscovers the only oceanfront landed stock in Singapore. Recent villa transactions have set fresh highs, yet entry prices per square foot remain below prime-district GCBs — the arbitrage that sophisticated buyers watch.",
    lat: 1.2445,
    lng: 103.8385,
    relatedPropertySlugs: [],
  },
];

export function getNeighbourhood(slug: string) {
  return neighbourhoods.find((n) => n.slug === slug);
}
