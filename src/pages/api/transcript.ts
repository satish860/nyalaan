import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async (request: NextRequest) => {
  const { url } = await request.json();

  const response = await fetch("https://apps.beam.cloud/rk6nl", {
    method: "POST",
    headers: {
      "Accept-Encoding": "gzip, deflate",
      "Authorization": process.env.INFO_API_KEY ?? " ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
    }),
  });

  const text = await response.json();

  return NextResponse.json({
    info: text,
  });
};

