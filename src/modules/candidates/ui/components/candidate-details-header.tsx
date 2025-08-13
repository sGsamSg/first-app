"use client";

import { Badge } from "@/components/ui/badge";
import { Candidate } from "./columns";
import { User, MapPin, Calendar } from "lucide-react";

interface CandidateDetailsHeaderProps {
  candidate: Candidate;
}

export const CandidateDetailsHeader = ({ candidate }: CandidateDetailsHeaderProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "placed":
        return "secondary";
      case "inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "inactive":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 mb-6 border border-slate-200/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {candidate.firstName[0]}{candidate.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {candidate.firstName} {candidate.lastName}
              </h2>
              <p className="text-lg text-slate-600 font-medium">{candidate.title}</p>
            </div>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={`px-3 py-1.5 text-sm font-medium border-2 ${getStatusColor(candidate.status)}`}
        >
          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/50">
        <div className="flex items-center gap-2 text-slate-600">
          <User className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium">{candidate.experience} years exp.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium">{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium">Applied {new Date(candidate.appliedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}; 