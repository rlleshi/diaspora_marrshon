"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPinned } from "lucide-react";
import { track } from "@vercel/analytics";
import type { Locale } from "@/lib/content";

/**
 * The live Flamingo Map, behind a click. Until the visitor asks for it the page
 * shows a still of the map and makes no request to GitHub Pages or the
 * OpenStreetMap tile servers (the privacy page says so). The click also keeps a
 * map that pans on touch from catching the page scroll before anyone wants it.
 */
export function FlamingoMapEmbed({
  src,
  title,
  loadLabel,
  loadNote,
  previewAlt,
  locale,
}: {
  src: string;
  title: string;
  loadLabel: string;
  loadNote: string;
  previewAlt: string;
  locale: Locale;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="map-embed">
        <iframe
          className="map-embed-frame"
          src={src}
          title={title}
          allow="fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    );
  }

  return (
    // A click anywhere on the picture loads the map; the button inside keeps it
    // reachable by keyboard, and its click bubbles up here.
    <div
      className="map-embed map-embed-facade"
      onClick={() => {
        setLoaded(true);
        track("Map Loaded", { locale });
      }}
    >
      <Image
        src="/map/flamingo-map-preview.jpg"
        alt={previewAlt}
        fill
        sizes="(max-width: 1180px) 100vw, 1180px"
        className="map-embed-preview"
      />
      <div className="map-embed-action">
        <button type="button" className="button button-primary">
          <MapPinned aria-hidden="true" size={20} />
          {loadLabel}
        </button>
        <p>{loadNote}</p>
      </div>
    </div>
  );
}
