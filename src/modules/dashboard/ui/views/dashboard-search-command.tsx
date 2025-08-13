import { CommandResponsiveDialog, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { Search, Users, Building2, Briefcase, AlertTriangle } from "lucide-react";

interface DashboardSearchCommandProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardSearchCommand = ({ open, setOpen }: DashboardSearchCommandProps) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen} title="Search candidates, jobs, employers...">
            <div className="px-4 pt-4">
                <CommandInput placeholder="Search candidates, jobs, employers..." />
            </div>
            <CommandList className="px-4 pb-4">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Candidates">
                    <CommandItem className="px-2 py-3">
                        <Users className="mr-3 h-4 w-4 shrink-0" />
                        <span>John Doe - Software Engineer</span>
                    </CommandItem>
                    <CommandItem className="px-2 py-3">
                        <Users className="mr-3 h-4 w-4 shrink-0" />
                        <span>Jane Smith - Product Manager</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Jobs">
                    <CommandItem className="px-2 py-3">
                        <Briefcase className="mr-3 h-4 w-4 shrink-0" />
                        <span>Senior Frontend Developer</span>
                    </CommandItem>
                    <CommandItem className="px-2 py-3">
                        <Briefcase className="mr-3 h-4 w-4 shrink-0" />
                        <span>Data Scientist</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Employers">
                    <CommandItem className="px-2 py-3">
                        <Building2 className="mr-3 h-4 w-4 shrink-0" />
                        <span>TechCorp</span>
                    </CommandItem>
                    <CommandItem className="px-2 py-3">
                        <Building2 className="mr-3 h-4 w-4 shrink-0" />
                        <span>StartupXYZ</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    );
};