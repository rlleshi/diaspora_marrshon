"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies a block of text to the clipboard and says so for two seconds. */
export function CopyButton({
  text,
  label,
  doneLabel,
}: {
  text: string;
  label: string;
  doneLabel: string;
}) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      // Clipboard blocked (old browser, no permission): the text stays selectable.
    }
  }

  return (
    <button type="button" className="copy-button" onClick={copy}>
      {done ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
