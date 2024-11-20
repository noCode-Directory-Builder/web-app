"use client";

import { useState } from "react";
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
import { Edit, MoreHorizontal, Eye, Trash, Search, Filter, Plus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Directory {
  id: string;
  name: string;
  type: string;
}

interface ListingsPageClientProps {
  directory: Directory;
}

// Mock data - in a real app, this would come from your API
const listings = [
  {
    id: 1,
    name: "Central Cafe",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    views: 1250,
    category: "Restaurant",
    status: "active",
    lastUpdated: "2024-03-01",
    description: "A cozy cafe in the heart of downtown",
  },
  {
    id: 2,
    name: "Urban Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    views: 980,
    category: "Fitness",
    status: "active",
    lastUpdated: "2024-02-28",
    description: "Modern fitness center with state-of-the-art equipment",
  },
  {
    id: 3,
    name: "Green Garden Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    views: 450,
    category: "Restaurant",
    status: "pending",
    lastUpdated: "2024-02-27",
    description: "Farm-to-table dining experience",
  },
  {
    id: 4,
    name: "Downtown Bistro",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    views: 120,
    category: "Restaurant",
    status: "active",
    lastUpdated: "2024-02-26",
    description: "French cuisine in an elegant setting",
  },
  {
    id: 5,
    name: "Yoga Studio",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    views: 85,
    category: "Fitness",
    status: "active",
    lastUpdated: "2024-02-25",
    description: "Peaceful yoga and meditation studio",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "restaurant", label: "Restaurant" },
  { value: "fitness", label: "Fitness" },
  { value: "retail", label: "Retail" },
  { value: "service", label: "Service" },
];

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
];

export function ListingsPageClient({ directory }: ListingsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || listing.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === "all" || listing.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Listings</h1>
          <p className="text-muted-foreground">
            Manage and monitor all listings in {directory.name}
          </p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/directory/${directory.id}/listings/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Listing
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Views</TableHead>
                <TableHead className="hidden xl:table-cell">Last Updated</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 flex-none">
                        <Image
                          src={listing.image}
                          alt={listing.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{listing.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {listing.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {listing.category}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {listing.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {new Date(listing.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}