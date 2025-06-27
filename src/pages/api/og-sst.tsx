import type { NextApiRequest, NextApiResponse } from "next";
import satori from "satori";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import React from "react";

import { baseImageURL } from "@/constants/baseConstants";

// Load fonts
const fontPath = join(process.cwd(), "public/assets/font");
const firaSansBold = readFileSync(join(fontPath, "FiraSans-Bold.otf"));
const firaSansLight = readFileSync(join(fontPath, "FiraSans-Light.otf"));
const firaSansMedium = readFileSync(join(fontPath, "FiraSans-Medium.otf"));
const firaSansRegular = readFileSync(join(fontPath, "FiraSans-Regular.otf"));

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
						background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
						width: 1200,
						height: 600,
						display: "flex",
						flexDirection: "column",
						fontFamily: "FiraSans-Regular",
						position: "relative",
					},
				},
				// Main content row
				React.createElement(
					"div",
					{
						style: {
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: 1200,
							height: 420,
							paddingLeft: 96,
							paddingRight: 96,
							paddingTop: 52,
							marginTop: 0,
							boxSizing: "border-box",
						},
					},
					// Left: Title and Description
					React.createElement(
						"div",
						{
							style: {
								display: "flex",
								flexDirection: "column",
								maxWidth: 600,
							},
						},
						React.createElement(
							"h1",
							{
								style: {
									fontSize: 60,
									fontFamily: "FiraSans-Bold",
									margin: 0,
									lineHeight: 1.2,
									color: "#fff",
									wordBreak: "break-word",
								},
							},
							titleText,
						),
						React.createElement(
							"h4",
							{
								style: {
									fontSize: 36,
									fontFamily: "FiraSans-Light",
									margin: "32px 0 0 0",
									lineHeight: 1.3,
									color: "#fff",
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
								width: 256,
								height: 256,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "50%",
								backgroundColor:
									imageUrl === baseImageURL ? "#64748b" : "transparent",
								overflow: "hidden",
							},
						},
						React.createElement("img", {
							src: imageUrl,
							alt: "og-image",
							width: 256,
							height: 256,
							style: {
								width: 256,
								height: 256,
								borderRadius: imageUrl === baseImageURL ? "50%" : "0",
								objectFit: "cover",
							},
						}),
					),
				),
				// Footer row
				React.createElement(
					"div",
					{
						style: {
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: 1200,
							height: 80,
							paddingLeft: 96,
							paddingRight: 96,
							boxSizing: "border-box",
							color: "#fff",
						},
					},
					React.createElement(
						"p",
						{
							style: {
								fontSize: 24,
								fontFamily: "FiraSans-Medium",
								fontWeight: 500,
								margin: 0,
							},
						},
						siteNameText,
					),
					React.createElement(
						"p",
						{
							style: {
								fontSize: 24,
								fontFamily: "FiraSans-Regular",
								fontWeight: 400,
								margin: 0,
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
