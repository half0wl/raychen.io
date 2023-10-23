import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((r) => setTimeout(r, 5000))
  return res.status(200).json({ status: 'ok' })
}

export default handler
