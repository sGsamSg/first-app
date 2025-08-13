import { CandidateGetOne } from "@/modules/candidates/types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCandidateSchema, updateCandidateSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type FormData = z.infer<typeof createCandidateSchema>;

interface CandidateFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialData?: CandidateGetOne; 
};

const CandidateForm = ({ onSuccess, onCancel, initialData }: CandidateFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createCandidate = useMutation(
        trpc.candidates.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: trpc.candidates.getMany.queryKey() });
                toast.success("Candidate created successfully");
                onSuccess();
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create candidate");
            },
        })
    );

    const updateCandidate = useMutation(
        trpc.candidates.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: trpc.candidates.getMany.queryKey() });
                toast.success("Candidate updated successfully");
                onSuccess();
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update candidate");
            },
        })
    );

    const form = useForm<FormData>({
        resolver: zodResolver(createCandidateSchema),
        defaultValues: {
            firstName: initialData?.[0]?.firstName || "",
            lastName: initialData?.[0]?.lastName || "",
            email: initialData?.[0]?.email || "",
            title: initialData?.[0]?.title || "",
            experience: initialData?.[0]?.experience || 0,
            location: initialData?.[0]?.location || "",
            status: (initialData?.[0]?.status as "active" | "inactive" | "placed") || "active",
            phone: initialData?.[0]?.phone || "",
            skills: initialData?.[0]?.skills || "",
        },
    });

    const isEdit = !!initialData?.[0]?.id;
    const isPending = isEdit ? updateCandidate.isPending : createCandidate.isPending;

    const onSubmit = (data: FormData) => {
        if (isEdit && initialData?.[0]?.id) {
            updateCandidate.mutate({
                id: initialData[0].id,
                data: data,
            });
        } else {
            createCandidate.mutate(data);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="5" 
                                        {...field} 
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="San Francisco, CA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="placed">Placed</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="JavaScript, React, Node.js, TypeScript" 
                                    {...field} 
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Candidate" : "Create Candidate")}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CandidateForm;