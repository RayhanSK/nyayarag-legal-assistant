import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

interface QueryHistoryProps {
  history: HistoryItem[];
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
}

export const QueryHistory = ({ history, onSelectQuery, onClearHistory }: QueryHistoryProps) => {
  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-sidebar-primary" />
            <h2 className="font-semibold text-sidebar-foreground">Query History</h2>
          </div>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="h-8 px-2 hover:bg-sidebar-accent"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Session queries ({history.length})
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {history.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No queries yet. Start by asking a legal question.
            </div>
          ) : (
            <div className="space-y-1">
              {history.map((item, index) => (
                <div key={item.id}>
                  <button
                    onClick={() => onSelectQuery(item.query)}
                    className="w-full text-left p-3 rounded-md hover:bg-sidebar-accent transition-colors group"
                  >
                    <p className="text-sm text-sidebar-foreground line-clamp-2 mb-1">
                      {item.query}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </button>
                  {index < history.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">
          History is cleared when you refresh the page
        </p>
      </div>
    </div>
  );
};
