"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2024-02-14", views: 1200 },
  { date: "2024-02-15", views: 1800 },
  { date: "2024-02-16", views: 1600 },
  { date: "2024-02-17", views: 2100 },
  { date: "2024-02-18", views: 1900 },
  { date: "2024-02-19", views: 2400 },
  { date: "2024-02-20", views: 2200 },
];

const topListings = [
  { name: "Central Bistro", views: 450, change: "+12%" },
  { name: "Urban Cafe", views: 380, change: "+8%" },
  { name: "Green Garden", views: 320, change: "+5%" },
  { name: "City Diner", views: 290, change: "-2%" },
];

export function DirectoryAnalytics() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <p className="text-xs text-muted-foreground">
              +15s from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Views Over Time</CardTitle>
          <CardDescription>Daily page views for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Listings</CardTitle>
          <CardDescription>Most viewed listings this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topListings.map((listing, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div>
                  <div className="font-medium">{listing.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {listing.views.toLocaleString()} views
                  </div>
                </div>
                <div
                  className={
                    listing.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {listing.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}