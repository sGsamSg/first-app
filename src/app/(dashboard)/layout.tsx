import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/sidebar/dashboard-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/views/dashboard-navbar";
import { Toaster } from "@/components/ui/sonner";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <DashboardNavbar />
                {children}
            </SidebarInset>
            {/* Toast notifications will appear here */}
            <Toaster />
        </SidebarProvider>
    );
}