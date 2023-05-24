// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '../../xata'
import axios from 'axios'

type Data = {
  name: string
}

const xata = getXataClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { videoId, transcript } = JSON.parse(
    Buffer.from(req.body).toString('utf8'),
  )
  const url = 'https://api.upload.io/v2/accounts/12a1yDh/uploads/binary'
  const authToken = 'Bearer public_12a1yDhFXdiwiqc5cp4roMGKbtde'
  const contentType = 'application/json' // Set the content type to JSON
  const data = JSON.stringify(transcript)

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: authToken,
        'Content-Type': contentType,
      },
    })
    const record = await xata.db.VideoRecord.create({
      video_id: videoId,
      transcriptionurl: response.data.fileUrl,
    })
    console.log('Upload successful:', response.data)
  } catch (error) {
    console.error('Upload failed:', error)
  }

  res.status(200).json({ name: 'John Doe' })
}
