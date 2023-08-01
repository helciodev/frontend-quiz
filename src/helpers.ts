export function showEmoji(points: number): string | undefined {
  let emoji;
  if (points === 0) emoji = "🤦‍♂️";
  if (points > 0 && points < 50) emoji = "🎉";
  if (points > 50 && points < 80) emoji = "🥉";
  if (points > 80 && points < 150) emoji = "🥈";
  if (points === 280) emoji = "🥇";
  return emoji;
}
