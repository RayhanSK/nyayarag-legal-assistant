import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CitationData {
  id: number;
  title: string;
  jurisdiction?: string;
  court?: string;
  date?: string;
  page?: number;
}

interface CitationPillProps {
  citation: CitationData;
  onClick: () => void;
  className?: string;
}

export const CitationPill = ({ citation, onClick, className }: CitationPillProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "bg-citation-bg border border-citation-border",
        "hover:bg-citation-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "transition-all duration-200",
        "group cursor-pointer",
        className
      )}
      aria-label={`Citation ${citation.id}: ${citation.title}`}
    >
      <span className="font-semibold text-sm text-accent">
        [{citation.id}]
      </span>
      <ExternalLink className="h-3 w-3 text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};
