import { CommandDialog, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { Search, Users, Building2, Briefcase, AlertTriangle } from "lucide-react";

interface DashboardSearchCommandProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardSearchCommand = ({ open, setOpen }: DashboardSearchCommandProps) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search candidates, jobs, employers..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Candidates">
                    <CommandItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>John Doe - Software Engineer</span>
                    </CommandItem>
                    <CommandItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Jane Smith - Product Manager</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Jobs">
                    <CommandItem>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Senior Frontend Developer</span>
                    </CommandItem>
                    <CommandItem>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Data Scientist</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Employers">
                    <CommandItem>
                        <Building2 className="mr-2 h-4 w-4" />
                        <span>TechCorp</span>
                    </CommandItem>
                    <CommandItem>
                        <Building2 className="mr-2 h-4 w-4" />
                        <span>StartupXYZ</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};