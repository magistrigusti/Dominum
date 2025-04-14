import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export async function allocateResources() {
  await dbConnect();

  const now = new Date();
  const hours = now.getHours();
  const validHours = [4, 12, 20];

  if (!validHours.includes(hours)) return;

  const users = await UserModel.find();

  for (const user of users) {
    user.pendingRewards = {
      food: 100,
      wood: 50,
      stone: 40,
      iron: 25,
      gold: 10,
    };

    await user.save();
  }

  console.log(`[cron] Rewards allocated at ${now.toISOString()}`);
}
