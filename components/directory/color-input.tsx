"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function ColorInput({ value, onChange, label }: ColorInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-12 h-12 p-0",
                "border-2 border-muted hover:border-muted-foreground"
              )}
              style={{ backgroundColor: value }}
            >
              <span className="sr-only">Pick a color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <Input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-32"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="font-mono"
        />
      </div>
    </div>
  );
}