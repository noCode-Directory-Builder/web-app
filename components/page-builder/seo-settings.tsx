"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

interface SEOSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: SEOSettings;
  onChange: (settings: SEOSettings) => void;
}

export function SEOSettings({ open, onOpenChange, settings, onChange }: SEOSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>SEO Settings</DialogTitle>
          <DialogDescription>
            Optimize your page for search engines
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Meta Title</Label>
            <Input
              value={settings.title}
              onChange={(e) => onChange({ ...settings, title: e.target.value })}
              placeholder="Page title for search engines"
            />
            <p className="text-xs text-muted-foreground">
              Recommended length: 50-60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea
              value={settings.description}
              onChange={(e) => onChange({ ...settings, description: e.target.value })}
              placeholder="Brief description of the page"
            />
            <p className="text-xs text-muted-foreground">
              Recommended length: 150-160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label>Keywords</Label>
            <Input
              value={settings.keywords}
              onChange={(e) => onChange({ ...settings, keywords: e.target.value })}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground">
              Separate keywords with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label>Social Share Image</Label>
            <Input
              value={settings.ogImage}
              onChange={(e) => onChange({ ...settings, ogImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Recommended size: 1200x630 pixels
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}