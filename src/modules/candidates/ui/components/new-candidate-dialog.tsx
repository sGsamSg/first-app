import { ResponsiveDialog } from "@/components/responsive-dialog";
import CandidateForm from "./candidate-form";

interface NewCandidateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewCandidateDialog = ({ open, onOpenChange }: NewCandidateDialogProps) => {
    const handleSuccess = () => {
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <ResponsiveDialog
            title="New Candidate"
            description="Create a new candidate"
            open={open}
            onOpenChange={onOpenChange}
        >
            <CandidateForm 
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
        </ResponsiveDialog>
    )
}