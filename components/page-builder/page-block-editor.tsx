"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, ArrowDown, Trash, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageBlock {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface PageBlockEditorProps {
  block: PageBlock;
  onUpdate: (data: Record<string, any>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function PageBlockEditor({
  block,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: PageBlockEditorProps) {
  const renderBlockEditor = () => {
    switch (block.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={block.data.title || ""}
                onChange={(e) => onUpdate({ ...block.data, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={block.data.description || ""}
                onChange={(e) => onUpdate({ ...block.data, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Background Image URL</Label>
              <Input
                value={block.data.image || ""}
                onChange={(e) => onUpdate({ ...block.data, image: e.target.value })}
              />
            </div>
          </div>
        );

      case "featured-listings":
        return (
          <div className="space-y-4">
            <div>
              <Label>Section Title</Label>
              <Input
                value={block.data.title || ""}
                onChange={(e) => onUpdate({ ...block.data, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Number of Listings</Label>
              <Input
                type="number"
                value={block.data.count || 6}
                onChange={(e) => onUpdate({ ...block.data, count: parseInt(e.target.value) })}
              />
            </div>
          </div>
        );

      case "text":
        return (
          <div>
            <Label>Content</Label>
            <Textarea
              value={block.data.content || ""}
              onChange={(e) => onUpdate({ ...block.data, content: e.target.value })}
              className="min-h-[200px]"
            />
          </div>
        );

      // Add more block type editors as needed

      default:
        return (
          <div className="text-muted-foreground">
            Editor not implemented for block type: {block.type}
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
          <span className="font-medium capitalize">{block.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveUp}
            disabled={isFirst}
            className={cn(isFirst && "opacity-50")}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveDown}
            disabled={isLast}
            className={cn(isLast && "opacity-50")}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{renderBlockEditor()}</CardContent>
    </Card>
  );
}