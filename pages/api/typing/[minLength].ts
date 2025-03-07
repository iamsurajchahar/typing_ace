import { NextApiRequest, NextApiResponse } from "next";

// Fix for SSL certificate issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.query.minLength) {
      return res.status(400).json({ error: "minLength parameter is required" });
    }

    const response = await fetch(`https://api.quotable.io/random?minLength=${req.query.minLength}`);
    const data = await response.json();

    if (!data.content) {
      throw new Error("API response is missing 'content'");
    }

    res.status(200).json({ quote: data.content, author: data.authorSlug });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}


