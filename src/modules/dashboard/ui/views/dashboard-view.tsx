"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/loading-state";

import { useMutation, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp,
} from "lucide-react";
import { ErrorState } from "@/components/error-state";
import { createColumns } from "@/modules/candidates/ui/components/columns";
import { DataTable } from "@/modules/candidates/ui/components/data-table";
import type { Candidate } from "@/modules/candidates/ui/components/columns";
import { useState, useEffect } from "react";
import { NewCandidateDialog } from "@/modules/candidates/ui/components/new-candidate-dialog";
import { UpdateCandidateDialog } from "@/modules/candidates/ui/components/update-candidate-dialog";
import { CandidateDetailsSheet } from "@/modules/candidates/ui/components/candidate-details-sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { eventBus, EVENTS } from "@/lib/events";

export const DashboardView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(trpc.candidates.getMany.queryOptions());

  const [newCandidateDialogOpen, setNewCandidateDialogOpen] = useState(false);
  const [editCandidateDialogOpen, setEditCandidateDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateDetailsOpen, setCandidateDetailsOpen] = useState(false);
  const [selectedCandidateForDetails, setSelectedCandidateForDetails] = useState<Candidate | null>(null);

  // Set up confirmation dialog for delete operations
  const [DeleteConfirmDialog, confirmDelete] = useConfirm(
    "Delete Candidate",
    "Are you sure you want to delete this candidate? This action cannot be undone."
  );

  // Listen for search events to open candidate details
  useEffect(() => {
    const handleOpenCandidateDetails = (candidate: Candidate) => {
      setSelectedCandidateForDetails(candidate);
      setCandidateDetailsOpen(true);
    };

    eventBus.on(EVENTS.OPEN_CANDIDATE_DETAILS, handleOpenCandidateDetails);

    return () => {
      eventBus.off(EVENTS.OPEN_CANDIDATE_DETAILS, handleOpenCandidateDetails);
    };
  }, []);

  const removeCandidate = useMutation({
    ...trpc.candidates.delete.mutationOptions(),
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.candidates.getMany.queryOptions());
      router.refresh();
      toast.success("Candidate deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Calculate stats from real data
  const candidates = data as Candidate[];
  const totalCandidates = candidates.length;
  const activeCandidates = candidates.filter(c => c.status === "active").length;
  const placedCandidates = candidates.filter(c => c.status === "placed").length;
  const avgExperience = totalCandidates > 0 
    ? Math.round(candidates.reduce((sum, c) => sum + c.experience, 0) / totalCandidates)
    : 0;

  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setEditCandidateDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditCandidateDialogOpen(false);
    setSelectedCandidate(null);
  };

  // Handle view candidate details
  const handleViewCandidateDetails = (candidate: Candidate) => {
    setSelectedCandidateForDetails(candidate);
    setCandidateDetailsOpen(true);
  };

  // Handle close candidate details
  const handleCloseCandidateDetails = () => {
    setCandidateDetailsOpen(false);
    setSelectedCandidateForDetails(null);
  };

  // Handle delete candidate with confirmation
  const handleDeleteCandidate = async (candidate: Candidate) => {
    // Prevent multiple delete operations
    if (removeCandidate.isPending) {
      return;
    }
    
    const confirmed = await confirmDelete();
    if (confirmed) {
      removeCandidate.mutate({ id: candidate.id });
    }
  };

  // Create columns with edit, delete, and view details functionality
  const columns = createColumns({ 
    onEdit: handleEditCandidate,
    onDelete: handleDeleteCandidate,
    onViewDetails: handleViewCandidateDetails,
    isDeleting: (candidateId: string) => removeCandidate.isPending && removeCandidate.variables?.id === candidateId
  });

  return (
    <>
      <NewCandidateDialog
        open={newCandidateDialogOpen}
        onOpenChange={setNewCandidateDialogOpen}
      />
      <UpdateCandidateDialog
        open={editCandidateDialogOpen}
        onOpenChange={handleEditDialogClose}
        candidateData={selectedCandidate ? [selectedCandidate] : undefined}
      />
      <CandidateDetailsSheet
        open={candidateDetailsOpen}
        onOpenChange={handleCloseCandidateDetails}
        candidate={selectedCandidateForDetails}
        onEdit={handleEditCandidate}
        onDelete={handleDeleteCandidate}
      />
      {/* Render the delete confirmation dialog */}
      <DeleteConfirmDialog />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCandidates}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCandidates}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successfully Placed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{placedCandidates}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgExperience}y</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">+1.2y</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Candidates DataTable */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidates</CardTitle>
                <CardDescription>
                  Manage and track all candidate applications with advanced filtering and sorting
                </CardDescription>
              </div>
              <Button onClick={() => setNewCandidateDialogOpen(true)}>Create Candidate</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <DataTable 
                columns={columns} 
                data={candidates}
                onViewDetails={handleViewCandidateDetails}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const DashboardViewLoading = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <LoadingState title="Loading candidates..." description="Please wait while we load the candidates data." />
    </div>
  );
};

export const DashboardViewError = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ErrorState title="Error loading candidates" description="Please try again later." />
    </div>
  );
};