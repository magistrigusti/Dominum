// 📄 src/types/Effect.ts
export interface UnitEffect {
  type: string;        // Тип эффекта
  value: number;       // Сила эффекта
  duration?: number;   // Продолжительность (опционально)
}
