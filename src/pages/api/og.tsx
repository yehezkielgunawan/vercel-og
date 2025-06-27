// This file is for AWS/SST (Node.js) deployments.
// For Vercel Edge Runtime, use og.edge.tsx instead.

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(400).json({
		message:
			"This endpoint is only available on Vercel Edge Runtime. For AWS/SST, use /api/og-sst instead.",
	});
}
