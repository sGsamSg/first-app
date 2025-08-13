import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

export const useConfirm = (
    title: string,
    description: string,
): [() => JSX.Element, () => Promise<boolean>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise<boolean>((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => {
        return (
            <ResponsiveDialog 
                open={promise !== null}
                onOpenChange={handleClose}
                title={title}
                description={description}
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div className="text-sm text-muted-foreground">
                        This action cannot be undone.
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </ResponsiveDialog>
        );
    };

    return [ConfirmationDialog, confirm];
};