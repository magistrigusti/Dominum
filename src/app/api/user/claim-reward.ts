import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/UserModel';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { address, resource } = req.body;
  if (!address || !resource) return res.status(400).json({error: "Invalid data"});

  const user = await UserModel.findOne({ address });
  if (!user) return res.status(404).json({error: "User not found"});

  const pending = user.pendingRewards?.[resource] ?? 0;
  if (pending <= 0) return res.status(401).json({error: "Nothing to claim"});

  user[resource] += pending;
  user.pendingRewards[resource] = 0;
  await user.save();

  return res.json({
    success: true,
    resources: {
      food: user.food,
      wood: user.wood,
      stone: user.iron,
      gold: user.gold,
    },
    pendingRewards: user.pendingRewards,
  });
}