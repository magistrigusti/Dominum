// 📄 src/config/ARMY_ADVANTAGE_MATRIX.ts

export const ARMY_ADVANTAGE_MATRIX = {
  peasant:   { peasant: 1.0, axeman: 0.4, spearman: 0.3, archer: 0.5, cavalry: 0.2, sailor: 0.5 },
  axeman:    { peasant: 1.2, axeman: 1.0, spearman: 0.9, archer: 1.1, cavalry: 0.8, sailor: 1.0 },
  spearman:  { peasant: 1.3, axeman: 0.9, spearman: 1.0, archer: 1.1, cavalry: 1.2, sailor: 0.9 },
  archer:    { peasant: 1.3, axeman: 0.9, spearman: 0.8, archer: 1.0, cavalry: 1.8, sailor: 1.1 },
  cavalry:   { peasant: 1.5, axeman: 1.1, spearman: 0.7, archer: 1.4, cavalry: 1.0, sailor: 1.3 },
  sailor:    { peasant: 1.2, axeman: 1.0, spearman: 1.0, archer: 1.0, cavalry: 0.9, sailor: 1.0 },
} as const;
