import { FileText, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface Source {
  title: string;
  content: string;
  citation?: string;
}

interface AnswerDisplayProps {
  query: string;
  answer: string;
  sources?: Source[];
  enhancedQuery?: string;
}

export const AnswerDisplay = ({ query, answer, sources, enhancedQuery }: AnswerDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* Query Section */}
      <Card className="bg-query border-border">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Your Question</h3>
              <p className="text-base leading-relaxed text-foreground">{query}</p>
              {enhancedQuery && enhancedQuery !== query && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Enhanced query:</p>
                  <p className="text-sm text-foreground/80 italic">{enhancedQuery}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Answer Section */}
      <Card className="bg-answer border-border">
        <div className="p-6">
          <h3 className="font-semibold text-foreground mb-4 text-lg">Legal Analysis</h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        </div>
      </Card>

      {/* Sources Section */}
      {sources && sources.length > 0 && (
        <Card className="bg-source border-border">
          <div className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              Retrieved Sources & Citations
            </h3>
            <div className="space-y-4">
              {sources.map((source, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      {index + 1}. {source.title}
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                      {source.content}
                    </p>
                    {source.citation && (
                      <p className="text-xs text-muted-foreground italic">
                        Citation: {source.citation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
