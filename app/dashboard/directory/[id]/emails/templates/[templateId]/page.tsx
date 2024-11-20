"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { EmailBuilder } from "@/components/email/email-builder";
import { EmailPreview } from "@/components/email/email-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Mock data - in a real app, this would come from your API
const templates = {
  "listing-contact": {
    name: "Listing Contact Form",
    subject: "New Contact Form Submission: {listing_name}",
    description: "Email sent when someone contacts a listing owner",
    content: [
      {
        type: "text",
        content: "You have received a new message regarding your listing {listing_name}.",
      },
      {
        type: "field",
        label: "Name",
        value: "{name}",
      },
      {
        type: "field",
        label: "Email",
        value: "{email}",
      },
      {
        type: "field",
        label: "Message",
        value: "{message}",
      },
    ],
  },
  // Add other templates here
};

const availableVariables = {
  "listing-contact": [
    { name: "listing_name", description: "Name of the listing" },
    { name: "name", description: "Name of the sender" },
    { name: "email", description: "Email of the sender" },
    { name: "message", description: "Message content" },
  ],
  // Add variables for other templates
};

export default function EmailTemplatePage({ params }: { params: { id: string; templateId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Handle case when template doesn't exist
  if (!templates[params.templateId as keyof typeof templates]) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
          <p className="text-muted-foreground">
            The template you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const template = templates[params.templateId as keyof typeof templates];
  const [subject, setSubject] = useState(template.subject);
  const [content, setContent] = useState(template.content);

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the template
      console.log({ subject, content });
      toast({
        title: "Success",
        description: "Email template saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save template. Please try again.",
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
            <div>
              <h1 className="text-lg font-medium">{template.name}</h1>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <div className="p-4 space-y-8">
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
                    variables={availableVariables[params.templateId as keyof typeof availableVariables]}
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
                    variables={availableVariables[params.templateId as keyof typeof availableVariables]}
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