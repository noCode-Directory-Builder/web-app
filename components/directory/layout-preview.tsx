"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LayoutOption {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface LayoutPreviewProps {
  options: LayoutOption[];
  value: string;
  onChange: (value: string) => void;
}

export function LayoutPreview({ options, value, onChange }: LayoutPreviewProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-3 gap-4"
    >
      {options.map((option) => (
        <div key={option.id}>
          <RadioGroupItem
            value={option.id}
            id={option.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={option.id}
            className="block cursor-pointer"
          >
            <Card className={cn(
              "border-2 transition-all hover:border-primary",
              value === option.id && "border-primary"
            )}>
              <CardContent className="p-4">
                <div className="relative aspect-video mb-2 overflow-hidden rounded-lg">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold">{option.title}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}