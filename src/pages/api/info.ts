/* eslint-disable import/no-anonymous-default-export */
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient, currentUser } from '@clerk/nextjs';

export const config = {
  runtime: "edge",
};

export default async (request: NextRequest) => {

  const { userId } = getAuth(request);
  const user = await clerkClient.users.getUser(userId??"");

  console.log(user.emailAddresses[0].emailAddress);

  const { url } = await request.json();

  const response = await fetch("https://apps.beam.cloud/nhmjr", {
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
