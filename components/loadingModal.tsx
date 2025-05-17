import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

interface StatusModalProps {
  status: "loading" | "success" | "error" | null;
  onClose: () => void;
}

export default function StatusModal({ status, onClose }: StatusModalProps) {
  const getContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Loader2 className="animate-spin w-10 h-10 text-primary" />
            <p id="status-message" className="text-sm text-muted-foreground">Uploading your report...</p>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="w-10 h-15 text-green-500" />
            <p id="status-message" className="text-sm text-green-700">Report submitted successfully!</p>
            <p className="text-sm text-green-700">Your report will be live once approved by our team</p>
            <p className="text-lg text-green-700">Redirecting to main page</p>
          </>
        );
      case "error":
        return (
          <>
            <AlertTriangle className="w-10 h-10 text-red-500" />
            <p id="status-message" className="text-sm text-red-700">Something went wrong. Please try again.</p>
            
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={!!status} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogTitle></DialogTitle>
      <DialogContent className="flex flex-col items-center gap-4 py-10 text-center">
        {getContent()}
      </DialogContent>
    </Dialog>
  );
}
