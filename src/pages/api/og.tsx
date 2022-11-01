import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import { interBold, interMedium } from "@/lib/helpers/inter";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const interMediumFontData = await interMedium;
  const interBoldFontData = await interBold;
  const title = searchParams.get("title") ?? "Sample Title";
  const desc = searchParams.get("desc") ?? "Sample Description";
  const siteName = searchParams.get("siteName") ?? "yehezgun.com";
  const imgUrl =
    searchParams.get("imgUrl") ??
    "https://res.cloudinary.com/yehez/image/upload/v1646485864/yehez_avatar_transparent_swwqcq.png";
  return new ImageResponse(
    (
      <div tw="bg-gray-800 w-full h-full flex flex-col">
        <div tw="w-full h-10/12 flex items-center justify-between px-24 text-white">
          <div tw="flex flex-col">
            <h1 tw="text-6xl font-bold" style={{ fontFamily: "Inter-Bold" }}>
              {title}
            </h1>
            <h4 tw="text-3xl mt-8" style={{ fontFamily: "Inter-Medium" }}>
              {desc}
            </h4>
          </div>
          <figure tw="bg-slate-600 rounded-full">
            <img
              src={imgUrl}
              alt="og-image"
              width="256"
              height="256"
              style={{
                borderRadius: 100,
              }}
            />
          </figure>
        </div>
        <div tw="w-full h-1/6 px-24 flex items-center justify-between text-white">
          <p tw="font-bold text-xl">{siteName}</p>
          <p tw="font-medium text-xl">Twitter: @yehezgun</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter-Medium",
          data: interMediumFontData,
          weight: 600,
        },
        {
          name: "Inter-Bold",
          data: interBoldFontData,
          weight: 800,
        },
      ],
    }
  );
}
