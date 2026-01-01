import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });

  const targetUrl = decodeURIComponent(url);
  const clientUserAgent =
    req.headers.get("user-agent") ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
  const clientAcceptLanguage =
    req.headers.get("accept-language") || "en-US,en;q=0.9";

  const res = await fetch(targetUrl, {
    headers: {
      "User-Agent": clientUserAgent,
      Accept: "*/*",
      "Accept-Language": clientAcceptLanguage,
      Origin: "https://megacloud.tv",
      Referer: "https://megacloud.tv/",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!res.ok) {
    console.error("Proxy error: Upstream returned", res.status, res.statusText);
    const text = await res.text();
    console.error("Upstream body preview:", text.substring(0, 200));
    return new Response(text, { status: res.status });
  }

  const contentType = res.headers.get("content-type") || "";
  console.log("Proxy success:", res.status, contentType);

  // Jika M3U8 → rewrite isinya
  if (
    contentType.includes("application/vnd.apple.mpegurl") ||
    contentType.includes("application/x-mpegURL")
  ) {
    let text = await res.text();

    const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf("/") + 1);

    text = text.replace(/(.*\.m3u8|.*\.ts|.*\.key)/g, (line) => {
      if (line.startsWith("http")) {
        return `/api/proxy?url=${encodeURIComponent(line)}`;
      }
      return `/api/proxy?url=${encodeURIComponent(baseUrl + line)}`;
    });

    return new Response(text, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // selain m3u8 (ts, key)
  return new Response(res.body, {
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
