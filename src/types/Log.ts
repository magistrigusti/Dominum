// 📄 src/types/Log.ts

export interface MissionLog {
  event: string;            // Тип события (например, "attack", "collect", "levelUp")
  time: string | Date;      // Время события
  details?: any;            // Дополнительные параметры (гибко)
  // Можно добавить: sourceId, targetId, value, результат и пр.
}
