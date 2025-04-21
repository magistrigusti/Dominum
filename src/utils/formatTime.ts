
export function formatSeconds(seconds: number): string {
  if (seconds < 0) seconds = 0;

  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  let result = '';
  if (d > 0) result += `${d}д `;
  if (h > 0 || d > 0) result += `${h}ч `;
  if (m > 0 || h > 0 || d > 0) result += `${m}м `;
  result += `${s}с`;

  return result.trim();
}
