"use client";

import { useState } from "react";
import { Search, Filter, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - in a real app, this would come from your API
const pendingListings = [
  {
    id: 1,
    name: "New Restaurant",
    category: "Restaurant",
    submittedBy: "john@example.com",
    submittedAt: "2024-03-20T10:30:00Z",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: "A new Italian restaurant in downtown...",
  },
  {
    id: 2,
    name: "Fitness Studio",
    category: "Fitness",
    submittedBy: "jane@example.com",
    submittedAt: "2024-03-19T15:45:00Z",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    description: "Modern fitness studio with state-of-the-art equipment...",
  },
];

export default function PendingListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  const handleApprove = async (listingId: number) => {
    try {
      // Here you would typically make an API call to approve the listing
      toast({
        title: "Success",
        description: "Listing has been approved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve listing. Please try again.",
      });
    }
  };

  const handleReject = async (listingId: number) => {
    try {
      // Here you would typically make an API call to reject the listing
      toast({
        title: "Success",
        description: "Listing has been rejected.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject listing. Please try again.",
      });
    }
  };

  const filteredListings = pendingListings.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || listing.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pending Listings</h1>
        <p className="text-muted-foreground">
          Review and approve new listing submissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{listing.name}</h3>
                      <Badge>{listing.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedListing(listing);
                          setIsPreviewOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => handleApprove(listing.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleReject(listing.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Submitted by: {listing.submittedBy}</span>
                    <span>•</span>
                    <span>
                      {new Date(listing.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Listing Preview</DialogTitle>
            <DialogDescription>
              Preview how the listing will appear on your directory
            </DialogDescription>
          </DialogHeader>

          {selectedListing && (
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={selectedListing.image}
                  alt={selectedListing.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedListing.name}</h2>
                <Badge className="mb-4">{selectedListing.category}</Badge>
                <p className="text-muted-foreground">{selectedListing.description}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Submission Details</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Submitted by: {selectedListing.submittedBy}</div>
                  <div>
                    Submitted on: {new Date(selectedListing.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleReject(selectedListing?.id)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => handleApprove(selectedListing?.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}