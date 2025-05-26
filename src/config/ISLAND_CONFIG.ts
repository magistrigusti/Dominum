// 📄 src/config/ISLAND_CONFIG.ts

export type IslandType = 'wild' | 'faction' | 'market' | 'fortress' | 'event';

interface IslandConfig {
  label: string;
  icon: string;
  description: string;
  canMine: boolean;
  canTrade: boolean;
  canHire: boolean;
  pvpZone: boolean;
  isCapturable: boolean;
  faction?: string; // id фракции, если есть
  background?: string;
}

export const ISLAND_CONFIG: Record<IslandType, IslandConfig> = {
  wild: {
    label: 'Дикий остров',
    icon: '/assets/islands/wild.png',
    description: 'Незахваченный остров, богатый ресурсами. Можно добывать, нельзя торговать.',
    canMine: true,
    canTrade: false,
    canHire: false,
    pvpZone: true,
    isCapturable: true
  },
  faction: {
    label: 'Остров фракции',
    icon: '/assets/islands/faction.png',
    description: 'База фракции. Добывать ресурсы нельзя, можно торговать и нанимать.',
    canMine: false,
    canTrade: true,
    canHire: true,
    pvpZone: false,
    isCapturable: false,
    faction: 'allodians'
  },
  market: {
    label: 'Рынок',
    icon: '/assets/islands/market.png',
    description: 'Место для торговли и аукционов. Ресурсы не добываются.',
    canMine: false,
    canTrade: true,
    canHire: false,
    pvpZone: false,
    isCapturable: false
  },
  fortress: {
    label: 'Форпост',
    icon: '/assets/islands/fortress.png',
    description: 'Военный остров, точка контроля. Можно воевать, нельзя добывать.',
    canMine: false,
    canTrade: false,
    canHire: false,
    pvpZone: true,
    isCapturable: true
  },
  event: {
    label: 'Событийный остров',
    icon: '/assets/islands/event.png',
    description: 'Остров с уникальными механиками, временные события.',
    canMine: true,
    canTrade: true,
    canHire: true,
    pvpZone: true,
    isCapturable: false
  }
};
