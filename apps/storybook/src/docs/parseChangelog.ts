export interface ChangeEntry {
  version: string;
  date: string;
  content: string;
  component: string;
  pkg: string;
}

export interface DateGroup {
  date: string;
  entries: ChangeEntry[];
}

/**
 * markdown에서 특정 섹션(## Title) 내용을 추출한다.
 * 다음 ## 헤딩 전까지의 텍스트를 반환한다.
 */
export function extractSection(raw: string, sectionTitle: string): string {
  const lines = raw.split("\n");
  let inSection = false;
  const result: string[] = [];

  for (const line of lines) {
    if (/^## /.test(line)) {
      if (inSection) break; // 다음 ## 섹션 시작 → 종료
      if (line.trim() === `## ${sectionTitle}`) {
        inSection = true;
        continue; // 헤딩 자체는 포함하지 않음
      }
    } else if (inSection) {
      result.push(line);
    }
  }

  return result.join("\n").trim();
}

/**
 * Changelog 섹션에서 버전 블록을 파싱하여 ChangeEntry[] 반환.
 * 형식: ### vX.Y.Z (YYYY-MM-DD)
 */
export function parseChangelog(
  raw: string,
  component: string,
  pkg: string
): ChangeEntry[] {
  const changelogSection = extractSection(raw, "Changelog");
  if (!changelogSection) return [];

  const versionPattern = /^### (v[\d.]+) \((\d{4}-\d{2}-\d{2})\)/;
  const lines = changelogSection.split("\n");
  const entries: ChangeEntry[] = [];

  let currentVersion = "";
  let currentDate = "";
  let contentLines: string[] = [];

  const flush = () => {
    if (currentVersion) {
      entries.push({
        version: currentVersion,
        date: currentDate,
        content: contentLines.join("\n").trim(),
        component,
        pkg,
      });
    }
  };

  for (const line of lines) {
    const match = line.match(versionPattern);
    if (match) {
      flush();
      currentVersion = match[1];
      currentDate = match[2];
      contentLines = [];
    } else if (currentVersion) {
      contentLines.push(line);
    }
  }

  flush();
  return entries;
}

/**
 * ChangeEntry[]를 날짜별로 묶어 DateGroup[] 반환 (날짜 내림차순).
 */
export function groupByDate(entries: ChangeEntry[]): DateGroup[] {
  const map = new Map<string, ChangeEntry[]>();

  for (const entry of entries) {
    const existing = map.get(entry.date) ?? [];
    existing.push(entry);
    map.set(entry.date, existing);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, groupEntries]) => ({ date, entries: groupEntries }));
}
