// 📁 src/config/resourceLevel.ts

export interface ResourceLevelConfig {
  totalAmount: number;
  miningSpeed: number;
  restoreTime: number;
}

type ResourceLevelTable = {
  [level: number]: ResourceLevelConfig;
};

export const RESOURCE_LEVEL: Record<
  'food' | 'wood' | 'stone' | 'iron' | 'gold' | "pearl",
  ResourceLevelTable
> = {
  food: {
    1: {totalAmount: 110_000, miningSpeed: 700, restoreTime: 24 * 60 * 60 * 1000}, 
    2: {totalAmount: 285_000, miningSpeed: 1010, restoreTime: 24 * 60 * 60 * 1000}, //10
    3: {totalAmount: 400_000, miningSpeed: 1030, restoreTime: 24 * 60 * 60 * 1000}, //20
    4: {totalAmount: 550_000, miningSpeed: 1050, restoreTime: 24 * 60 * 60 * 1000}, //20
    5: {totalAmount: 850_000, miningSpeed: 1090, restoreTime: 24 * 60 * 60 * 1000}, //40
    6: {totalAmount: 1_250_000, miningSpeed: 1130, restoreTime: 24 * 60 * 60 * 1000}, //40
    7: {totalAmount: 1_800_000, miningSpeed: 1190, restoreTime: 24 * 60 * 60 * 1000}, //60
  },
  wood: {
    1: {totalAmount: 100_000, miningSpeed: 800, restoreTime: 24 * 60 * 60 * 1000}, 
    2: {totalAmount: 255_000, miningSpeed: 950, restoreTime: 24 * 60 * 60 * 1000}, //10
    3: {totalAmount: 350_000, miningSpeed: 970, restoreTime: 24 * 60 * 60 * 1000}, //20
    4: {totalAmount: 500_000, miningSpeed: 990, restoreTime: 24 * 60 * 60 * 1000}, //20
    5: {totalAmount: 750_000, miningSpeed: 1030, restoreTime: 24 * 60 * 60 * 1000}, //40
    6: {totalAmount: 1_100_000, miningSpeed: 1070, restoreTime: 24 * 60 * 60 * 1000}, //40
    7: {totalAmount: 1_650_000, miningSpeed: 1130, restoreTime: 24 * 60 * 60 * 1000}, //60
  },
  stone: {
    1: {totalAmount: 80_000, miningSpeed: 900, restoreTime: 24 * 60 * 60 * 1000},
    2: {totalAmount: 205_000, miningSpeed: 910, restoreTime: 24 * 60 * 60 * 1000}, //10
    3: {totalAmount: 310_000, miningSpeed: 930, restoreTime: 24 * 60 * 60 * 1000}, //20
    4: {totalAmount: 450_000, miningSpeed: 950, restoreTime: 24 * 60 * 60 * 1000}, //20
    5: {totalAmount: 650_000, miningSpeed: 990, restoreTime: 24 * 60 * 60 * 1000}, //40
    6: {totalAmount: 900_000, miningSpeed: 1030, restoreTime: 24 * 60 * 60 * 1000}, //40
    7: {totalAmount: 1_250_000, miningSpeed: 1090, restoreTime: 24 * 60 * 60 * 1000}, //60
  },
  iron: {
    1: {totalAmount: 60_000, miningSpeed: 1000, restoreTime: 24 * 60 * 60 * 1000},
    2: {totalAmount: 125_000, miningSpeed: 810, restoreTime: 24 * 60 * 60 * 1000}, //10
    3: {totalAmount: 250_000, miningSpeed: 830, restoreTime: 24 * 60 * 60 * 1000}, //20
    4: {totalAmount: 380_000, miningSpeed: 850, restoreTime: 24 * 60 * 60 * 1000}, //20
    5: {totalAmount: 550_000, miningSpeed: 890, restoreTime: 24 * 60 * 60 * 1000}, //40
    6: {totalAmount: 780_000, miningSpeed: 930, restoreTime: 24 * 60 * 60 * 1000}, //40
    7: {totalAmount: 940_000, miningSpeed: 990, restoreTime: 24 * 60 * 60 * 1000}, //60
  },
  gold: {
    1: {totalAmount: 25_000, miningSpeed: 1200, restoreTime: 24 * 60 * 60 * 1000},
    2: {totalAmount: 95_000, miningSpeed: 710, restoreTime: 24 * 60 * 60 * 1000}, //10
    3: {totalAmount: 150_000, miningSpeed: 730, restoreTime: 24 * 60 * 60 * 1000}, //20
    4: {totalAmount: 240_000, miningSpeed: 750, restoreTime: 24 * 60 * 60 * 1000}, //20
    5: {totalAmount: 400_000, miningSpeed: 790, restoreTime: 24 * 60 * 60 * 1000}, //40
    6: {totalAmount: 550_000, miningSpeed: 830, restoreTime: 24 * 60 * 60 * 1000}, //40
    7: {totalAmount: 800_000, miningSpeed: 890, restoreTime: 24 * 60 * 60 * 1000}, //60
  },
  pearl: {
    1: {totalAmount: 5_000, miningSpeed: 1500, restoreTime: 24 * 60 * 60 * 1000},
    2: {totalAmount: 50_000, miningSpeed: 510, restoreTime: 24 * 60 * 60 * 1000}, //10
    3: {totalAmount: 90_000, miningSpeed: 530, restoreTime: 24 * 60 * 60 * 1000}, //20
    4: {totalAmount: 180_000, miningSpeed: 550, restoreTime: 24 * 60 * 60 * 1000}, //20
    5: {totalAmount: 280_000, miningSpeed: 590, restoreTime: 24 * 60 * 60 * 1000}, //40
    6: {totalAmount: 400_000, miningSpeed: 730, restoreTime: 24 * 60 * 60 * 1000}, //40
    7: {totalAmount: 520_000, miningSpeed: 790, restoreTime: 24 * 60 * 60 * 1000}, //60
  },
};