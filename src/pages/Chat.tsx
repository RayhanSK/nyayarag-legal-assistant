import { useState, useEffect, useRef } from "react";
import { Scale, Menu, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, MessageContent } from "@/components/legal/ChatMessage";
import { QueryComposer } from "@/components/legal/QueryComposer";
import { DocumentViewer } from "@/components/legal/DocumentViewer";
import { CitationData } from "@/components/legal/CitationPill";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const [messages, setMessages] = useState<MessageContent[]>([]);
  const [selectedCitation, setSelectedCitation] = useState<CitationData | null>(null);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle initial query from dashboard
  useEffect(() => {
    if (location.state?.query) {
      handleSubmitQuery(location.state.query, { temperature: 0.7, maxTokens: 2000 });
    }
  }, [location.state]);

  const handleSubmitQuery = async (query: string, settings: any) => {
    const userMessage: MessageContent = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Backend integration point: POST /api/query
      // Mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockCitations: CitationData[] = [
        {
          id: 1,
          title: "California Contract Law Statutes",
          jurisdiction: "California",
          court: "Supreme Court",
          date: "2023-05-15",
          page: 42,
        },
        {
          id: 2,
          title: "Restatement (Second) of Contracts",
          jurisdiction: "Federal",
          court: "N/A",
          date: "1981",
          page: 15,
        },
      ];

      const assistantMessage: MessageContent = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on the retrieved legal documents, contract formation under common law requires the following elements:

1. **Offer and Acceptance**: There must be a definite offer by one party and an unequivocal acceptance by the other [1]. The terms must be sufficiently clear and certain.

2. **Consideration**: Each party must provide something of value in exchange for the promise of the other party. This can be money, services, or forbearance from an action [2].

3. **Mutual Assent**: Both parties must have a "meeting of the minds" and intend to be legally bound by the agreement [1].

4. **Legal Capacity**: Parties must have the legal capacity to enter into a contract (of legal age, sound mind, etc.).

5. **Legal Purpose**: The contract must be for a lawful purpose and not contrary to public policy [1][2].

These elements are consistently applied across common law jurisdictions, though specific interpretations may vary by state.`,
        citations: mockCitations,
        timestamp: new Date(),
        verified: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      toast.success("Query processed successfully");
    } catch (error) {
      console.error("Error processing query:", error);
      toast.error("Failed to process query. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitationClick = (citation: CitationData) => {
    setSelectedCitation(citation);
    setShowDocViewer(true);
  };

  const handleExportConversation = () => {
    toast.success("Conversation exported");
    // Backend integration point: Export functionality
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Scale className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">NyayaRAG Chat</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportConversation}
              aria-label="Export conversation"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/settings")}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div ref={scrollRef} className="max-w-5xl mx-auto px-6 py-8">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Ask a Legal Question
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  I'll search through legal documents and provide citations to support my answers.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onCitationClick={handleCitationClick}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Query Composer */}
      <div className="flex-shrink-0 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <QueryComposer onSubmit={handleSubmitQuery} isLoading={isLoading} />
        </div>
      </div>

      {/* Document Viewer */}
      <DocumentViewer
        open={showDocViewer}
        onOpenChange={setShowDocViewer}
        citation={selectedCitation}
        onCreateNote={() => toast.success("Note created")}
        onAnchorCitation={() => toast.success("Citation anchored to conversation")}
      />
    </div>
  );
};

export default Chat;
