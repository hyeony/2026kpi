import type { Member, Project } from '../types';
import { todayKey } from './storage';

export interface DrinkCount {
  drink: string;
  count: number;
}

export interface OrderItem {
  member: Member;
  drinks: string[];
}

export function getParticipatingMembers(
  project: Project,
  participatingIds: string[],
): Member[] {
  const idSet = new Set(participatingIds);
  return project.members.filter((m) => idSet.has(m.id));
}

export function buildOrderItems(members: Member[]): OrderItem[] {
  return members
    .map((member) => ({
      member,
      drinks: member.preferredDrinks.filter(Boolean),
    }))
    .filter((item) => item.drinks.length > 0);
}

export function aggregateDrinks(items: OrderItem[]): DrinkCount[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const drink of item.drinks) {
      counts.set(drink, (counts.get(drink) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([drink, count]) => ({ drink, count }))
    .sort((a, b) => b.count - a.count || a.drink.localeCompare(b.drink, 'ko'));
}

export function formatOrderText(
  projectName: string,
  items: OrderItem[],
  aggregated: DrinkCount[],
  date = todayKey(),
): string {
  const lines: string[] = [
    `☕ Coffee Shuttle 주문`,
    `프로젝트: ${projectName}`,
    `날짜: ${date}`,
    '',
  ];

  if (items.length === 0) {
    lines.push('참여 멤버가 없거나 선호 음료가 설정되지 않았습니다.');
    return lines.join('\n');
  }

  lines.push('[멤버별]');
  for (const { member, drinks } of items) {
    lines.push(`• ${member.name}: ${drinks.join(', ')}`);
  }

  lines.push('', '[음료별 집계]');
  for (const { drink, count } of aggregated) {
    lines.push(`• ${drink} ×${count}`);
  }

  lines.push('', `총 ${aggregated.reduce((sum, d) => sum + d.count, 0)}잔`);
  return lines.join('\n');
}
