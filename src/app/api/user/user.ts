// 📂 src/app/api/user.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    await dbConnect();

    let user = await UserModel.findOne({ address });

    if (!user) {
      user = await UserModel.create({
        address,
        avatar: '/icons/user-icon.png',
        // ❗ все остальные поля возьмутся из схемы через default
      });
      console.log('✅ Создан новый пользователь:', user.address);
    } else {
      console.log('ℹ️ Пользователь найден:', user.address);
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('[api/user] ❌ Ошибка:', err);
    return res.status(500).json({ error: 'Server error', details: err });
  }
}
