"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl">Welcome back, {userName || "User"}!</h1>
        <p className="text-sm text-muted-foreground sm:text-base">Here's what's happening with your recruitment platform today.</p>
      </div>
    </div>
  );
};
