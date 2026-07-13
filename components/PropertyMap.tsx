"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { AmenityType } from "@/lib/properties";

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  sublabel?: string;
  href?: string;
  kind: "property" | AmenityType;
}

const amenityGlyph: Record<AmenityType, string> = {
  mrt: "M",
  school: "S",
  dining: "D",
  leisure: "L",
  retail: "R",
};

const amenityName: Record<AmenityType, string> = {
  mrt: "MRT",
  school: "School",
  dining: "Dining",
  leisure: "Leisure",
  retail: "Retail",
};

function propertyIcon() {
  return divIcon({
    className: "",
    html: `<div style="position:relative;width:34px;height:44px;filter:drop-shadow(0 6px 14px rgba(0,0,0,.6))">
      <svg viewBox="0 0 34 44" width="34" height="44" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 27 17 27s17-14.25 17-27C34 7.6 26.4 0 17 0z" fill="#c9a962"/>
        <circle cx="17" cy="16.5" r="6.5" fill="#0a0a0b"/>
        <circle cx="17" cy="16.5" r="2.5" fill="#e3c98a"/>
      </svg>
    </div>`,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -46],
  });
}

function amenityIcon(kind: AmenityType) {
  return divIcon({
    className: "",
    html: `<div style="width:24px;height:24px;border-radius:50%;background:#141416;border:1px solid rgba(201,169,98,.55);color:#c9a962;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;letter-spacing:.02em;box-shadow:0 4px 12px rgba(0,0,0,.5)">${amenityGlyph[kind]}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

interface PropertyMapProps {
  center: [number, number];
  zoom?: number;
  markers: MapMarker[];
  className?: string;
  scrollWheelZoom?: boolean;
}

export default function PropertyMap({
  center,
  zoom = 13,
  markers,
  className = "h-[480px]",
  scrollWheelZoom = false,
}: PropertyMapProps) {
  return (
    <div className={`relative z-0 w-full overflow-hidden rounded-2xl border border-line ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        className="h-full w-full"
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((m, i) => (
          <Marker
            key={`${m.label}-${i}`}
            position={[m.lat, m.lng]}
            icon={m.kind === "property" ? propertyIcon() : amenityIcon(m.kind)}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                {m.kind !== "property" && (
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a962", marginBottom: 4 }}>
                    {amenityName[m.kind]}
                  </div>
                )}
                <div style={{ fontWeight: 600, color: "#f5f1e8" }}>{m.label}</div>
                {m.sublabel && (
                  <div style={{ fontSize: 12, color: "#a8a49b", marginTop: 2 }}>{m.sublabel}</div>
                )}
                {m.href && (
                  <a
                    href={m.href}
                    style={{ display: "inline-block", marginTop: 8, fontSize: 12, color: "#c9a962" }}
                  >
                    View residence →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
