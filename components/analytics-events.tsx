"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useEffect, type AnchorHTMLAttributes, type ReactNode } from "react";

type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

type TrackedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  eventName: string;
  eventProperties?: AnalyticsProperties;
  children: ReactNode;
};

export function TrackedLink({
  href,
  eventName,
  eventProperties,
  children,
  target,
  download,
  ...props
}: TrackedLinkProps) {
  const handleClick = () => {
    track(eventName, eventProperties);
  };

  const shouldUseNextLink = href.startsWith("/") && !target && !download;

  if (shouldUseNextLink) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={target}
      download={download}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

export function SectionViewTracker({
  targetId,
  eventName,
  eventProperties,
}: {
  targetId: string;
  eventName: string;
  eventProperties?: AnalyticsProperties;
}) {
  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        track(eventName, eventProperties);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [eventName, eventProperties, targetId]);

  return null;
}
