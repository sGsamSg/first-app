"use client";

import { Button } from "@/components/ui/button";
import { Candidate } from "./columns";
import { Edit, Trash2, X } from "lucide-react";

interface CandidateDetailsActionsProps {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
  onClose: () => void;
}

export const CandidateDetailsActions = ({
  candidate,
  onEdit,
  onDelete,
  onClose,
}: CandidateDetailsActionsProps) => {
  return (
    <div className="border-t border-slate-200/50 pt-6 space-y-4 bg-gradient-to-t from-white to-slate-50/50 -mx-6 px-6 pb-6">
      <div className="flex gap-3">
        <Button
          onClick={() => onEdit(candidate)}
          className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Candidate
        </Button>
        <Button
          onClick={() => onDelete(candidate)}
          className="flex-1 h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Candidate
        </Button>
      </div>
      <Button
        onClick={onClose}
        variant="ghost"
        className="w-full h-10 text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-medium transition-colors"
      >
        <X className="h-4 w-4 mr-2" />
        Close Details
      </Button>
    </div>
  );
}; 