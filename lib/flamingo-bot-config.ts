const defaultBotOrigin =
  "https://flamingo-bot-949711463853.europe-west3.run.app";

export function flamingoBotOrigin(): string {
  const configured = process.env.FLAMINGO_BOT_URL?.trim() || defaultBotOrigin;
  let url: URL;

  try {
    url = new URL(configured);
  } catch {
    throw new Error("FLAMINGO_BOT_URL must be an absolute URL.");
  }

  const localDevelopment =
    process.env.NODE_ENV === "development" &&
    url.protocol === "http:" &&
    (url.hostname === "localhost" || url.hostname === "127.0.0.1");

  if (url.protocol !== "https:" && !localDevelopment) {
    throw new Error("FLAMINGO_BOT_URL must use HTTPS outside local development.");
  }

  return url.origin;
}
