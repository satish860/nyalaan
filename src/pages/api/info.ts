import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { getXataClient } from "../../xata";

const xata = getXataClient();

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: NextRequest) => {
  const { url } = await request.json();

  const response = await fetch("https://apps.beam.cloud/nhmjr", {
    method: "POST",
    headers: {
      "Accept-Encoding": "gzip, deflate",
      Authorization: process.env.INFO_API_KEY ?? " ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
    }),
  });

  const text = await response.json();
  const incoming_record = text.response;
  const record = await xata.db.Dashboard.create({
    user_id: userId,
    video_name: incoming_record.videoId,
    title: incoming_record.title,
    thumbnail: JSON.stringify(incoming_record.thumbnail),
    author: incoming_record.author,
    url: url,
  });

  const { userId } = getAuth(request);
  const user = await clerkClient.users.getUser(userId ?? "");

  console.log(user.emailAddresses[0].emailAddress);

  return NextResponse.json({
    info: text,
  });
};
