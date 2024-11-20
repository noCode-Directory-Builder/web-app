"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Eye, Plus, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { EmailPreviewDialog } from "@/components/email/email-preview-dialog";

// Mock data - in a real app, this would come from your API
const emails = [
  {
    id: 1,
    subject: "New Contact Form Submission",
    recipient: "business@example.com",
    template: "contact-form",
    status: "sent",
    sentAt: "2024-03-20T10:30:00Z",
  },
  {
    id: 2,
    subject: "Welcome to Our Directory",
    recipient: "newuser@example.com",
    template: "welcome",
    status: "sent",
    sentAt: "2024-03-19T15:45:00Z",
  },
  {
    id: 3,
    subject: "Your Listing Has Been Approved",
    recipient: "merchant@example.com",
    template: "listing-approved",
    status: "failed",
    sentAt: "2024-03-19T09:15:00Z",
  },
];

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

export default function EmailsPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [templateSearchQuery, setTemplateSearchQuery] = useState("");

  const filteredEmails = emails.filter((email) => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTemplate = selectedTemplate === "all" || email.template === selectedTemplate;
    const matchesStatus = selectedStatus === "all" || email.status === selectedStatus;
    
    return matchesSearch && matchesTemplate && matchesStatus;
  });

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(templateSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Email Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor your directory's email communications
        </p>
      </div>

      <Tabs defaultValue="sent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sent">Sent Emails</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search emails..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Templates</SelectItem>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{email.subject}</h3>
                          <Badge variant={email.status === "sent" ? "default" : "destructive"}>
                            {email.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{email.recipient}</span>
                          <span>•</span>
                          <span>{new Date(email.sentAt).toLocaleString()}</span>
                          <span>•</span>
                          <span>{templates.find(t => t.id === email.template)?.name}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedEmail(email);
                          setIsPreviewOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-6">
            <div className="flex justify-between">
              <Card className="flex-1 mr-4">
                <CardHeader>
                  <CardTitle>Search Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      className="pl-8"
                      value={templateSearchQuery}
                      onChange={(e) => setTemplateSearchQuery(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              <Button asChild>
                <Link href={`/dashboard/directory/${params.id}/emails/templates/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Template
                </Link>
              </Button>
            </div>

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
        </TabsContent>
      </Tabs>

      <EmailPreviewDialog
        email={selectedEmail}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </div>
  );
}