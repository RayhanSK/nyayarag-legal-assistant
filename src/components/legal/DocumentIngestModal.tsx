import { useState, useCallback } from "react";
import { Upload, X, FileText, AlertCircle, CheckCircle2, Loader2, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface FileUploadItem {
  id: string;
  file: File;
  status: "pending" | "parsing" | "success" | "error";
  progress: number;
  error?: string;
  preview?: string;
}

interface DocumentIngestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIngest: (files: FileUploadItem[], metadata: DocumentMetadata) => Promise<void>;
}

interface DocumentMetadata {
  jurisdiction: string;
  court: string;
  date: string;
  tags: string[];
  redactPII: boolean;
}

export const DocumentIngestModal = ({ open, onOpenChange, onIngest }: DocumentIngestModalProps) => {
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [metadata, setMetadata] = useState<DocumentMetadata>({
    jurisdiction: "",
    court: "",
    date: "",
    tags: [],
    redactPII: false,
  });
  const [tagInput, setTagInput] = useState("");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: FileUploadItem[] = droppedFiles.map((file) => ({
      id: Math.random().toString(36),
      file,
      status: "pending",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles: FileUploadItem[] = selectedFiles.map((file) => ({
      id: Math.random().toString(36),
      file,
      status: "pending",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const addTag = () => {
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleIngest = async () => {
    await onIngest(files, metadata);
  };

  const getStatusIcon = (status: FileUploadItem["status"]) => {
    switch (status) {
      case "pending":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      case "parsing":
        return <Loader2 className="h-5 w-5 text-accent animate-spin" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ingest Legal Documents</DialogTitle>
          <DialogDescription>
            Upload legal documents for indexing. Files will be parsed, optionally redacted, and made searchable.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragging
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/50"
            )}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports PDF, DOCX, TXT. Max 20MB per file.
            </p>
            <Input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".pdf,.docx,.txt"
            />
            <Button variant="secondary" size="sm" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({files.length})</Label>
              <ScrollArea className="h-48 border rounded-md p-2">
                <div className="space-y-2">
                  {files.map((fileItem) => (
                    <div
                      key={fileItem.id}
                      className="flex items-center gap-3 p-3 bg-surface-secondary rounded-md"
                    >
                      {getStatusIcon(fileItem.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {fileItem.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {fileItem.status === "parsing" && (
                          <Progress value={fileItem.progress} className="mt-2 h-1" />
                        )}
                        {fileItem.error && (
                          <p className="text-xs text-destructive mt-1">{fileItem.error}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(fileItem.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Metadata Form */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Input
                id="jurisdiction"
                placeholder="e.g., California"
                value={metadata.jurisdiction}
                onChange={(e) =>
                  setMetadata((prev) => ({ ...prev, jurisdiction: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="court">Court</Label>
              <Input
                id="court"
                placeholder="e.g., Supreme Court"
                value={metadata.court}
                onChange={(e) =>
                  setMetadata((prev) => ({ ...prev, court: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={metadata.date}
                onChange={(e) =>
                  setMetadata((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                />
                <Button type="button" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
              {metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-xs rounded-md"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PII Redaction */}
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-md">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <Label htmlFor="redact-pii" className="font-medium">
                  Redact PII
                </Label>
                <p className="text-xs text-muted-foreground">
                  Automatically detect and redact personally identifiable information
                </p>
              </div>
            </div>
            <Switch
              id="redact-pii"
              checked={metadata.redactPII}
              onCheckedChange={(checked) =>
                setMetadata((prev) => ({ ...prev, redactPII: checked }))
              }
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleIngest}
              disabled={files.length === 0}
            >
              Ingest {files.length} Document{files.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
