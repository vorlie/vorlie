interface Env {
  LASTFM_API_KEY: string;
}

interface LastFmError {
  error: number;
  message: string;
}

const USERNAME = "vorlie";
const LASTFM_API = "https://ws.audioscrobbler.com/2.0/";

const ALLOWED_METHODS = new Set([
  "user.getrecenttracks",
  "user.gettopartists",
  "user.gettoptracks",
  "user.gettopalbums",
]);

const ALLOWED_PERIODS = new Set([
  "7day",
  "1month",
  "3month",
  "6month",
  "12month",
  "overall",
]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (context.request.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  const url = new URL(context.request.url);
  const method = url.searchParams.get("method");

  if (!method || !ALLOWED_METHODS.has(method)) {
    return json(
      {
        error: "Unsupported Last.fm method",
        allowedMethods: [...ALLOWED_METHODS],
      },
      400,
    );
  }

  const rawLimit = Number(url.searchParams.get("limit") ?? "10");

  const limit = Number.isInteger(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 50)
    : 10;

  const period = url.searchParams.get("period") ?? "7day";

  if (!ALLOWED_PERIODS.has(period)) {
    return json(
      {
        error: "Invalid period",
        allowedPeriods: [...ALLOWED_PERIODS],
      },
      400,
    );
  }

  const apiKey = context.env.LASTFM_API_KEY;

  if (!apiKey) {
    return json({ error: "Last.fm API key is not configured" }, 500);
  }

  const params = new URLSearchParams({
    method,
    user: USERNAME,
    api_key: apiKey,
    format: "json",
    limit: String(limit),
  });

  // period is relevant to the top-* endpoints.
  if (
    method === "user.gettopartists" ||
    method === "user.gettoptracks" ||
    method === "user.gettopalbums"
  ) {
    params.set("period", period);
  }

  try {
    const response = await fetch(`${LASTFM_API}?${params}`);

    const data = (await response.json()) as
      | Record<string, unknown>
      | LastFmError;

    if (!response.ok) {
      return json(
        {
          error: "Last.fm request failed",
          details: data,
        },
        response.status,
      );
    }

    if ("error" in data) {
      return json(data, 502);
    }

    return json(data, 200, {
      "Cache-Control": "public, max-age=30, s-maxage=30",
    });
  } catch (error) {
    console.error("Last.fm request failed:", error);

    return json({ error: "Failed to fetch data from Last.fm" }, 502);
  }
};

function json(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...extraHeaders,
    },
  });
}
