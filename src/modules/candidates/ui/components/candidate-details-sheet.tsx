"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Candidate } from "./columns";
import { CandidateDetailsHeader } from "./candidate-details-header";
import { CandidateDetailsContent } from "./candidate-details-content";
import { CandidateDetailsActions } from "./candidate-details-actions";

interface CandidateDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: Candidate | null;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
}

export const CandidateDetailsSheet = ({
  open,
  onOpenChange,
  candidate,
  onEdit,
  onDelete,
}: CandidateDetailsSheetProps) => {
  if (!candidate) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[540px] p-0 border-l border-slate-200/50 bg-gradient-to-b from-white to-slate-50/30"
      >
        <SheetHeader className="px-6 py-6 pb-4 border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
          <SheetTitle className="text-xl font-bold text-slate-900 text-left">
            Candidate Details
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with candidate name, title, and status */}
          <div className="px-6">
            <CandidateDetailsHeader candidate={candidate} />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 overflow-y-auto px-6">
            <CandidateDetailsContent candidate={candidate} />
          </div>
          
          {/* Actions at the bottom */}
          <CandidateDetailsActions
            candidate={candidate}
            onEdit={onEdit}
            onDelete={onDelete}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}; 