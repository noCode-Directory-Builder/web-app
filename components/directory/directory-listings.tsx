"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DirectoryListingsProps {
  searchQuery: string;
}

const listings = [
  {
    id: 1,
    name: "Central Bistro",
    category: "Restaurant",
    address: "123 Main St, City",
    status: "active",
    featured: true,
    views: 1250,
    lastUpdated: "2024-02-20",
  },
  {
    id: 2,
    name: "Urban Cafe",
    category: "Cafe",
    address: "456 Oak St, City",
    status: "pending",
    featured: false,
    views: 850,
    lastUpdated: "2024-02-19",
  },
  // Add more sample listings as needed
];

export function DirectoryListings({ searchQuery }: DirectoryListingsProps) {
  const [selectedListings, setSelectedListings] = useState<number[]>([]);

  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleListingSelection = (id: number) => {
    setSelectedListings((prev) =>
      prev.includes(id)
        ? prev.filter((listingId) => listingId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {selectedListings.length > 0 && (
        <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
          <span>{selectedListings.length} listings selected</span>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button variant="outline" size="sm">
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedListings(filteredListings.map((l) => l.id));
                    } else {
                      setSelectedListings([]);
                    }
                  }}
                  checked={
                    selectedListings.length === filteredListings.length &&
                    filteredListings.length > 0
                  }
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedListings.includes(listing.id)}
                    onChange={() => toggleListingSelection(listing.id)}
                    className="h-4 w-4"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {listing.name}
                  {listing.featured && (
                    <Badge variant="secondary" className="ml-2">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{listing.category}</TableCell>
                <TableCell>{listing.address}</TableCell>
                <TableCell>
                  <Badge
                    variant={listing.status === "active" ? "default" : "secondary"}
                  >
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>{listing.views.toLocaleString()}</TableCell>
                <TableCell>{listing.lastUpdated}</TableCell>
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
                        <Pencil className="mr-2 h-4 w-4" />
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
      </div>
    </div>
  );
}