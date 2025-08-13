"use client";

import { useState, useMemo } from "react";
import { CommandResponsiveDialog, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { Users, Building2, Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Candidate } from "@/modules/candidates/ui/components/columns";
import { toast } from "sonner";
import { eventBus, EVENTS } from "@/lib/events";

interface DashboardSearchCommandProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardSearchCommand = ({ open, setOpen }: DashboardSearchCommandProps) => {
    const [searchValue, setSearchValue] = useState("");
    const trpc = useTRPC();
    
    // Get real candidate data
    const { data: candidates } = useSuspenseQuery(trpc.candidates.getMany.queryOptions());
    
    // Filter candidates based on search input
    const filteredCandidates = useMemo(() => {
        if (!searchValue.trim()) return candidates || [];
        
        const searchLower = searchValue.toLowerCase();
        return (candidates || []).filter((candidate: Candidate) => 
            candidate.firstName.toLowerCase().includes(searchLower) ||
            candidate.lastName.toLowerCase().includes(searchLower) ||
            candidate.email.toLowerCase().includes(searchLower) ||
            candidate.title.toLowerCase().includes(searchLower) ||
            candidate.location.toLowerCase().includes(searchLower) ||
            candidate.skills?.toLowerCase().includes(searchLower)
        );
    }, [candidates, searchValue]);

    const handleCandidateSelect = (candidate: Candidate) => {
        // Emit event to open candidate details
        eventBus.emit(EVENTS.OPEN_CANDIDATE_DETAILS, candidate);
        
        // Close search and show success message
        setOpen(false);
        setSearchValue("");
        toast.success(`Opening ${candidate.firstName} ${candidate.lastName}'s details`);
    };

    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen} title="Search candidates, jobs, employers...">
            <div className="px-4 pt-4">
                <CommandInput 
                    placeholder="Search candidates, jobs, employers..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                    className="h-10"
                />
            </div>
            <CommandList className="px-4 pb-4 max-h-[400px]">
                <CommandEmpty className="py-6 text-center text-muted-foreground">
                    {searchValue ? `No results found for "${searchValue}"` : "Start typing to search..."}
                </CommandEmpty>
                
                {filteredCandidates.length > 0 && (
                    <CommandGroup heading={`Candidates (${filteredCandidates.length})`}>
                        {filteredCandidates.map((candidate: Candidate) => (
                            <CommandItem 
                                key={candidate.id}
                                className="px-3 py-2 cursor-pointer rounded-md hover:bg-accent transition-colors"
                                onSelect={() => handleCandidateSelect(candidate)}
                            >
                                <Users className="mr-3 h-4 w-4 shrink-0 text-blue-600" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">
                                        {candidate.firstName} {candidate.lastName}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                        <span className="truncate">{candidate.title}</span>
                                        <span className="text-muted-foreground/50">•</span>
                                        <span className="flex items-center gap-1 min-w-0">
                                            <MapPin className="h-3 w-3 shrink-0" />
                                            <span className="truncate">{candidate.location}</span>
                                        </span>
                                        <span className="text-muted-foreground/50">•</span>
                                        <span className="flex items-center gap-1 shrink-0">
                                            <Calendar className="h-3 w-3" />
                                            <span>{new Date(candidate.appliedAt).toLocaleDateString()}</span>
                                        </span>
                                    </div>
                                </div>
                                <ExternalLink className="h-3 w-3 text-muted-foreground/50 ml-2 shrink-0" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {/* Placeholder for future job/employer search */}
                {!searchValue && (
                    <>
                        <CommandGroup heading="Jobs">
                            <CommandItem className="px-3 py-2 opacity-50 cursor-not-allowed">
                                <Briefcase className="mr-3 h-4 w-4 shrink-0" />
                                <span className="text-sm">Job search coming soon...</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandGroup heading="Employers">
                            <CommandItem className="px-3 py-2 opacity-50 cursor-not-allowed">
                                <Building2 className="mr-3 h-4 w-4 shrink-0" />
                                <span className="text-sm">Employer search coming soon...</span>
                            </CommandItem>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </CommandResponsiveDialog>
    );
};