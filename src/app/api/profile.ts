import { NextApiRequest, NextApiResponse } from 'next'
import { authenticateToken } from '../middleware/auth'
import { db } from '@/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticateToken(req, res, async () => {
    const userId = req.user.userId

    const user = await db.user.findUnique({
      where: { id: userId },
      include: { Order: true },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  })
}
