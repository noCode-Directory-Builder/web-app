"use client";

import { Plus, Minus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export interface TimeSlot {
  start: string;
  end: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
  closed: boolean;
}

interface TimeSlotPickerProps {
  value: DaySchedule[];
  onChange: (schedule: DaySchedule[]) => void;
}

export function TimeSlotPicker({ value, onChange }: TimeSlotPickerProps) {
  const addSlot = (dayIndex: number) => {
    const newSchedule = [...value];
    newSchedule[dayIndex].slots.push({ start: "09:00", end: "17:00" });
    onChange(newSchedule);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...value];
    newSchedule[dayIndex].slots.splice(slotIndex, 1);
    onChange(newSchedule);
  };

  const updateSlot = (dayIndex: number, slotIndex: number, field: keyof TimeSlot, time: string) => {
    const newSchedule = [...value];
    newSchedule[dayIndex].slots[slotIndex][field] = time;
    onChange(newSchedule);
  };

  const toggleClosed = (dayIndex: number) => {
    const newSchedule = [...value];
    newSchedule[dayIndex].closed = !newSchedule[dayIndex].closed;
    onChange(newSchedule);
  };

  return (
    <div className="space-y-4">
      {value.map((day, dayIndex) => (
        <Card key={day.day} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{day.day}</h4>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={!day.closed}
                  onCheckedChange={() => toggleClosed(dayIndex)}
                />
                <Label>{day.closed ? "Closed" : "Open"}</Label>
              </div>
            </div>

            {!day.closed && (
              <div className="space-y-2">
                {day.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={slot.start}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, "start", e.target.value)}
                      className="w-32"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={slot.end}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, "end", e.target.value)}
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSlot(dayIndex, slotIndex)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSlot(dayIndex)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}