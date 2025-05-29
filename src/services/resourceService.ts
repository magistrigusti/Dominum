// 📄 src/services/resourceService.ts

import  UserModel  from '@/models/UserModel';
import  ResourceNodeModel  from '@/models/ResourceNodeModel';

// Получить ресурсные точки пользователя
export async function getResourceNodes(wallet: string) {
  // ищем по address!
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  return await ResourceNodeModel.find({ owner: user._id });
}

// Обновить ресурсные точки (например, после сбора/освежения)
export async function updateResourceNodes(wallet: string, nodes: any[]) {
  // ищем по address!
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  // Удаляем старые точки и вставляем новые (или апдейтим каждую по id)
  await ResourceNodeModel.deleteMany({ owner: user._id });
  const bulk = nodes.map(node => ({
    ...node,
    owner: user._id,
    updatedAt: new Date(),
  }));
  await ResourceNodeModel.insertMany(bulk);
  return await ResourceNodeModel.find({ owner: user._id });
}
