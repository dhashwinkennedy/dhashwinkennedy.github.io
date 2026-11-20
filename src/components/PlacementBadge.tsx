import { Award, Medal, Trophy } from "lucide-react";
import { resolvePlacement } from "../lib/placement";

interface Props {
  rank?: number | string;
  tag?: string;
  className?: string;
}

export default function PlacementBadge({ rank, tag, className }: Props) {
  const placement = resolvePlacement(rank, tag);
  if (!placement) return null;

  return (
    <span
      className={`placement-badge placement-badge--${placement.tone}${
        className ? ` ${className}` : ""
      }`}
    >
      {placement.tone === "gold" && (
        <Trophy size={12} strokeWidth={1.8} aria-hidden="true" />
      )}
      {placement.tone === "silver" && (
        <Medal size={12} strokeWidth={1.8} aria-hidden="true" />
      )}
      {placement.tone === "bronze" && (
        <Medal size={12} strokeWidth={1.8} aria-hidden="true" />
      )}
      {placement.tone === "default" && (
        <Award size={12} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span>{placement.label}</span>
    </span>
  );
}
