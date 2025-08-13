import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { DashboardView, DashboardViewError, DashboardViewLoading } from "@/modules/dashboard/ui/views/dashboard-view";
import { DashboardHeader } from "@/modules/dashboard/ui/views/dashboard-header";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.candidates.getMany.queryOptions());

  return (
    <>
      {/* Static header outside hydration boundary */}
      <div className="p-4 sm:p-6">
        <DashboardHeader userName={session.user.name} />
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<DashboardViewLoading />}>
          <ErrorBoundary fallback={<DashboardViewError />}>
            <DashboardView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default HomePage;