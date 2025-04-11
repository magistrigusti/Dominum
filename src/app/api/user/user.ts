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
    await dbConnect(); // Подключение к базе данных

    let user = await UserModel.findOne({ address });

    if (!user) {
      user = await UserModel.create({
        address,
        avatar: '/icons/user-icon.png',
        prestige: '0',
      });
      console.log('Создан новый пользователь:', user);
    } else {
      console.log('Пользователь найден:', user);
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('[api/user] Ошибка:', err);
    return res.status(500).json({ error: 'Server error', details: err });
  }
}
