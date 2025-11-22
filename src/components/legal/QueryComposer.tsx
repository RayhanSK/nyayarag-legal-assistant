import { useState } from "react";
import { Send, Settings, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface QueryComposerProps {
  onSubmit: (query: string, settings: ModelSettings) => void;
  isLoading?: boolean;
  className?: string;
  pinned?: boolean;
}

interface ModelSettings {
  temperature: number;
  maxTokens: number;
}

export const QueryComposer = ({
  onSubmit,
  isLoading = false,
  className,
  pinned = false,
}: QueryComposerProps) => {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<ModelSettings>({
    temperature: 0.7,
    maxTokens: 2000,
  });

  const handleSubmit = () => {
    if (query.trim() && !isLoading) {
      onSubmit(query, settings);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg shadow-lg",
        pinned && "fixed bottom-0 left-0 right-0 border-t border-x-0 rounded-t-lg rounded-b-none",
        className
      )}
    >
      <div className="p-4 space-y-3">
        {/* Query Input */}
        <div className="relative">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a legal question... (Ctrl+Enter to submit)"
            className="min-h-[100px] pr-12 resize-none text-body"
            disabled={isLoading}
            aria-label="Legal question input"
          />
          <div className="absolute top-2 right-2">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2">
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                aria-label="Toggle advanced settings"
              >
                <Settings className="h-4 w-4" />
                {showAdvanced ? "Hide" : "Show"} Settings
              </Button>
            </CollapsibleTrigger>
          </Collapsible>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {query.length} chars
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!query.trim() || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Query
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Advanced Settings */}
        <Collapsible open={showAdvanced}>
          <CollapsibleContent className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature" className="text-sm">
                    Temperature
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {settings.temperature.toFixed(1)}
                  </span>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[settings.temperature]}
                  onValueChange={([value]) =>
                    setSettings((prev) => ({ ...prev, temperature: value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Lower = more focused, Higher = more creative
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maxTokens" className="text-sm">
                    Max Tokens
                  </Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={settings.maxTokens}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        maxTokens: parseInt(e.target.value) || 2000,
                      }))
                    }
                    className="w-20 h-8 text-xs"
                  />
                </div>
                <Slider
                  min={500}
                  max={4000}
                  step={100}
                  value={[settings.maxTokens]}
                  onValueChange={([value]) =>
                    setSettings((prev) => ({ ...prev, maxTokens: value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Maximum response length
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
