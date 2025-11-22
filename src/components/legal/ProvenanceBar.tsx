import { Shield, Clock, CheckCircle2 } from "lucide-react";
import { MetadataBadge } from "./MetadataBadge";
import { CitationData } from "./CitationPill";

interface ProvenanceBarProps {
  sources: CitationData[];
  timestamp: Date;
  verified?: boolean;
}

export const ProvenanceBar = ({ sources, timestamp, verified = false }: ProvenanceBarProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-surface-secondary border-l-4 border-accent rounded-r-md">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-foreground">
            Sources: {sources.length} document{sources.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {verified && (
            <span className="flex items-center gap-1 text-success">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {sources.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center gap-1">
              {source.jurisdiction && (
                <MetadataBadge type="jurisdiction" value={source.jurisdiction} />
              )}
              {source.court && (
                <MetadataBadge type="court" value={source.court} />
              )}
              {source.date && (
                <MetadataBadge type="date" value={source.date} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
