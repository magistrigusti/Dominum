// 📄 src/config/SHIP_CONFIG.ts

export type ShipType = 'scout' | 'trader' | 'frigate' | 'galleon' | 'flagship';

interface ShipConfig {
  label: string;
  icon: string;
  baseCapacity: number;
  baseSpeed: number;
  maxCrew: number;
  durability: number;
  slotCount: number;
  description?: string;
  class?: string; // например, military/trade/explorer
}

export const SHIP_CONFIG: Record<ShipType, ShipConfig> = {
  scout: {
    label: 'Разведчик',
    icon: '/assets/ships/scout.png',
    baseCapacity: 2000,
    baseSpeed: 18,
    maxCrew: 2,
    durability: 60,
    slotCount: 3,
    description: 'Малый разведывательный корабль, быстрый и незаметный.',
    class: 'explorer'
  },
  trader: {
    label: 'Торговец',
    icon: '/assets/ships/trader.png',
    baseCapacity: 5000,
    baseSpeed: 12,
    maxCrew: 5,
    durability: 90,
    slotCount: 4,
    description: 'Средний грузовой корабль, оптимален для торговли.',
    class: 'trade'
  },
  frigate: {
    label: 'Фрегат',
    icon: '/assets/ships/frigate.png',
    baseCapacity: 3500,
    baseSpeed: 15,
    maxCrew: 8,
    durability: 120,
    slotCount: 6,
    class: 'military'
  },
  galleon: {
    label: 'Галеон',
    icon: '/assets/ships/galleon.png',
    baseCapacity: 9000,
    baseSpeed: 10,
    maxCrew: 15,
    durability: 200,
    slotCount: 8,
    class: 'trade'
  },
  flagship: {
    label: 'Флагман',
    icon: '/assets/ships/flagship.png',
    baseCapacity: 12000,
    baseSpeed: 8,
    maxCrew: 20,
    durability: 300,
    slotCount: 12,
    class: 'military'
  }
};
