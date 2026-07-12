export const site = {
  name: "Ammar Gidany",
  brand: "Ammar Gidany",
  tagline: "Singapore Luxury Real Estate",
  title: "Ammar Gidany — Singapore Luxury Property Agent",
  description:
    "Ammar Gidany is a Singapore luxury real estate agent specialising in Good Class Bungalows, prime-district condominiums and seafront residences. Private consultations, discreet transactions, record results.",
  url: "https://ammargidany.sg",
  // Placeholder contact details — replace with real ones before going live.
  phone: "+65 8044 8950",
  phoneHref: "tel:+6580448950",
  whatsapp: "6580448950",
  email: "ammar@ammargidany.sg",
  ceaReg: "CEA Reg. No. R012345A",
  agency: "Elysian Realty Pte Ltd (Estate Agent Licence L3002382K)",
  address: "1 Raffles Place, #40-01, One Raffles Place, Singapore 048616",
  calendlyUrl: "https://calendly.com/ammar-gidany/private-consultation",
  instagram: "https://instagram.com/ammargidany",
  linkedin: "https://linkedin.com/in/ammargidany",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const stats = [
  { value: 486, suffix: "", label: "Homes Transacted" },
  { value: 1.2, decimals: 1, prefix: "S$", suffix: "B+", label: "Total Sales Volume" },
  { value: 14, suffix: "", label: "Years in Prime Districts" },
  { value: 19, suffix: " days", label: "Average Time to Sell" },
] as const;
