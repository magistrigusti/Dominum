// 📄 src/services/resourceService.ts

import { ResourceNode } from "@/types/ResourceNode";
import { RESOURCE_CONFIG } from "@/config/RESOURCE_CONFIG";

// Интервал проверки, например, раз в 10 минут
const AUTO_RESTORE_CHECK_INTERVAL = 10 * 60 * 1000; // 10 минут в ms
// Минимальное время простоя для начала восстановления (например, 4 часа)
const AUTO_RESTORE_IDLE_DELAY = 4 * 60 * 60 * 1000; // 4 часа в ms

/**
 * Выполняет авто-восстановление ресурса, если точка поддерживает восстановление.
 * @param node — ресурсная точка из базы
 * @returns true, если что-то восстановлено
 */
export function tryAutoRestoreResourceNode(node: ResourceNode): boolean {
  const config = RESOURCE_CONFIG[node.resource as keyof typeof RESOURCE_CONFIG];

  if (!config?.autoRestore) return false; // только для обычных ресурсов

  if (node.activeHero) return false; // нельзя восстанавливать, если кто-то добывает

  // Если нет информации — не трогаем
  if (!node.lastMiningTime) return false;

  const now = Date.now();
  const idleTime = now - node.lastMiningTime;

  if (idleTime < AUTO_RESTORE_IDLE_DELAY) return false; // недостаточно времени простоя

  // restoreSpeed — в час, считаем сколько "tick'ов" прошло
  const hoursIdle = idleTime / (60 * 60 * 1000);
  const restoreSpeed = config.restoreSpeed || 0; // сколько единиц в час

  const restored = Math.floor(hoursIdle * restoreSpeed);
  if (restored <= 0) return false;

  // Обновляем currentAmount, не превышая totalAmount
  const newAmount = Math.min(node.currentAmount + restored, node.totalAmount);

  // Можно добавить лог, сколько восстановили
  // Если уже полный — не трогаем
  if (newAmount === node.currentAmount) return false;

  node.currentAmount = newAmount;
  node.lastMiningTime = now; // обновляем время, чтобы не "накапливать" восстановление

  // Если полностью восстановили — isDepleted = false
  if (node.currentAmount >= node.totalAmount) {
    node.isDepleted = false;
  }

  return true;
}
