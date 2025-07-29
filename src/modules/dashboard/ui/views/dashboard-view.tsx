"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardNavbar } from "./dashboard-navbar";
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  DollarSign
} from "lucide-react";

export const DashboardView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardNavbar />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {session?.user?.name}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your recruitment platform today.</p>
          </div>
          <Button onClick={() => authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in");
              },
            },
          })}>Sign Out</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employers</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-3%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Applications Table */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                Latest job applications from candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Applied</Badge>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">JS</span>
                    </div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Shortlisted</Badge>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">MJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Mike Johnson</p>
                      <p className="text-sm text-muted-foreground">UX Designer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">Rejected</Badge>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Chart */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Application Activity</CardTitle>
              <CardDescription>
                Applications over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Today</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium">15</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Yesterday</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">2 days ago</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm font-medium">8</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">3 days ago</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-sm font-medium">18</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>
                Scheduled interviews for this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Sarah Wilson - Frontend Developer</p>
                    <p className="text-sm text-muted-foreground">Google Meet • 2:00 PM</p>
                  </div>
                  <Badge variant="outline">Today</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Alex Brown - Data Scientist</p>
                    <p className="text-sm text-muted-foreground">Zoom • 10:00 AM</p>
                  </div>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Placements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Placements</CardTitle>
              <CardDescription>
                Successfully placed candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Emily Davis</p>
                    <p className="text-sm text-muted-foreground">Senior Developer at TechCorp</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">$95k</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">David Lee</p>
                    <p className="text-sm text-muted-foreground">Product Manager at StartupXYZ</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">$120k</p>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};