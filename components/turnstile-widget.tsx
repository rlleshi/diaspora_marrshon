"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileWindow = Window & {
  turnstile?: {
    render: (
      element: HTMLElement,
      options: Record<string, unknown>,
    ) => string;
    remove: (widgetId: string) => void;
  };
};

export function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
}: {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    const turnstileWindow = window as TurnstileWindow;

    if (!siteKey || !turnstileWindow.turnstile || !containerRef.current) {
      return;
    }

    if (widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = turnstileWindow.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": onExpire,
      "error-callback": onExpire,
      theme: "light",
    });
  }, [onExpire, onVerify, siteKey]);

  useEffect(() => {
    renderWidget();

    return () => {
      const turnstileWindow = window as TurnstileWindow;
      if (widgetIdRef.current && turnstileWindow.turnstile) {
        turnstileWindow.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div className="turnstile-slot" ref={containerRef} />
    </>
  );
}
