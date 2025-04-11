export function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(`❌ Переменная окружения ${key} не определена`);
  }
  return value;
}