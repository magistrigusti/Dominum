// src/app/api/user/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';
import { updateResourceNodesIfNeeded } from '@/utils/updateResourceNodes';
import { RESOURCE_CONFIG } from '@/constants/resources';

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    await dbConnect();

    let user = await UserModel.findOne({ address });

    if (!user) {
      user = await UserModel.create({
        address,
        avatar: '/icons/user-icon.png',
        heroes: [],
        resourceNodes: [],
      });
      console.log('✅ Создан новый пользователь:', user.address);
    }

    // 🛠 Генерация точек, если надо
    updateResourceNodesIfNeeded(user);

    // 🖼 Добавляем avatar к каждой точке
    if (user.resourceNodes) {
      for (const node of user.resourceNodes) {
        const meta = RESOURCE_CONFIG.find(r => r.key === node.resource);
        node.avatar = meta?.avatar || '/icons/resources/default.png';
      }
    }

    await user.save();

    return NextResponse.json({
      address: user.address,
      avatar: user.avatar,
      name: user.name,
      prestige: user.prestige,
      levelPrestige: user.levelPrestige,
      prestigeProgress: user.prestigeProgress,
      technologies: user.technologies,
      food: user.food,
      wood: user.wood,
      stone: user.stone,
      iron: user.iron,
      gold: user.gold,
      doubloon: user.doubloon,
      pearl: user.pearl,
      allodium: user.allodium,
      questShipRepaired: user.questShipRepaired,
      questPanelOpen: user.questPanelOpen,
      activeMining: user.activeMining,
      activeQuest: user.activeQuest,
      heroes: user.heroes || [],
      army: user.army || {},
      resourceNodes: user.resourceNodes || [],
    });

  } catch (err) {
    console.error('❌ [POST /api/user] Server error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
