import { flamingoBotOrigin } from "@/lib/flamingo-bot-config";

const allowedMedia = new Set([
  "flamingo-avatar-poster.webp",
  "flamingo-avatar-loop.webm",
  "flamingo-avatar-loop.mp4",
]);
const proxyOrigin = "https://www.diaspora-zbarkon.com";
const maxChatBytes = 64 * 1024;

type RouteContext = { params: Promise<{ path: string[] }> };

function allowedPath(path: string[], method: "GET" | "POST"): string | null {
  const joined = path.join("/");

  if (method === "POST") {
    return joined === "v1/chat" ? joined : null;
  }

  if (joined === "widget/flamingo-chat.js") return joined;
  if (path.length === 3 && path[0] === "widget" && path[1] === "media") {
    return allowedMedia.has(path[2]) ? joined : null;
  }

  return null;
}

async function relay(
  request: Request,
  context: RouteContext,
  method: "GET" | "POST",
): Promise<Response> {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const { path } = await context.params;
  const allowed = allowedPath(path, method);
  if (!allowed) return new Response(null, { status: 404 });

  const headers = new Headers({ Origin: proxyOrigin });
  let body: ArrayBuffer | undefined;

  if (method === "POST") {
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return new Response(null, { status: 415 });
    }
    if (Number(request.headers.get("content-length")) > maxChatBytes) {
      return new Response(null, { status: 413 });
    }
    body = await request.arrayBuffer();
    if (body.byteLength > maxChatBytes) {
      return new Response(null, { status: 413 });
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "text/event-stream");
  } else if (allowed.startsWith("widget/media/")) {
    const range = request.headers.get("range");
    if (range) headers.set("Range", range);
  }

  try {
    const upstream = await fetch(new URL(`/${allowed}`, flamingoBotOrigin()), {
      method,
      headers,
      body,
      redirect: "manual",
      signal: request.signal,
    });
    if (upstream.status >= 300 && upstream.status < 400) {
      return new Response(null, { status: 502 });
    }

    const responseHeaders = new Headers();
    for (const name of [
      "content-type",
      "cache-control",
      "content-range",
      "accept-ranges",
      "x-request-id",
    ]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    responseHeaders.set("X-Robots-Tag", "noindex, nofollow");

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return new Response(null, { status: 502 });
  }
}

export function GET(request: Request, context: RouteContext) {
  return relay(request, context, "GET");
}

export function POST(request: Request, context: RouteContext) {
  return relay(request, context, "POST");
}
