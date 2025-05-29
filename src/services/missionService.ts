// 📄 src/services/missionService.ts

import MissionModel from '@/models/MissionModel';
import UserModel from '@/models/UserModel';
import HeroModel from '@/models/HeroModel';
import ArmyModel from '@/models/ArmyModel';

// Получить все миссии игрока
export async function getUserMissions(wallet: string) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');
  return await MissionModel.find({ owner: user._id });
}

// Создать новую миссию (добыча, битва)
export async function createMission(wallet: string, missionData: any) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');

  // Можно добавить дополнительные проверки: есть ли свободный герой, нет ли у него уже миссии и т.д.

  const mission = new MissionModel({
    ...missionData,
    owner: user._id,
    status: 'active',
    createdAt: new Date(),
  });
  await mission.save();
  return mission.toObject();
}

// Завершить миссию, начислить награду и вернуть героя/армию
export async function completeMission(wallet: string, missionId: string) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  const mission = await MissionModel.findOne({ _id: missionId, owner: user._id });
  if (!mission || mission.status !== 'active') throw new Error('Mission not active');
  // Тут — расчет награды, ресурсов, опыта
  mission.status = 'completed';
  mission.completedAt = new Date();
  await mission.save();
  // Можно начислить ресурсы, опыт, вернуть героя и армию (если нужно)
  return mission.toObject();
}

// Отменить миссию — вернуть героя и армию (если применимо)
export async function cancelMission(wallet: string, missionId: string) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  const mission = await MissionModel.findOne({ _id: missionId, owner: user._id });
  if (!mission || mission.status !== 'active') throw new Error('Mission not active');
  // Логика: возможно, вернуть часть ресурсов или опыта, как штраф
  mission.status = 'cancelled';
  mission.cancelledAt = new Date();
  await mission.save();
  // Вернуть героя/армию (если нужно)
  return mission.toObject();
}
