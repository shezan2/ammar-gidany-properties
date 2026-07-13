"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "./PropertyMap";

/** Client-only Leaflet map — Leaflet touches `window` so it can never render on the server. */
const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center rounded-2xl border border-line bg-surface">
      <span className="eyebrow animate-pulse-soft">Loading map…</span>
    </div>
  ),
});

interface MapLoaderProps {
  center: [number, number];
  zoom?: number;
  markers: MapMarker[];
  className?: string;
  scrollWheelZoom?: boolean;
}

export default function MapLoader(props: MapLoaderProps) {
  return <PropertyMap {...props} />;
}
