"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailPreviewDialogProps {
  email: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailPreviewDialog({
  email,
  open,
  onOpenChange,
}: EmailPreviewDialogProps) {
  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
          <DialogDescription>
            View the content of the sent email
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[600px]">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge variant={email.status === "sent" ? "default" : "destructive"}>
                {email.status}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Sent At</div>
              <div>{new Date(email.sentAt).toLocaleString()}</div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Recipient</div>
              <div>{email.recipient}</div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Subject</div>
              <div className="font-medium">{email.subject}</div>
            </div>

            <div className="border-t pt-4">
              <div className="prose prose-sm max-w-none">
                <p>This is a sample email content. In a real application, this would show the actual email content that was sent.</p>
                
                <div className="bg-muted rounded-lg p-4 my-4">
                  <div className="font-medium mb-2">Form Submission Details:</div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">Name:</span> John Doe
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span> john@example.com
                    </div>
                    <div>
                      <span className="text-muted-foreground">Message:</span>
                      <p className="mt-1">Hello, I'm interested in your listing...</p>
                    </div>
                  </div>
                </div>

                <p>Best regards,<br />Your Directory Team</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}