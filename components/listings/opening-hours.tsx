"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface OpeningHoursProps {
  value: OpeningHour[];
  onChange: (hours: OpeningHour[]) => void;
}

export function OpeningHours({ value, onChange }: OpeningHoursProps) {
  const handleTimeChange = (index: number, field: "open" | "close", time: string) => {
    const newHours = [...value];
    newHours[index] = { ...newHours[index], [field]: time };
    onChange(newHours);
  };

  const handleClosedToggle = (index: number) => {
    const newHours = [...value];
    newHours[index] = { ...newHours[index], closed: !newHours[index].closed };
    onChange(newHours);
  };

  return (
    <div className="space-y-4">
      {value.map((hour, index) => (
        <div key={hour.day} className="flex items-center space-x-4">
          <div className="w-24">
            <Label>{hour.day}</Label>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <Input
              type="time"
              value={hour.open}
              onChange={(e) => handleTimeChange(index, "open", e.target.value)}
              disabled={hour.closed}
            />
            <Input
              type="time"
              value={hour.close}
              onChange={(e) => handleTimeChange(index, "close", e.target.value)}
              disabled={hour.closed}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={!hour.closed}
              onCheckedChange={() => handleClosedToggle(index)}
            />
            <Label>{hour.closed ? "Closed" : "Open"}</Label>
          </div>
        </div>
      ))}
    </div>
  );
}