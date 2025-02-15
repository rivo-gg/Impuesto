import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Overview } from "@/components/dashboard/overview";

interface OverviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OverviewDialog({ open, onOpenChange }: OverviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[95vw] h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Revenue Overview</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-[calc(90vh-100px)]">
          <Overview height="100%" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
