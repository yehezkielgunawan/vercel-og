import type { NextApiRequest, NextApiResponse } from "next";
import satori from "satori";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import React from "react";
import { twj } from "tw-to-css";

import { baseImageURL } from "@/constants/baseConstants";

// Load fonts
const fontPath = join(process.cwd(), "public/assets/font");
const firaSansBold = readFileSync(join(fontPath, "FiraSans-Bold.otf"));
const firaSansLight = readFileSync(join(fontPath, "FiraSans-Light.otf"));
const firaSansMedium = readFileSync(join(fontPath, "FiraSans-Medium.otf"));
const firaSansRegular = readFileSync(join(fontPath, "FiraSans-Regular.otf"));

function tw(style: string, extra?: React.CSSProperties): React.CSSProperties {
	return { ...twj(style), ...extra };
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		const { title, desc, siteName, socialMedia, imgUrl } = req.query;

		const titleText = (title as string) ?? "Title";
		const descText = (desc as string) ?? "Description";
		const siteNameText = (siteName as string) ?? "yehezgun.com";
		const socialMediaText = (socialMedia as string) ?? "Twitter: @yehezgun";
		const imageUrl = (imgUrl as string) ?? baseImageURL;

		const svg = await satori(
			React.createElement(
				"div",
				{
					style: {
						...tw(
							"relative flex h-[600px] w-[1200px] flex-col bg-gradient-to-br from-slate-800 to-slate-600 font-sans",
						),
						background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
						fontFamily: "FiraSans-Regular",
					},
				},
				// Main content row
				React.createElement(
					"div",
					{
						style: tw(
							"box-border flex h-[420px] w-full flex-row items-center justify-between px-24 pt-12",
						),
					},
					// Left: Title and Description
					React.createElement(
						"div",
						{
							style: tw("flex max-w-3xl flex-col"),
						},
						React.createElement(
							"h1",
							{
								style: {
									...tw("m-0 text-5xl text-white leading-tight"),
									fontFamily: "FiraSans-Bold",
									wordBreak: "break-word",
								},
							},
							titleText,
						),
						React.createElement(
							"h4",
							{
								style: {
									...tw("m-0 mt-8 text-3xl text-white leading-snug"),
									fontFamily: "FiraSans-Light",
									wordBreak: "break-word",
								},
							},
							descText,
						),
					),
					// Right: Image
					React.createElement(
						"div",
						{
							style: {
								...tw(
									"flex h-[256px] w-[256px] items-center justify-center overflow-hidden rounded-full",
								),
								backgroundColor:
									imageUrl === baseImageURL ? "#64748b" : "transparent",
							},
						},
						React.createElement("img", {
							src: imageUrl,
							alt: "og-image",
							width: 256,
							height: 256,
							style: {
								...tw("h-[256px] w-[256px] object-cover"),
								borderRadius: imageUrl === baseImageURL ? "50%" : "0",
							},
						}),
					),
				),
				// Footer row
				React.createElement(
					"div",
					{
						style: tw(
							"box-border flex h-1/6 w-full flex-row items-center justify-between px-24 text-white",
						),
					},
					React.createElement(
						"p",
						{
							style: {
								...tw("m-0 font-bold text-xl"),
								fontFamily: "FiraSans-Medium",
							},
						},
						siteNameText,
					),
					React.createElement(
						"p",
						{
							style: {
								...tw("m-0 font-medium text-xl"),
								fontFamily: "FiraSans-Regular",
							},
						},
						socialMediaText,
					),
				),
			),
			{
				width: 1200,
				height: 600,
				fonts: [
					{
						name: "FiraSans-Bold",
						data: firaSansBold,
						weight: 700,
						style: "normal",
					},
					{
						name: "FiraSans-Light",
						data: firaSansLight,
						weight: 300,
						style: "normal",
					},
					{
						name: "FiraSans-Medium",
						data: firaSansMedium,
						weight: 500,
						style: "normal",
					},
					{
						name: "FiraSans-Regular",
						data: firaSansRegular,
						weight: 400,
						style: "normal",
					},
				],
			},
		);

		// Set response headers
		res.setHeader("Content-Type", "image/svg+xml");
		res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
		res.status(200).send(svg);
	} catch (error) {
		console.error("Error generating OG image:", error);
		res.status(500).json({ message: "Error generating OG image" });
	}
}
