"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/listings/image-upload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SEOFormProps {
  form: any; // Using any here as it needs to work with react-hook-form
}

export function SEOForm({ form }: SEOFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <FormField
          control={form.control}
          name="seo.noIndex"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Hide from Search Engines</FormLabel>
                <FormDescription>
                  Add noindex tag to prevent search engines from indexing this page
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="seo.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Meta Title
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Optimal length: 50-60 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/60 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Meta Description
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Optimal length: 150-160 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/160 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo.keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <Input {...field} placeholder="keyword1, keyword2, keyword3" />
              </FormControl>
              <FormDescription>
                Separate keywords with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo.ogImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenGraph Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(files) => field.onChange(files[0])}
                  maxFiles={1}
                />
              </FormControl>
              <FormDescription>
                Recommended size: 1200x630 pixels
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}