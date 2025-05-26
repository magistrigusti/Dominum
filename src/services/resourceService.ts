// 📄 src/services/resourceService.ts
import { ResourceNode } from "@/types/Resource";
import { RESOURCE_LEVEL } from "@/config/RESOURCE_LEVEL";
import { RESOURCE_CONFIG } from "@/config/RESOURCE_CONFIG";

const AUTO_RESTORE_CHECK_INTERVAL = 10 * 60 * 1000; // 10 минут
const AUTO_RESTORE_IDLE_DELAY = 4 * 60 * 60 * 1000; // 4 часа

export function tryAutoRestoreResourceNode(node: ResourceNode): boolean {
  // 1. Проверяем возможность авто-восстановления через CONFIG (паспорт ресурса)
  const resourceConfig = RESOURCE_CONFIG[node.resource as keyof typeof RESOURCE_CONFIG];
  if (!resourceConfig?.autoRestore) return false;

  if (node.activeHero) return false;
  if (!node.lastMiningTime) return false;

  // 2. Берём уровень точки и параметры уровня
  const levels = RESOURCE_LEVEL[node.resource as keyof typeof RESOURCE_LEVEL];
  const level = node.level ?? 0;
  const levelConfig = levels[level];
  if (!levelConfig) return false;

  const now = Date.now();
  const idleTime = now - node.lastMiningTime;

  if (idleTime < AUTO_RESTORE_IDLE_DELAY) return false;

  // 3. Восстанавливаем по restoreTime
  const { totalAmount, restoreTime } = levelConfig;
  if (!restoreTime) return false;

  // Считаем сколько циклов восстановления прошло
  const restoreCycles = Math.floor(idleTime / (restoreTime * 1000));
  if (restoreCycles <= 0) return false;

  // За каждый цикл восстанавливаем 1/3 totalAmount (пример)
  const restoreAmount = Math.floor((totalAmount / 3) * restoreCycles);
  if (restoreAmount <= 0) return false;

  const newAmount = Math.min(node.currentAmount + restoreAmount, totalAmount);

  if (newAmount === node.currentAmount) return false;

  node.currentAmount = newAmount;
  node.lastMiningTime = now;

  if (node.currentAmount >= totalAmount) {
    node.isDepleted = false;
  }

  return true;
}
