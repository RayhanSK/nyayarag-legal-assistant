import { X, StickyNote, Link2, Download } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CitationData } from "./CitationPill";
import { MetadataBadge } from "./MetadataBadge";

interface DocumentViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  citation: CitationData | null;
  onCreateNote: () => void;
  onAnchorCitation: () => void;
}

export const DocumentViewer = ({
  open,
  onOpenChange,
  citation,
  onCreateNote,
  onAnchorCitation,
}: DocumentViewerProps) => {
  if (!citation) return null;

  // Mock document content - in production this would load the actual document
  const documentContent = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

<mark>This is the highlighted passage that was cited in the chat. It appears in yellow to help users verify the exact source of information used by the AI assistant.</mark>

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  `.trim();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <SheetTitle className="text-xl mb-3">{citation.title}</SheetTitle>
              <div className="flex flex-wrap gap-2">
                {citation.jurisdiction && (
                  <MetadataBadge type="jurisdiction" value={citation.jurisdiction} />
                )}
                {citation.court && (
                  <MetadataBadge type="court" value={citation.court} />
                )}
                {citation.date && (
                  <MetadataBadge type="date" value={citation.date} />
                )}
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-6">
            {/* Document Controls */}
            <div className="flex gap-2 mb-6 pb-4 border-b">
              <Button
                size="sm"
                variant="secondary"
                onClick={onCreateNote}
                className="flex-1"
              >
                <StickyNote className="h-4 w-4 mr-2" />
                Create Note
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={onAnchorCitation}
                className="flex-1"
              >
                <Link2 className="h-4 w-4 mr-2" />
                Anchor Citation
              </Button>
              <Button size="sm" variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Page Info */}
            <div className="mb-4 text-sm text-muted-foreground">
              Page {citation.page || 1} of 10
            </div>

            {/* Document Content with Highlighting */}
            <div className="prose prose-sm max-w-none">
              <style>
                {`
                  mark {
                    background-color: hsl(48, 100%, 85%);
                    padding: 2px 4px;
                    border-radius: 3px;
                    animation: highlightPulse 1.5s ease-in-out;
                  }
                  
                  @keyframes highlightPulse {
                    0%, 100% { background-color: hsl(48, 100%, 85%); }
                    50% { background-color: hsl(48, 100%, 75%); }
                  }
                `}
              </style>
              <div
                className="text-body leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: documentContent }}
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
