"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
  blocks: any[];
  styles: string;
  onClose: () => void;
}

export function PreviewPanel({ blocks, styles, onClose }: PreviewPanelProps) {
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    // Generate HTML content for preview
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            ${styles}
          </style>
        </head>
        <body>
          ${blocks.map(block => renderBlock(block)).join("")}
        </body>
      </html>
    `;
    setIframeContent(html);
  }, [blocks, styles]);

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "hero":
        return `
          <section class="hero">
            <h1>${block.data.title || ""}</h1>
            <p>${block.data.description || ""}</p>
            ${block.data.image ? `<img src="${block.data.image}" alt="${block.data.title}">` : ""}
          </section>
        `;

      case "text":
        return `
          <section class="text-content">
            ${block.data.content || ""}
          </section>
        `;

      // Add more block renderers as needed

      default:
        return `<div>Block type not supported: ${block.type}</div>`;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-4 bg-background border rounded-lg shadow-lg flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Page Preview</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            srcDoc={iframeContent}
            className="w-full h-full border rounded-lg"
            title="Page Preview"
          />
        </div>
      </div>
    </div>
  );
}