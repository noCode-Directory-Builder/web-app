"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const availableFeatures = [
  { id: "wifi", label: "Free WiFi" },
  { id: "parking", label: "Parking Available" },
  { id: "delivery", label: "Delivery" },
  { id: "takeout", label: "Takeout" },
  { id: "reservations", label: "Reservations" },
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "outdoor", label: "Outdoor Seating" },
  { id: "credit-cards", label: "Credit Cards" },
  { id: "family-friendly", label: "Family Friendly" },
  { id: "pet-friendly", label: "Pet Friendly" },
];

interface ListingFeaturesProps {
  value: string[];
  onChange: (features: string[]) => void;
}

export function ListingFeatures({ value, onChange }: ListingFeaturesProps) {
  const toggleFeature = (featureId: string) => {
    const newFeatures = value.includes(featureId)
      ? value.filter((id) => id !== featureId)
      : [...value, featureId];
    onChange(newFeatures);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableFeatures.map((feature) => {
        const isSelected = value.includes(feature.id);
        return (
          <Badge
            key={feature.id}
            variant="outline"
            className={cn(
              "cursor-pointer hover:bg-primary/10 transition-colors",
              isSelected && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => toggleFeature(feature.id)}
          >
            {isSelected && <Check className="mr-1 h-3 w-3" />}
            {feature.label}
          </Badge>
        );
      })}
    </div>
  );
}