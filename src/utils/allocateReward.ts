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
      food: 50,
      wood: 30,
      stone: 20,
      iron: 10,
      gold: 5,
    };

    await user.save();
  }

  console.log(`[cron] Rewards allocated at ${now.toISOString()}`);
}
