"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { SEOForm } from "@/components/shared/seo-form";
import slugify from "slugify";

const pageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  content: z.object({
    blocks: z.array(z.any()).default([]),
  }).default({}),
  styles: z.string().default(""),
  seo: z.object({
    title: z.string().max(60, "Meta title should not exceed 60 characters"),
    description: z.string().max(160, "Meta description should not exceed 160 characters"),
    keywords: z.string().optional(),
    ogImage: z.any().optional(),
    noIndex: z.boolean().default(false),
  }),
});

type PageFormValues = z.infer<typeof pageSchema>;

interface NewPageProps {
  params: {
    id: string;
  };
}

export default function NewPage({ params }: NewPageProps) {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      content: {
        blocks: [],
      },
      styles: "",
      seo: {
        noIndex: false,
      },
    },
  });

  // Auto-generate slug from title
  const title = form.watch("title");
  if (title && !form.getValues("slug")) {
    const slug = slugify(title, { lower: true, strict: true });
    form.setValue("slug", slug);
  }

  async function onSubmit(data: PageFormValues) {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to create the page
      console.log(data);
      toast({
        title: "Success",
        description: "Page created successfully.",
      });
      router.push(`/dashboard/directory/${params.id}/pages`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create page. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Page</h1>
        <p className="text-muted-foreground">
          Create a new page for your directory
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details for your page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The URL-friendly version of the title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>
                    Optimize your page for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SEOForm form={form} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Creating..." : "Create Page"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}