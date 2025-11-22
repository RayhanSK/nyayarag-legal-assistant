import { useState } from "react";
import { Upload, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/legal/DashboardStats";
import { RecentQueries } from "@/components/legal/RecentQueries";
import { DocumentIngestModal } from "@/components/legal/DocumentIngestModal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showIngest, setShowIngest] = useState(false);
  const navigate = useNavigate();

  const mockRecentQueries = [
    {
      id: "1",
      query: "What are the legal requirements for contract formation under common law?",
      timestamp: new Date(2024, 0, 15, 14, 30),
      citations: 5,
    },
    {
      id: "2",
      query: "Explain the doctrine of promissory estoppel in California jurisdiction",
      timestamp: new Date(2024, 0, 15, 12, 15),
      citations: 3,
    },
    {
      id: "3",
      query: "What constitutes breach of fiduciary duty in corporate law?",
      timestamp: new Date(2024, 0, 14, 16, 45),
      citations: 7,
    },
  ];

  const handleIngest = async (files: any, metadata: any) => {
    console.log("Ingesting files:", files, metadata);
    // Backend integration point: POST /api/documents/ingest
    setShowIngest(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your legal research activity and manage documents
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <Button
            size="lg"
            className="h-24 flex-col gap-2"
            onClick={() => navigate("/chat")}
          >
            <Play className="h-6 w-6" />
            <span>Start New Query</span>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-24 flex-col gap-2"
            onClick={() => setShowIngest(true)}
          >
            <Upload className="h-6 w-6" />
            <span>Ingest Documents</span>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-24 flex-col gap-2"
          >
            <BookOpen className="h-6 w-6" />
            <span>Load Demo Dataset</span>
          </Button>
        </div>

        {/* Recent Queries */}
        <RecentQueries
          queries={mockRecentQueries}
          onQueryClick={(query) => {
            console.log("Navigate to query:", query);
            navigate("/chat", { state: { query: query.query } });
          }}
        />
      </main>

      {/* Ingest Modal */}
      <DocumentIngestModal
        open={showIngest}
        onOpenChange={setShowIngest}
        onIngest={handleIngest}
      />
    </div>
  );
};

export default Dashboard;
