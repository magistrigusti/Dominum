// 📄 src/app/api/user/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/UserModel';
import { updateResourceNodesIfNeeded } from '@/utils/updateResourceNodes';
import { RESOURCE_CONFIG } from '@/config/resource/RESOURCE_CONFIG';
import { generateDefaultArmy } from '@/config/army/ARMY_CONFIG'; // если надо

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    await dbConnect();

    let user = await UserModel.findOne({ address })
      .populate('heroes')
      .populate('missions')
      .populate('ships')
      .populate('resourceNodes');

    if (!user) {
      // Создание нового пользователя со всеми нужными начальными параметрами!
      user = await UserModel.create({
        address,
        avatar: '/icons/user-icon.png',
        name: 'Капитан',
        prestige: 100,
        levelPrestige: 0,
        prestigeProgress: 0,
        technologies: null,
        questShipRepaired: false,
        resources: {
          food: 0, wood: 0, stone: 0, iron: 0, gold: 0, doubloon: 0,
          pearl: 0, astral_crystal: 0, allodium: 0,
        },
        army: generateDefaultArmy(), // функция возвращает дефолтный массив army
        heroes: [],
        missions: [],
        ships: [],
        resourceNodes: [],
      });
      console.log('✅ Создан новый пользователь:', user.address);
    }

    // ⚡️ Автоматически завершаем миссии (например, завершён сбор, герой ушёл, и т.д.)
    if (user.activeMining) {
      const now = Date.now();
      const start = new Date(user.activeMining.startedAt).getTime();
      const end = start + user.activeMining.duration * 1000;
      if (now >= end) {
        // Награда за добычу — добавить ресурсы пользователю!
        const gained = user.activeMining.remaining || 0;
        const resKey = user.activeMining.resource;
        if (typeof user.resources[resKey] === 'number') {
          user.resources[resKey] += gained;
        }
        // Убираем миссию из активных
        user.missions = user.missions.filter((m: any) => m.heroId !== user.activeMining.heroId);
        user.activeMining = null;
      }
    }

    // 🛠 Генерация и обновление ресурсных точек если требуется
    await updateResourceNodesIfNeeded(user);

    // 🖼 Добавляем avatar к каждой точке
    if (user.resourceNodes && Array.isArray(user.resourceNodes)) {
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
      questShipRepaired: user.questShipRepaired,
      resources: user.resources,
      reward: user.reward,
      army: user.army,
      heroes: user.heroes,
      missions: user.missions,
      ships: user.ships,
      resourceNodes: user.resourceNodes,
      activeMining: user.activeMining,
      activeQuest: user.activeQuest,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

  } catch (err) {
    console.error('❌ [POST /api/user] Server error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
