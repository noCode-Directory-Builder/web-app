"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResponsiveControlsProps {
  viewport: "desktop" | "tablet" | "mobile";
  onChange: (viewport: "desktop" | "tablet" | "mobile") => void;
}

export function ResponsiveControls({ viewport, onChange }: ResponsiveControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange("desktop")}
        className={cn(viewport === "desktop" && "bg-accent")}
      >
        <Monitor className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange("tablet")}
        className={cn(viewport === "tablet" && "bg-accent")}
      >
        <Tablet className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange("mobile")}
        className={cn(viewport === "mobile" && "bg-accent")}
      >
        <Smartphone className="h-4 w-4" />
      </Button>
    </div>
  );
}