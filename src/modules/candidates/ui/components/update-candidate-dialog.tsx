import { ResponsiveDialog } from "@/components/responsive-dialog";
import CandidateForm from "./candidate-form";
import { CandidateGetOne } from "@/modules/candidates/types";

interface UpdateCandidateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    candidateData?: CandidateGetOne;
}

export const UpdateCandidateDialog = ({ open, onOpenChange, candidateData }: UpdateCandidateDialogProps) => {
    const handleSuccess = () => {
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <ResponsiveDialog
            title="Update Candidate"
            description="Update an existing candidate"
            open={open}
            onOpenChange={onOpenChange}
        >
            <CandidateForm 
                onSuccess={handleSuccess}
                onCancel={handleCancel}
                initialData={candidateData}
            />
        </ResponsiveDialog>
    )
}