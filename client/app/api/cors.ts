import Cors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";

export async function handleCors(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res, {
    methods: ["GET", "POST"],
    origin: process.env.NEXT_PUBLIC_API_BASE_URL,
    optionsSuccessStatus: 200,
  });
}
