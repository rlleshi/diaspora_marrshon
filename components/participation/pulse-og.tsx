import { ImageResponse } from "next/og";
import { isMeasured, participation } from "@/data/participation";

type Locale = "sq" | "en";

const COPY: Record<
  Locale,
  { kicker: string; title: (n: number) => string; sub: string; key: [string, string]; source: string }
> = {
  sq: {
    kicker: "PULSI I PROTESTËS",
    title: (n) => `${n} netë radhazi`,
    sub: "Turmat e mëdha erdhën në qershor; protesta nuk u ndal kurrë.",
    key: ["Një pikë për çdo natë.", "Sa më e madhe pika, aq më e madhe turma."],
    source: "Vlerësim me AI nga transmetimet live · diaspora-zbarkon.com/pulsi",
  },
  en: {
    kicker: "PROTEST PULSE",
    title: (n) => `${n} nights in a row`,
    sub: "The big crowds came in June; the protest never stopped.",
    key: ["One dot per night.", "The bigger the dot, the bigger the crowd."],
    source: "AI estimate from livestream footage · diaspora-zbarkon.com/en/pulsi",
  },
};

const WIDTH = 1200;
const HEIGHT = 630;
const PAD_X = 56;
const KEY_WIDTH = 300;
const GAP = 3;

/**
 * Link-preview card for /pulsi: the night count over the dot calendar, one week per
 * column like the site's wide layout. Drawn from the data on each build, so a new
 * night shows up in previews with the next deploy. Squares shrink as weeks are
 * added, so the grid always leaves room for the key beside it.
 */
export function pulseOgImage(locale: Locale) {
  const t = COPY[locale];
  const weeks = Math.ceil(participation.length / 7);
  const cell = Math.min(40, Math.floor((WIDTH - 2 * PAD_X - KEY_WIDTH - 40) / weeks));
  const columns = Array.from({ length: weeks }, (_, w) => participation.slice(w * 7, w * 7 + 7));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: `48px ${PAD_X}px`,
          background: "#fffaf2",
          color: "#151515",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#b91c1c" }}>
          {t.kicker}
        </div>
        <div style={{ display: "flex", marginTop: 8, fontSize: 68, lineHeight: 1 }}>
          {t.title(participation.length)}
        </div>
        <div style={{ display: "flex", marginTop: 14, fontSize: 28, color: "#5f625f" }}>
          {t.sub}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 30, gap: 40 }}>
          <div style={{ display: "flex", gap: GAP }}>
            {columns.map((week, w) => (
              <div key={w} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.map((d) => {
                  // area follows the index, as on the site: 20 June fills its square
                  const s = isMeasured(d) ? Math.sqrt(Math.min(d.peak, 100) / 100) : 0.3;
                  const dot = Math.max(4, Math.round((cell - GAP) * s));
                  return (
                    <div
                      key={d.day}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: cell - GAP,
                        height: cell - GAP,
                        borderRadius: 5,
                        background: "rgba(222, 215, 204, 0.3)",
                      }}
                    >
                      {/* a night with no figure is a hollow ring, as on the site */}
                      <div
                        style={
                          isMeasured(d)
                            ? { width: dot, height: dot, borderRadius: dot, background: "#b91c1c" }
                            : { width: dot, height: dot, borderRadius: dot, border: "1.5px solid #5f625f" }
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: KEY_WIDTH,
              fontSize: 24,
              lineHeight: 1.4,
              color: "#5f625f",
            }}
          >
            <div style={{ display: "flex" }}>{t.key[0]}</div>
            <div style={{ display: "flex" }}>{t.key[1]}</div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 20, color: "#5f625f" }}>
          {t.source}
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
