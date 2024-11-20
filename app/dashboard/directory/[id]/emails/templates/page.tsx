"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Mail, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data - in a real app, this would come from your API
const templates = [
  {
    id: "listing-contact",
    name: "Listing Contact Form",
    description: "Email sent when someone contacts a listing owner",
    lastModified: "2024-03-20T10:30:00Z",
  },
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Sent to new users when they register",
    lastModified: "2024-03-19T15:45:00Z",
  },
  {
    id: "listing-approved",
    name: "Listing Approved",
    description: "Sent when a listing is approved by moderators",
    lastModified: "2024-03-19T09:15:00Z",
  },
  {
    id: "listing-rejected",
    name: "Listing Rejected",
    description: "Sent when a listing is rejected by moderators",
    lastModified: "2024-03-18T14:20:00Z",
  },
];

export default function EmailTemplatesPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Templates</h1>
          <p className="text-muted-foreground">
            Manage your directory's email templates
          </p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/directory/${params.id}/emails/templates/new`}>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="relative group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                {template.name}
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last modified: {new Date(template.lastModified).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/directory/${params.id}/emails/templates/${template.id}`}>
                    Edit Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}