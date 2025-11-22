import { Scale, ArrowRight, Shield, Zap, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">NyayaRAG</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Advanced Legal Retrieval-Augmented Generation System
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            High-Fidelity Legal Research Powered by AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            NyayaRAG combines Dense Passage Retrieval with intelligent document chunking
            to deliver explainable, citation-backed legal analysis for legal professionals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/chat")}>
              Try Demo
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Verified Sources</h3>
            <p className="text-muted-foreground">
              Every answer includes numbered citations with exact document references.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">DPR Technology</h3>
            <p className="text-muted-foreground">
              Dense Passage Retrieval ensures the most relevant legal passages are surfaced.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileSearch className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Document Viewer</h3>
            <p className="text-muted-foreground">
              Click any citation to view the source document with highlighted passages.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
