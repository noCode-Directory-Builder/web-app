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
import { 
  Edit, 
  FileText, 
  FolderPlus, 
  MoreHorizontal, 
  Eye, 
  Trash, 
  ArrowRight,
  Plus,
  TrendingUp,
  Users,
  Star,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface Directory {
  id: string;
  name: string;
  type: string;
}

interface DirectoryPageClientProps {
  directory: Directory;
  topListings: any[];
  recentListings: any[];
  topPosts: any[];
  recentPosts: any[];
}

// Generate sample data for the past 30 days
const generateDailyData = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(1000 + Math.random() * 500),
      listings: Math.floor(10 + Math.random() * 5),
    });
  }
  return data;
};

const analyticsData = generateDailyData();

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function DirectoryPageClient({ 
  directory,
  topListings,
  recentListings,
  topPosts,
  recentPosts,
}: DirectoryPageClientProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{directory.name}</h1>
          <p className="text-muted-foreground">
            Manage your directory content and settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/dashboard/directory/${directory.id}/pages`}>
              <FileText className="mr-2 h-4 w-4" />
              Pages
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/directory/${directory.id}/blog/new`}>
              <Edit className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/directory/${directory.id}/listings/new`}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Add Listing
            </Link>
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
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
            <Star className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Emails Sent (30d)</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              +0.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor="hsl(var(--primary))" 
                        stopOpacity={0.3}
                      />
                      <stop 
                        offset="95%" 
                        stopColor="hsl(var(--primary))" 
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    className="stroke-muted"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatNumber}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#views)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="listings" x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor="hsl(var(--primary))" 
                        stopOpacity={0.3}
                      />
                      <stop 
                        offset="95%" 
                        stopColor="hsl(var(--primary))" 
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    className="stroke-muted"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="listings"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#listings)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Top Listings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/directory/${directory.id}/listings`}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topListings.map((listing) => (
                <div key={listing.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{listing.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {listing.views.toLocaleString()} views
                    </p>
                  </div>
                  <Badge>{listing.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Blog Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Top Blog Posts</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/directory/${directory.id}/blog`}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post) => (
                <div key={post.id} className="space-y-1">
                  <h3 className="font-medium line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Listings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/directory/${directory.id}/listings`}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{listing.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {listing.views.toLocaleString()} views
                    </p>
                  </div>
                  <Badge>{listing.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Blog Posts</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/directory/${directory.id}/blog`}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="space-y-1">
                  <h3 className="font-medium line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Emails */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Emails</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/directory/${directory.id}/emails`}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  subject: "New Contact Form Submission",
                  recipient: "business@example.com",
                  status: "sent",
                  sentAt: "2024-03-20T10:30:00Z",
                },
                {
                  subject: "Welcome to Our Directory",
                  recipient: "newuser@example.com",
                  status: "sent",
                  sentAt: "2024-03-19T15:45:00Z",
                },
                {
                  subject: "Your Listing Has Been Approved",
                  recipient: "merchant@example.com",
                  status: "failed",
                  sentAt: "2024-03-19T09:15:00Z",
                },
              ].map((email, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium line-clamp-1">{email.subject}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{email.recipient}</span>
                      <span>•</span>
                      <span>{new Date(email.sentAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant={email.status === "sent" ? "default" : "destructive"}>
                    {email.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}