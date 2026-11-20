export type PlacementTone = "gold" | "silver" | "bronze" | "default";

export interface PlacementInfo {
  label: string;
  tone: PlacementTone;
}

/**
 * Resolves a numeric rank or string tag into a placement label and color tone.
 * - Winner / 1st: Gold
 * - Runner-up / 2nd: Silver
 * - Second Runner-up / 3rd: Bronze
 * - Leaderboard (e.g. #4, Top 10): Default neutral tone
 */
export function resolvePlacement(
  rank?: number | string,
  tag?: string,
): PlacementInfo | null {
  const raw = (tag ?? (rank !== undefined ? String(rank) : "")).trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();

  // Bronze: second-runner, second runner, 3rd, 3, bronze
  if (
    lower.includes("second-runner") ||
    lower.includes("second runner") ||
    lower.includes("second-runner-up") ||
    lower.includes("second runner-up") ||
    lower === "3" ||
    lower === "#3" ||
    lower.startsWith("3rd") ||
    lower.includes("bronze")
  ) {
    return {
      label: tag || "Second Runner-up",
      tone: "bronze",
    };
  }

  // Silver: runner, runner-up, 2nd, 2, silver
  if (
    lower.includes("runner") ||
    lower === "2" ||
    lower === "#2" ||
    lower.startsWith("2nd") ||
    lower.includes("silver")
  ) {
    return {
      label: tag || "Runner-up",
      tone: "silver",
    };
  }

  // Gold: winner, 1st, first, gold, 1, champion
  if (
    lower.includes("winner") ||
    lower.includes("champion") ||
    lower === "1" ||
    lower === "#1" ||
    lower.startsWith("1st") ||
    lower.includes("first") ||
    lower.includes("gold")
  ) {
    return {
      label: tag || "Winner",
      tone: "gold",
    };
  }

  // Pure numeric rank >= 4
  const numericMatch = raw.match(/^\d+$/);
  if (numericMatch) {
    return {
      label: `#${raw}`,
      tone: "default",
    };
  }

  return {
    label: raw,
    tone: "default",
  };
}
