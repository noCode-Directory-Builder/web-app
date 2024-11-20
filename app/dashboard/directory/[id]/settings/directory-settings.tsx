"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ColorInput } from "@/components/directory/color-input";
import { SearchSelect } from "@/components/directory/search-select";
import { LayoutPreview } from "@/components/directory/layout-preview";
import { SearchFilterBuilder } from "@/components/directory/search-filter-builder";
import { PackageBuilder } from "@/components/directory/package-builder";

import {
  homeLayouts,
  listingLayouts,
  cardLayouts,
  sortingOptions,
  fonts,
  availableSearchFilters,
} from "@/lib/directory-constants";

const directorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  domain: z.string().min(3, "Domain must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  logo: z.any().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  textColor: z.string(),
  titleFont: z.string(),
  textFont: z.string(),
  homeLayout: z.string(),
  listingLayout: z.string(),
  cardLayout: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.array(z.string()),
  sorting: z.string(),
  searchBarFilters: z.array(z.string()),
  searchPageFilters: z.array(z.string()),
  googleMapsApiKey: z.string().optional(),
  mapboxApiKey: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleSearchConsoleId: z.string().optional(),
  stripeApiKey: z.string().optional(),
  adsenseCode: z.array(z.string()).optional(),
  adsenseLocations: z.array(z.string()).optional(),
  packages: z.array(z.object({
    name: z.string(),
    monthlyPrice: z.number(),
    yearlyPrice: z.number(),
    features: z.array(z.string()),
    isPopular: z.boolean(),
  })),
});

type DirectoryFormValues = z.infer<typeof directorySchema>;

const availableFeatures = [
  { id: "contact-form", label: "Contact Form on Listing" },
  { id: "phone", label: "Phone Number on Listing" },
  { id: "website", label: "Website on Listing" },
  { id: "social-media", label: "Social Media on Listing" },
  { id: "claim-listing", label: "Allow Claim Listing" },
  { id: "maps", label: "Google Maps/MapBox Geo" },
  { id: "reviews", label: "Show Reviews" },
  { id: "adsense", label: "Allow Google AdSense" },
  { id: "album", label: "Allow Album" },
  { id: "menu", label: "Allow Listing Menu" },
];

const adsenseLocations = [
  { value: "home-top", label: "Home Page Top" },
  { value: "home-bottom", label: "Home Page Bottom" },
  { value: "listing-top", label: "Listing Page Top" },
  { value: "listing-bottom", label: "Listing Page Bottom" },
  { value: "sidebar", label: "Sidebar" },
];

export function DirectorySettings() {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<DirectoryFormValues>({
    resolver: zodResolver(directorySchema),
    defaultValues: {
      name: "Restaurant Directory",
      domain: "restaurants.example.com",
      email: "admin@example.com",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      textColor: "#000000",
      titleFont: "inter",
      textFont: "inter",
      homeLayout: "modern",
      listingLayout: "grid",
      cardLayout: "standard",
      description: "A comprehensive directory of local restaurants",
      features: ["contact-form", "reviews", "maps"],
      sorting: "latest",
      searchBarFilters: ["category", "location"],
      searchPageFilters: ["price", "rating"],
      packages: [],
    },
  });

  async function onSubmit(data: DirectoryFormValues) {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the settings
      console.log(data);
      toast({
        title: "Success",
        description: "Directory settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              General settings for your directory
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Directory Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The domain where your directory is hosted
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design</CardTitle>
            <CardDescription>
              Customize the look and feel of your directory
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <FormControl>
                    <ColorInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Primary Color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <FormControl>
                    <ColorInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Secondary Color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text Color</FormLabel>
                  <FormControl>
                    <ColorInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Text Color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titleFont"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Font</FormLabel>
                  <FormControl>
                    <SearchSelect
                      options={fonts}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="textFont"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text Font</FormLabel>
                  <FormControl>
                    <SearchSelect
                      options={fonts}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Layout</CardTitle>
            <CardDescription>
              Choose how your directory pages are displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="homeLayout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Layout</FormLabel>
                  <FormControl>
                    <LayoutPreview
                      options={homeLayouts}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingLayout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Layout</FormLabel>
                  <FormControl>
                    <LayoutPreview
                      options={listingLayouts}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardLayout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Layout</FormLabel>
                  <FormControl>
                    <LayoutPreview
                      options={cardLayouts}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Configure directory features and functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-4">
                      {availableFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={field.value?.includes(feature.id)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(field.value || []), feature.id]
                                : field.value?.filter((id) => id !== feature.id) || [];
                              field.onChange(newValue);
                            }}
                            className="h-4 w-4"
                          />
                          <label className="text-sm">{feature.label}</label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sorting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Sorting</FormLabel>
                  <FormControl>
                    <SearchSelect
                      options={sortingOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="searchBarFilters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Filters</FormLabel>
                  <FormControl>
                    <SearchFilterBuilder
                      availableFilters={availableSearchFilters}
                      searchBarFilters={field.value || []}
                      searchPageFilters={form.watch("searchPageFilters") || []}
                      onSearchBarFiltersChange={field.onChange}
                      onSearchPageFiltersChange={(filters) =>
                        form.setValue("searchPageFilters", filters)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Configure external service integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="googleMapsApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps API Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="googleAnalyticsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Analytics ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="G-XXXXXXXXXX" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stripeApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stripe API Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}