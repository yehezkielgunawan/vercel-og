import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

import { baseImageURL, baseURL } from "@/constants/baseConstants";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url, baseURL);

  const title = searchParams.get("title") ?? "Title";
  const desc = searchParams.get("desc") ?? "Description";
  const siteName = searchParams.get("siteName") ?? "yehezgun.com";
  const socialMedia = searchParams.get("socialMedia") ?? "Twitter: @yehezgun";
  const imgUrl = searchParams.get("imgUrl") ?? baseImageURL;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div tw="w-full h-10/12 flex items-center justify-between px-24 text-white">
          <div tw="flex flex-col max-w-3xl">
            <h1 tw="text-5xl" style={{ fontFamily: "FiraSans-Bold" }}>
              {title}
            </h1>
            <h4 tw="text-3xl mt-8" style={{ fontFamily: "FiraSans-Light" }}>
              {desc}
            </h4>
          </div>
          <figure
            tw={imgUrl === baseImageURL ? "bg-slate-600 rounded-full" : ""}
          >
            <img
              tw={imgUrl === baseImageURL ? "rounded-full" : ""}
              src={imgUrl}
              alt="og-image"
              width="256"
              height="256"
            />
          </figure>
        </div>
        <div tw="w-full h-1/6 px-24 flex items-center justify-between text-white">
          <p tw="font-bold text-xl" style={{ fontFamily: "FiraSans-Medium" }}>
            {siteName}
          </p>
          <p
            tw="font-medium text-xl"
            style={{ fontFamily: "FiraSans-Regular" }}
          >
            {socialMedia}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
