import { Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecentQuery {
  id: string;
  query: string;
  timestamp: Date;
  citations: number;
}

interface RecentQueriesProps {
  queries: RecentQuery[];
  onQueryClick: (query: RecentQuery) => void;
}

export const RecentQueries = ({ queries, onQueryClick }: RecentQueriesProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Queries</h3>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {queries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No recent queries. Start by asking a legal question.
            </p>
          ) : (
            queries.map((query) => (
              <button
                key={query.id}
                onClick={() => onQueryClick(query)}
                className="w-full text-left p-3 rounded-md hover:bg-secondary transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                      {query.query}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{query.timestamp.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{query.citations} citations</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
