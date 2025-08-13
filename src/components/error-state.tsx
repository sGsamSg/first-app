import { AlertCircleIcon } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    description?: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <AlertCircleIcon className="size-6 text-red-500"/>
                <div className="flex flex-col justify-center gap-y-2">
                    <h6 className="text-2xl font-semibold">{title}</h6>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
};