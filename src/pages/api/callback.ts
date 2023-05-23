import type { NextApiRequest, NextApiResponse } from "next";

export default function Callback(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200);
}
