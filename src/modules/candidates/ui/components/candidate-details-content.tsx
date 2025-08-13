"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Candidate } from "./columns";
import { Mail, Phone, MapPin, Calendar, User, Briefcase, Clock, Star } from "lucide-react";

interface CandidateDetailsContentProps {
  candidate: Candidate;
}

export const CandidateDetailsContent = ({ candidate }: CandidateDetailsContentProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-800">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <Mail className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">{candidate.email}</span>
          </div>
          {candidate.phone && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <Phone className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">{candidate.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">{candidate.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-800">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-purple-600" />
            </div>
            Professional Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Job Title</p>
              <p className="text-sm font-semibold text-slate-800">{candidate.title}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Experience</p>
              <p className="text-sm font-semibold text-slate-800">{candidate.experience} years</p>
            </div>
          </div>
          {candidate.skills && (
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700 hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-800">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-green-600" />
            </div>
            Application Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Applied</p>
                <p className="text-sm font-semibold text-slate-800">{formatDate(candidate.appliedAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Created</p>
                <p className="text-sm font-semibold text-slate-800">{formatDate(candidate.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Last Updated</p>
                <p className="text-sm font-semibold text-slate-800">{formatDate(candidate.updatedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 