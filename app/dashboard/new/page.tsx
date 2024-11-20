"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { WizardSteps } from "@/components/directory/wizard-steps";
import { ColorInput } from "@/components/directory/color-input";
import { SearchSelect } from "@/components/directory/search-select";
import { LayoutPreview } from "@/components/directory/layout-preview";
import { FileUpload } from "@/components/directory/file-upload";
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

const steps = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Directory details",
  },
  {
    id: "design",
    title: "Design",
    description: "Colors and fonts",
  },
  {
    id: "layout",
    title: "Layout",
    description: "Page layouts",
  },
  {
    id: "features",
    title: "Features",
    description: "Directory features",
  },
  {
    id: "api",
    title: "API Setup",
    description: "External services",
  },
  {
    id: "packages",
    title: "Packages",
    description: "Pricing plans",
  },
];

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

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

export default function NewDirectoryPage() {
  const [currentStep, setCurrentStep] = useState("basic");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      email: "",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      textColor: "#000000",
      titleFont: "",
      textFont: "",
      homeLayout: "",
      listingLayout: "",
      cardLayout: "",
      description: "",
      features: [],
      sorting: "latest",
      searchBarFilters: [],
      searchPageFilters: [],
      adsenseCode: [],
      adsenseLocations: [],
      packages: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const goToNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Directory</h1>
        <p className="text-muted-foreground">
          Fill out the information below to create your directory.
        </p>
      </div>

      <WizardSteps
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        completedSteps={completedSteps}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === "basic" && (
            <Card>
              <CardContent className="space-y-6 pt-6">
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
                      <FormLabel>Domain Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the domain where your directory will be hosted
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <FileUpload
                          onChange={field.onChange}
                          value={field.value}
                          accept="image/svg+xml,image/png,image/jpeg"
                        />
                      </FormControl>
                      <FormDescription>
                        Upload your directory logo (SVG, PNG, or JPG)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "design" && (
            <Card>
              <CardContent className="space-y-6 pt-6">
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
          )}

          {currentStep === "layout" && (
            <Card>
              <CardContent className="space-y-6 pt-6">
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
          )}

          {currentStep === "features" && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Directory Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter a description about your directory..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This description will be used to generate SEO-optimized content for your directory.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                              <Checkbox
                                checked={field.value?.includes(feature.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), feature.id]
                                    : field.value?.filter((id) => id !== feature.id) || [];
                                  field.onChange(newValue);
                                }}
                              />
                              <Label
                                htmlFor={feature.id}
                                className="text-sm font-normal"
                              >
                                {feature.label}
                              </Label>
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
          )}

          {currentStep === "api" && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="googleMapsApiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maps API Key</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <SearchSelect
                              options={[
                                { value: "google", label: "Google Maps" },
                                { value: "mapbox", label: "Mapbox" },
                              ]}
                              value={field.value ? "google" : "mapbox"}
                              onChange={(value) => {
                                if (value === "google") {
                                  form.setValue("mapboxApiKey", "");
                                } else {
                                  form.setValue("googleMapsApiKey", "");
                                }
                              }}
                            />
                            <Input
                              {...field}
                              placeholder="Enter your API key"
                            />
                          </div>
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
                    name="googleSearchConsoleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Search Console ID</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter verification ID" />
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
                          <Input {...field} placeholder="sk_live_..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="adsenseCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AdSense Code</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {field.value?.map((code, index) => (
                              <div key={index} className="flex gap-2">
                                <div className="flex-1 space-y-2">
                                  <Input
                                    value={code}
                                    onChange={(e) => {
                                      const newCodes = [...(field.value || [])];
                                      newCodes[index] = e.target.value;
                                      field.onChange(newCodes);
                                    }}
                                    placeholder={`AdSense code ${index + 1}`}
                                  />
                                  <SearchSelect
                                    options={adsenseLocations}
                                    value={form.watch(`adsenseLocations.${index}`) || ""}
                                    onChange={(value) => {
                                      const locations = [...(form.watch("adsenseLocations") || [])];
                                      locations[index] = value;
                                      form.setValue("adsenseLocations", locations);
                                    }}
                                    placeholder="Select location..."
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 mt-0"
                                  onClick={() => {
                                    const newCodes = [...(field.value || [])];
                                    newCodes.splice(index, 1);
                                    field.onChange(newCodes);
                                    
                                    const locations = [...(form.watch("adsenseLocations") || [])];
                                    locations.splice(index, 1);
                                    form.setValue("adsenseLocations", locations);
                                  }}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                field.onChange([...(field.value || []), ""]);
                                const locations = [...(form.watch("adsenseLocations") || [])];
                                locations.push("");
                                form.setValue("adsenseLocations", locations);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add AdSense Code
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "packages" && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <FormField
                  control={form.control}
                  name="packages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing Packages</FormLabel>
                      <FormControl>
                        <PackageBuilder
                          packages={field.value || []}
                          onChange={field.onChange}
                          features={availableFeatures.map(f => f.label)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === steps[0].id}
            >
              Previous
            </Button>
            {currentStep === steps[steps.length - 1].id ? (
              <Button type="submit">Create Directory</Button>
            ) : (
              <Button type="button" onClick={goToNextStep}>
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}