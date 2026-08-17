"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Flag, MapPinned } from "lucide-react";
import type { SiteContent } from "@/lib/content";

type PastMarches = SiteContent["pastMarches"];

// The track scrolls one card per press. Card width is driven by CSS (two per
// view on desktop, one on narrow screens), so the step is measured from the
// rendered cards instead of being hardcoded here.
export function HistoryCarousel({
  items,
  carousel,
}: {
  items: PastMarches["items"];
  carousel: PastMarches["carousel"];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return 0;
    if (cards.length > 1) return cards[1].offsetLeft - cards[0].offsetLeft;
    return cards[0].offsetWidth;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(maxScroll <= 1 || track.scrollLeft >= maxScroll - 1);
    const width = step();
    setActive(width > 0 ? Math.round(track.scrollLeft / width) : 0);
  }, [step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * step(), behavior: "smooth" });
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * step(), behavior: "smooth" });
  };

  return (
    <div className="history-carousel">
      <div
        className="history-track"
        ref={trackRef}
        role="group"
        aria-label={carousel.regionLabel}
        tabIndex={0}
      >
        {items.map((item) => (
          <article className="history-item" key={item.dateLabel}>
            <span className="history-date">
              <Flag aria-hidden="true" size={18} />
              {item.dateLabel}
            </span>
            <h3>{item.title}</h3>
            <p className="history-route">
              <MapPinned aria-hidden="true" size={16} />
              {item.route}
            </p>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>

      <div className="history-controls">
        <button
          type="button"
          className="history-arrow"
          aria-label={carousel.prevLabel}
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
        >
          <ChevronLeft aria-hidden="true" size={20} />
        </button>
        <div className="history-dots">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.dateLabel}
              className={
                index === active ? "history-dot history-dot-active" : "history-dot"
              }
              aria-label={`${carousel.goToLabel}: ${item.dateLabel}`}
              aria-current={index === active}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="history-arrow"
          aria-label={carousel.nextLabel}
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
        >
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>
    </div>
  );
}
