import { useState } from "react";
import { Search, Loader2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QueryHistory, HistoryItem } from "@/components/QueryHistory";
import { AnswerDisplay, Source } from "@/components/AnswerDisplay";
import { useToast } from "@/hooks/use-toast";

interface QueryResult {
  query: string;
  answer: string;
  sources?: Source[];
  enhancedQuery?: string;
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Replace this URL with your actual Flask/FastAPI endpoint
  const API_ENDPOINT = "/api/answer"; // e.g., "http://localhost:5000/api/answer"

  const handleSubmitQuery = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter a legal question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to your Python backend
      // Example API call structure:
      /*
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }
      
      const data = await response.json();
      */

      // MOCK RESPONSE - Replace this with actual API call above
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      const mockData = {
        answer: `Based on the retrieved legal documents, here is the analysis:\n\nThis is a placeholder response. Please connect this frontend to your Python backend by implementing the API call in the handleSubmitQuery function.\n\nYour backend should expose an endpoint (e.g., POST /api/answer) that accepts a JSON payload with the query and returns:\n- answer: The LLM-generated response\n- sources: (Optional) Array of source documents\n- enhancedQuery: (Optional) The enhanced/expanded query\n\nOnce connected, this will display real legal analysis from your NyayaRAG system.`,
        sources: [
          {
            title: "Example Legal Document 1",
            content: "This is example source content that would come from your DPR retrieval system. Replace this with actual retrieved passages from your backend.",
            citation: "Section 123, Legal Code (2024)",
          },
          {
            title: "Example Legal Document 2",
            content: "Another example source passage. Your Python backend should return the actual retrieved document chunks here.",
            citation: "Case Reference XYZ-456",
          },
        ],
        enhancedQuery: "Enhanced version of: " + query,
      };

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        query: query,
        timestamp: new Date(),
      };
      setHistory([newHistoryItem, ...history]);

      // Set result
      setCurrentResult({
        query: query,
        answer: mockData.answer,
        sources: mockData.sources,
        enhancedQuery: mockData.enhancedQuery,
      });

      setQuery(""); // Clear input
      
      toast({
        title: "Query processed",
        description: "Legal analysis complete",
      });
    } catch (error) {
      console.error("Error fetching answer:", error);
      toast({
        title: "Error",
        description: "Failed to process query. Please check your backend connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryQuery = (historicalQuery: string) => {
    setQuery(historicalQuery);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setCurrentResult(null);
    toast({
      title: "History cleared",
      description: "Starting fresh session",
    });
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <QueryHistory
          history={history}
          onSelectQuery={handleSelectHistoryQuery}
          onClearHistory={handleClearHistory}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">NyayaRAG</h1>
            </div>
            <p className="text-muted-foreground">
              Advanced Legal Retrieval-Augmented Generation System
            </p>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-8 py-8">
            {/* Query Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                Ask a legal question
              </label>
              <div className="space-y-3">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="E.g., What are the legal requirements for contract formation under common law?"
                  className="min-h-[120px] text-base resize-none"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      handleSubmitQuery();
                    }
                  }}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Press Ctrl+Enter to submit
                  </p>
                  <Button
                    onClick={handleSubmitQuery}
                    disabled={isLoading || !query.trim()}
                    className="min-w-[140px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Submit Query
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {currentResult && (
              <AnswerDisplay
                query={currentResult.query}
                answer={currentResult.answer}
                sources={currentResult.sources}
                enhancedQuery={currentResult.enhancedQuery}
              />
            )}

            {/* Welcome State */}
            {!currentResult && !isLoading && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Welcome to NyayaRAG
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter your legal question above to receive AI-powered analysis backed by
                  relevant legal documents and citations.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card">
          <div className="px-8 py-6">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-semibold text-foreground mb-2">About NyayaRAG</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NyayaRAG is an advanced legal retrieval assistant that combines Dense Passage
                Retrieval (DPR) with smart document chunking to provide high-faithfulness,
                explainable legal question answering. Designed for legal professionals, it
                retrieves relevant legal precedents, statutes, and documents to support
                accurate, citation-backed responses.
              </p>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  <strong>Backend Integration:</strong> Connect your Flask/FastAPI endpoint by
                  updating the API_ENDPOINT variable in the code. Your backend should expose a
                  POST endpoint that accepts queries and returns answers with sources.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
