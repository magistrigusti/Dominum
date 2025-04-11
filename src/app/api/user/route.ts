import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { address, ...data } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    await dbConnect();

    const allowedFields = [
      "name", "avatar", "food", "wood", "stone", "iron",
      "gold", "doubloon", "pearl", "allodium",
      "prestige", "levelPrestige", "prestigeProgress", "technologies"
    ];

    const updatePayload: any = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updatePayload[key] = data[key];
      }
    }

    const user = await UserModel.findOneAndUpdate(
      { address },
      updatePayload,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('[api/user/update] Ошибка:', err);
    return res.status(500).json({ error: "Server error", details: err });
  }
}
