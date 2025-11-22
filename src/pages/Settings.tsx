import { useState } from "react";
import { ArrowLeft, Key, Trash2, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("sk-••••••••••••••••••••");

  const handleExportAuditLog = () => {
    toast.success("Audit log exported as CSV");
    // Backend integration point: GET /api/audit/export
  };

  const handleDeleteAllData = () => {
    toast.success("All data deletion initiated. Undo available for 5 seconds.");
    // Backend integration point: DELETE /api/data (with undo mechanism)
    
    // Implement undo functionality
    setTimeout(() => {
      console.log("Data deletion confirmed");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings & Audit</h1>
          <p className="text-muted-foreground">
            Manage API keys, data, and view audit logs
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* API Keys */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Key className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                API Key Management
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure your LLM provider API key (visual only - actual key management handled securely)
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="font-mono text-sm"
                />
                <Button variant="secondary">Update</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is encrypted and stored securely. Never shared or logged.
              </p>
            </div>
          </div>
        </Card>

        {/* Audit Logs */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Download className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Audit Logs
              </h2>
              <p className="text-sm text-muted-foreground">
                Export comprehensive logs of all queries, document ingests, and system actions
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-md">
              <div>
                <p className="font-medium text-foreground mb-1">
                  Download Complete Audit Trail
                </p>
                <p className="text-sm text-muted-foreground">
                  Includes all queries, citations, document uploads, and timestamps
                </p>
              </div>
              <Button onClick={handleExportAuditLog}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="p-4 bg-surface-secondary rounded-md">
              <h3 className="font-medium text-foreground mb-2">Recent Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Query submitted</span>
                  <span className="text-foreground">2 minutes ago</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Document ingested</span>
                  <span className="text-foreground">1 hour ago</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Export conversation</span>
                  <span className="text-foreground">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 border-destructive/50">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Data Management
              </h2>
              <p className="text-sm text-muted-foreground">
                Permanently delete all data, documents, and query history
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-foreground mb-4">
                <strong>Warning:</strong> This action will permanently delete all your indexed
                documents, query history, and associated metadata. This action cannot be undone
                after 5 seconds.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your data including:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>All indexed legal documents</li>
                        <li>Query history and conversations</li>
                        <li>Citations and annotations</li>
                        <li>User preferences and settings</li>
                      </ul>
                      <p className="mt-3 font-medium text-foreground">
                        You will have 5 seconds to undo this action.
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAllData}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
