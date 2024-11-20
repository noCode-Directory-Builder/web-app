"use client";

import { useState } from "react";
import { Plus, GripVertical, Trash, Type, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

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

interface EmailBuilderProps {
  content: EmailBlock[];
  onChange: (content: EmailBlock[]) => void;
  variables: Variable[];
}

export function EmailBuilder({ content, onChange, variables }: EmailBuilderProps) {
  const [selectedBlockType, setSelectedBlockType] = useState<"text" | "field">("text");

  const addBlock = () => {
    const newBlock: EmailBlock = selectedBlockType === "text"
      ? { type: "text", content: "" }
      : { type: "field", label: "", value: "" };
    
    onChange([...content, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<EmailBlock>) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], ...updates };
    onChange(newContent);
  };

  const removeBlock = (index: number) => {
    const newContent = content.filter((_, i) => i !== index);
    onChange(newContent);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(content);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select
          value={selectedBlockType}
          onValueChange={(value: "text" | "field") => setSelectedBlockType(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select block type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">
              <div className="flex items-center">
                <Type className="mr-2 h-4 w-4" />
                Text Block
              </div>
            </SelectItem>
            <SelectItem value="field">
              <div className="flex items-center">
                <ListPlus className="mr-2 h-4 w-4" />
                Field Block
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addBlock}>
          <Plus className="mr-2 h-4 w-4" />
          Add Block
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="email-blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {content.map((block, index) => (
                <Draggable
                  key={index}
                  draggableId={`block-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border rounded-lg p-4 bg-card"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <GripVertical className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {block.type === "text" ? "Text Block" : "Field Block"}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBlock(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      {block.type === "text" ? (
                        <div className="space-y-2">
                          <Label>Content</Label>
                          <Textarea
                            value={block.content}
                            onChange={(e) => updateBlock(index, { content: e.target.value })}
                            placeholder="Enter text content..."
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label>Field Label</Label>
                            <Input
                              value={block.label}
                              onChange={(e) => updateBlock(index, { label: e.target.value })}
                              placeholder="Enter field label..."
                            />
                          </div>
                          <div>
                            <Label>Variable</Label>
                            <Select
                              value={block.value}
                              onValueChange={(value) => updateBlock(index, { value: `{${value}}` })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a variable" />
                              </SelectTrigger>
                              <SelectContent>
                                {variables.map((variable) => (
                                  <SelectItem key={variable.name} value={variable.name}>
                                    <div className="flex flex-col">
                                      <span>{variable.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {variable.description}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}