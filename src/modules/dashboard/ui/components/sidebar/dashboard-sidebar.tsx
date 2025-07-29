"use client";

import * as React from "react";
import {
  Home,
  Building2,
  Briefcase,
  Users,
  AlertTriangle,
  BarChart3,
  FileText,
  Calendar,
  MessageSquare,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavTools } from "./nav-tools";
import { NavUser } from "./nav-user";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

// Sample data for the sidebar
const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Employers",
      url: "/employers",
      icon: Building2,
      items: [
        {
          title: "All Employers",
          url: "/employers",
        },
        {
          title: "Add Employer",
          url: "/employers/add",
        },
        {
          title: "Employer Requests",
          url: "/employers/requests",
        },
      ],
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: Briefcase,
      items: [
        {
          title: "All Jobs",
          url: "/jobs",
        },
        {
          title: "Active Jobs",
          url: "/jobs/active",
        },
        {
          title: "Draft Jobs",
          url: "/jobs/drafts",
        },
        {
          title: "Job Templates",
          url: "/jobs/templates",
        },
      ],
    },
    {
      title: "Candidates",
      url: "/candidates",
      icon: Users,
      items: [
        {
          title: "All Candidates",
          url: "/candidates",
        },
        {
          title: "Shortlisted",
          url: "/candidates/shortlisted",
        },
        {
          title: "Applications",
          url: "/candidates/applications",
        },
        {
          title: "Resume Database",
          url: "/candidates/resumes",
        },
      ],
    },
    {
      title: "Issues",
      url: "/issues",
      icon: AlertTriangle,
      items: [
        {
          title: "All Issues",
          url: "/issues",
        },
        {
          title: "Open Issues",
          url: "/issues/open",
        },
        {
          title: "Resolved",
          url: "/issues/resolved",
        },
      ],
    },
  ],
  tools: [
    {
      name: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      name: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      name: "Messages",
      url: "/messages",
      icon: MessageSquare,
    },
  ],
};

// Company header component
function CompanyHeader() {
  return (
    <div className="flex items-center justify-center w-full px-4 py-4">
      {/* Full logo (only in expanded state) */}
      <img
        src="/logo.svg"
        alt="Hirez"
        className="h-10 w-auto group-data-[collapsible=icon]:hidden"
      />

      {/* Icon-only logo (only in collapsed state) */}
      <img
        src="/logo-icon.svg"
        alt="Hirez Icon"
        className="h-2 w-2 hidden group-data-[collapsible=icon]:block"
      />
    </div>
  );
}

export const DashboardSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* Uncomment when you need tools section */}
        {/* <NavTools tools={data.tools} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};