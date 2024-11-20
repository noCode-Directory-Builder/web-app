"use client";

import { Card } from "@/components/ui/card";

interface Variable {
  name: string;
  description: string;
}

interface EmailBlock {
  type: "text" | "field";
  content?: string;
  label?: string;
  value?: string;
}

interface EmailPreviewProps {
  subject: string;
  content: EmailBlock[];
  variables: Variable[];
}

export function EmailPreview({ subject, content, variables }: EmailPreviewProps) {
  // Replace variables with sample values
  const replaceVariables = (text: string) => {
    return variables.reduce((acc, variable) => {
      const placeholder = `{${variable.name}}`;
      return acc.replace(placeholder, `[Sample ${variable.name}]`);
    }, text);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="text-sm text-muted-foreground mb-1">Subject:</div>
          <div className="font-medium">{replaceVariables(subject)}</div>
        </div>

        <div className="space-y-4">
          {content.map((block, index) => (
            <div key={index}>
              {block.type === "text" ? (
                <div className="whitespace-pre-wrap">
                  {replaceVariables(block.content || "")}
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="text-sm font-medium mb-1">{block.label}:</div>
                  <div>{replaceVariables(block.value || "")}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4 text-sm text-muted-foreground">
          Best regards,<br />
          Your Directory Team
        </div>
      </div>
    </Card>
  );
}