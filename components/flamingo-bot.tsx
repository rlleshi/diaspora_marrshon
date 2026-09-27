"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

export function FlamingoBot({ botOrigin }: { botOrigin: string }) {
  const pathname = usePathname();
  const mount = useRef<HTMLDivElement>(null);
  const base =
    process.env.NODE_ENV === "development" ? "/api/flamingo-bot" : botOrigin;

  useEffect(() => {
    const english = pathname === "/en" || pathname.startsWith("/en/");
    document.documentElement.lang = english ? "en" : "sq";
  }, [pathname]);

  useEffect(() => {
    const widget = document.createElement("flamingo-chat");
    widget.setAttribute("api-base", base);
    widget.setAttribute("asset-base", `${base}/widget/media`);
    widget.setAttribute("button-label", "Pyet Flamingon");
    widget.style.setProperty("--flamingo-accent", "var(--red)");
    widget.style.setProperty("--flamingo-ink", "var(--ink)");
    widget.style.setProperty("--flamingo-muted", "var(--muted)");
    widget.style.setProperty("--flamingo-paper", "var(--paper)");
    const trackLauncher = (event: MouseEvent) => {
      if (
        event.composedPath().some(
          (node) => node instanceof HTMLElement && node.classList.contains("launcher"),
        )
      ) {
        track("Flamingo Bot Opened", { locale: document.documentElement.lang });
      }
    };
    widget.addEventListener("click", trackLauncher);
    mount.current?.append(widget);

    return () => {
      widget.removeEventListener("click", trackLauncher);
      widget.remove();
    };
  }, [base]);

  useEffect(() => {
    const widget = mount.current?.querySelector("flamingo-chat");
    widget?.setAttribute(
      "button-label",
      pathname === "/en" || pathname.startsWith("/en/")
        ? "Ask Flamingo"
        : "Pyet Flamingon",
    );
  }, [pathname]);

  return (
    <>
      <Script
        src={`${base}/widget/flamingo-chat.js`}
        type="module"
        strategy="lazyOnload"
      />
      <div ref={mount} />
    </>
  );
}
