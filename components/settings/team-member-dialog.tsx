"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { directoryPages, rolePermissions } from "@/lib/constants/permissions";

interface TeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    email: string;
    role: string;
    directories: Array<{
      id: string;
      pages: string[];
    }>;
  }) => void;
  directories: Array<{ value: string; label: string; }>;
}

export function TeamMemberDialog({
  open,
  onOpenChange,
  onSubmit,
  directories,
}: TeamMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [selectedDirectories, setSelectedDirectories] = useState<string[]>([]);
  const [directoryPermissions, setDirectoryPermissions] = useState<Record<string, string[]>>({});
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const handleSubmit = () => {
    const formattedDirectories = selectedDirectories.map(dirId => ({
      id: dirId,
      pages: directoryPermissions[dirId] || [],
    }));

    onSubmit({
      email,
      role,
      directories: formattedDirectories,
    });

    // Reset form
    setEmail("");
    setRole("");
    setSelectedDirectories([]);
    setDirectoryPermissions({});
  };

  const handleDirectorySelect = (directoryId: string) => {
    if (selectedDirectories.includes(directoryId)) {
      setSelectedDirectories(selectedDirectories.filter(id => id !== directoryId));
      const newPermissions = { ...directoryPermissions };
      delete newPermissions[directoryId];
      setDirectoryPermissions(newPermissions);
    } else {
      setSelectedDirectories([...selectedDirectories, directoryId]);
    }
  };

  const handlePagePermissionChange = (directoryId: string, pageId: string, checked: boolean) => {
    setDirectoryPermissions(prev => {
      const currentPages = prev[directoryId] || [];
      const updatedPages = checked
        ? [...currentPages, pageId]
        : currentPages.filter(id => id !== pageId);
      
      return {
        ...prev,
        [directoryId]: updatedPages,
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to your team and set their permissions
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="team@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(rolePermissions).map(([value, { label, description }]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex flex-col">
                      <span>{label}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Directory Access</Label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between"
                >
                  {selectedDirectories.length === 0
                    ? "Select directories..."
                    : `${selectedDirectories.length} selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search directories..." />
                  <CommandEmpty>No directory found.</CommandEmpty>
                  <CommandGroup>
                    {directories.map((directory) => (
                      <CommandItem
                        key={directory.value}
                        value={directory.value}
                        onSelect={() => handleDirectorySelect(directory.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedDirectories.includes(directory.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {directory.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {selectedDirectories.length > 0 && (
            <div className="space-y-4">
              <Label>Page Access</Label>
              {selectedDirectories.map((directoryId) => {
                const directory = directories.find(d => d.value === directoryId);
                return (
                  <div key={directoryId} className="space-y-2">
                    <h4 className="font-medium text-sm">{directory?.label}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {directoryPages.map((page) => (
                        <div key={page.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={`${directoryId}-${page.id}`}
                            checked={(directoryPermissions[directoryId] || []).includes(page.id)}
                            onCheckedChange={(checked) => 
                              handlePagePermissionChange(directoryId, page.id, checked as boolean)
                            }
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={`${directoryId}-${page.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {page.label}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {page.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}