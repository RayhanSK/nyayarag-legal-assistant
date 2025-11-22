import { User, Bot } from "lucide-react";
import { CitationPill, CitationData } from "./CitationPill";
import { ProvenanceBar } from "./ProvenanceBar";
import { cn } from "@/lib/utils";

export interface MessageContent {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: CitationData[];
  timestamp: Date;
  verified?: boolean;
}

interface ChatMessageProps {
  message: MessageContent;
  onCitationClick: (citation: CitationData) => void;
}

export const ChatMessage = ({ message, onCitationClick }: ChatMessageProps) => {
  const isUser = message.role === "user";

  // Parse content to insert citations inline
  const renderContentWithCitations = () => {
    if (!message.citations || message.citations.length === 0) {
      return <p className="text-body-lg leading-relaxed whitespace-pre-wrap">{message.content}</p>;
    }

    // Split content by citation markers [1], [2], etc.
    const parts = message.content.split(/(\[\d+\])/g);
    
    return (
      <div className="text-body-lg leading-relaxed">
        {parts.map((part, index) => {
          const match = part.match(/\[(\d+)\]/);
          if (match) {
            const citationNum = parseInt(match[1]);
            const citation = message.citations?.find(c => c.id === citationNum);
            if (citation) {
              return (
                <CitationPill
                  key={index}
                  citation={citation}
                  onClick={() => onCitationClick(citation)}
                  className="mx-1"
                />
              );
            }
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-lg",
        isUser ? "bg-surface-secondary" : "bg-card border border-border"
      )}
    >
      <div className="flex-shrink-0">
        <div
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            isUser ? "bg-primary" : "bg-accent"
          )}
        >
          {isUser ? (
            <User className="h-4 w-4 text-primary-foreground" />
          ) : (
            <Bot className="h-4 w-4 text-accent-foreground" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm text-foreground">
            {isUser ? "You" : "NyayaRAG Assistant"}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        {renderContentWithCitations()}

        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-4">
            <ProvenanceBar
              sources={message.citations}
              timestamp={message.timestamp}
              verified={message.verified}
            />
          </div>
        )}
      </div>
    </div>
  );
};
