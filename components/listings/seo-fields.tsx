"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import slugify from "slugify";

export function SEOFields() {
  const form = useFormContext();

  // Auto-generate slug from name
  useEffect(() => {
    const name = form.watch("name");
    if (name && !form.getValues("slug")) {
      const slug = slugify(name, { lower: true, strict: true });
      form.setValue("slug", slug);
    }
  }, [form.watch("name")]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL Slug</FormLabel>
            <FormControl>
              <Input {...field} placeholder="your-listing-url" />
            </FormControl>
            <FormDescription>
              The URL-friendly version of the listing name
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metaTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="SEO title for search engines" />
            </FormControl>
            <FormDescription>
              Appears in search engine results (50-60 characters recommended)
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metaDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Brief description for search results"
                className="h-20"
              />
            </FormControl>
            <FormDescription>
              Appears in search engine results (150-160 characters recommended)
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Keywords</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="restaurant, italian, pizza"
              />
            </FormControl>
            <FormDescription>
              Comma-separated keywords for search engines
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
}