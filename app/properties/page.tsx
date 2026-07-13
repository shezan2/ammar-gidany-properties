import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyShowcase from "@/components/PropertyShowcase";
import MapLoader from "@/components/MapLoader";
import AlertsSignup from "@/components/AlertsSignup";
import { properties, formatPriceShort } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Current Portfolio",
  description:
    "The residences Ammar Gidany currently represents — Good Class Bungalows, prime-district condominiums and seafront penthouses across Singapore.",
};

export default function PropertiesPage() {
  const markers = properties.map((p) => ({
    lat: p.lat,
    lng: p.lng,
    label: p.name,
    sublabel: `${formatPriceShort(p.price)} · ${p.beds} beds · ${p.builtSqft.toLocaleString()} sqft`,
    href: `/properties/${p.slug}`,
    kind: "property" as const,
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Current Portfolio"
        title={
          <>
            Residences under
            <br />
            <span className="italic text-gold-bright">Ammar&apos;s representation.</span>
          </>
        }
        description="A deliberately small book of exclusive mandates. Each home is personally vetted, professionally presented, and shown by private appointment only. Tap the heart to build your shortlist."
        className="mb-16"
      />

      <PropertyShowcase properties={[...properties]} />

      <div className="mt-24">
        <SectionHeading
          eyebrow="Map View"
          title={
            <>
              See exactly <span className="italic text-gold-bright">where they sit.</span>
            </>
          }
          description="Each residence plotted against the city — tap a marker for the essentials, then dive into the full dossier."
          className="mb-10"
        />
        <Reveal>
          <MapLoader
            center={[1.295, 103.845]}
            zoom={12}
            markers={markers}
            className="h-[420px] sm:h-[520px]"
          />
        </Reveal>
      </div>

      <Reveal className="mt-24">
        <div className="glass flex flex-col items-start justify-between gap-6 rounded-[2px] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow mb-3">Off-Market Access</p>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">
              The best homes never <span className="italic text-gold-bright">reach the portals.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim">
              Join Ammar&apos;s private list to hear about new mandates and off-market opportunities
              first — typically 48 hours before public launch.
            </p>
          </div>
          <div className="w-full max-w-md">
            <AlertsSignup compact />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
