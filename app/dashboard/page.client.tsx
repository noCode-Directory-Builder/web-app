"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FolderPlus, Globe, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { UsageCredits } from "@/components/dashboard/usage-credits";

const directories = [
  {
    id: 1,
    name: "Restaurant Directory",
    domain: "restaurants.example.com",
    status: "active",
    listings: 245,
    views: 12500,
  },
  {
    id: 2,
    name: "Local Business Guide",
    domain: "business.example.com",
    status: "pending",
    listings: 180,
    views: 8900,
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/new">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Directory
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">425,321</div>
            <p className="text-xs text-muted-foreground">
              +24% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Directories</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
        <UsageCredits used={2} total={10} planName="Pro" />
      </div>

      <DashboardCharts />

      <Card>
        <CardHeader>
          <CardTitle>Your Directories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Listings</TableHead>
                  <TableHead className="hidden sm:table-cell">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {directories.map((directory) => (
                  <TableRow key={directory.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/dashboard/directory/${directory.id}`}
                        className="hover:underline"
                      >
                        {directory.name}
                      </Link>
                      <div className="md:hidden text-sm text-muted-foreground">
                        {directory.domain}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {directory.domain}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={directory.status === "active" ? "default" : "secondary"}
                      >
                        {directory.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {directory.listings}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {directory.views}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}