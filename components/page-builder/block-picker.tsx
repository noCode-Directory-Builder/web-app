"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  LayoutTemplate,
  Image,
  ListOrdered,
  Map,
  MessageSquare,
  Grid,
  Contact,
} from "lucide-react";

const blocks = [
  {
    type: "hero",
    title: "Hero Section",
    description: "Large header section with background image",
    icon: LayoutTemplate,
  },
  {
    type: "featured-listings",
    title: "Featured Listings",
    description: "Display featured directory listings",
    icon: Grid,
  },
  {
    type: "text",
    title: "Text Content",
    description: "Rich text content section",
    icon: MessageSquare,
  },
  {
    type: "image",
    title: "Image",
    description: "Single image or gallery",
    icon: Image,
  },
  {
    type: "map",
    title: "Map",
    description: "Interactive location map",
    icon: Map,
  },
  {
    type: "listing-categories",
    title: "Categories",
    description: "Directory categories grid",
    icon: ListOrdered,
  },
  {
    type: "contact",
    title: "Contact Form",
    description: "Contact form section",
    icon: Contact,
  },
];

interface BlockPickerProps {
  onSelect: (blockType: string) => void;
}

export function BlockPicker({ onSelect }: BlockPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {blocks.map((block) => (
        <Card
          key={block.type}
          className={cn(
            "relative cursor-pointer transition-all hover:shadow-md",
            "group border-2 border-muted hover:border-primary"
          )}
          onClick={() => onSelect(block.type)}
        >
          <div className="p-4">
            <block.icon className="h-8 w-8 mb-2 text-muted-foreground group-hover:text-primary" />
            <h3 className="font-medium mb-1">{block.title}</h3>
            <p className="text-sm text-muted-foreground">
              {block.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}