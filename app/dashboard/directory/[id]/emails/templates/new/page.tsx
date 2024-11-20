"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { EmailBuilder } from "@/components/email/email-builder";
import { EmailPreview } from "@/components/email/email-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const defaultVariables = [
  { name: "site_name", description: "Name of your directory" },
  { name: "site_url", description: "URL of your directory" },
  { name: "current_date", description: "Current date" },
];

export default function NewEmailTemplatePage({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState<any[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to create the template
      console.log({ name, description, subject, content });
      toast({
        title: "Success",
        description: "Email template created successfully.",
      });
      router.push(`/dashboard/directory/${params.id}/emails`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create template. Please try again.",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <div className="border-b bg-card px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-lg font-medium">Create New Email Template</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <div className="p-4 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Template Details</CardTitle>
                  <CardDescription>
                    Basic information about your email template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Welcome Email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe when this template will be used..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Subject</CardTitle>
                  <CardDescription>
                    The subject line of the email. You can use variables in curly braces.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject..."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Content</CardTitle>
                  <CardDescription>
                    Build your email template using the blocks below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmailBuilder
                    content={content}
                    onChange={setContent}
                    variables={defaultVariables}
                  />
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    Preview how your email will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmailPreview
                    subject={subject}
                    content={content}
                    variables={defaultVariables}
                  />
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}