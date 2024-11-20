"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImageUpload, type ImageFile } from "@/components/listings/image-upload";
import { LocationPicker } from "@/components/listings/location-picker";
import { OpeningHours } from "@/components/listings/opening-hours";
import { ListingFeatures } from "@/components/listings/listing-features";
import { StepIndicator } from "@/components/listings/step-indicator";

interface Directory {
  id: string;
  name: string;
  type: string;
}

interface NewListingFormProps {
  directory: Directory;
}

const listingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  phone: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  website: z.string().url("Please enter a valid URL").optional(),
  images: z.array(z.custom<ImageFile>()).default([]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  openingHours: z.array(z.object({
    day: z.string(),
    open: z.string(),
    close: z.string(),
    closed: z.boolean(),
  })),
  features: z.array(z.string()),
  socialMedia: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

type ListingFormValues = z.infer<typeof listingSchema>;

const steps = [
  { id: "basic", title: "Basic Info" },
  { id: "location", title: "Location" },
  { id: "details", title: "Details" },
  { id: "media", title: "Media" },
];

const categories = [
  { value: "restaurant", label: "Restaurant" },
  { value: "retail", label: "Retail" },
  { value: "service", label: "Service" },
  { value: "healthcare", label: "Healthcare" },
  { value: "entertainment", label: "Entertainment" },
];

export function NewListingForm({ directory }: NewListingFormProps) {
  const [currentStep, setCurrentStep] = useState("basic");
  const { toast } = useToast();

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      images: [],
      openingHours: [
        { day: "Monday", open: "09:00", close: "17:00", closed: false },
        { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
        { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
        { day: "Thursday", open: "09:00", close: "17:00", closed: false },
        { day: "Friday", open: "09:00", close: "17:00", closed: false },
        { day: "Saturday", open: "09:00", close: "17:00", closed: true },
        { day: "Sunday", open: "09:00", close: "17:00", closed: true },
      ],
      features: [],
      socialMedia: {},
    },
  });

  const onSubmit = async (data: ListingFormValues) => {
    try {
      // Here you would typically make an API call to save the listing
      console.log(data);
      toast({
        title: "Success",
        description: "Your listing has been created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create listing. Please try again.",
      });
    }
  };

  const goToNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Listing</h1>
        <p className="text-muted-foreground">
          Fill out the information below to create your listing in {directory.name}
        </p>
      </div>

      <StepIndicator steps={steps} currentStep={currentStep} />

      <Form {...form}>
        <form className="space-y-8 mt-8">
          {currentStep === "basic" && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter business name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Textarea
                          {...field}
                          placeholder="Enter business description"
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of your business
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "location" && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LocationPicker
                  onLocationSelect={(lat, lng) => {
                    form.setValue("latitude", lat);
                    form.setValue("longitude", lng);
                  }}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "details" && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" placeholder="https://" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Hours</FormLabel>
                      <FormControl>
                        <OpeningHours
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
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <ListingFeatures
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

          {currentStep === "media" && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          maxFiles={10}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload images of your business (max 10 images). Select a cover photo by clicking the star icon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Media</h3>
                  <div className="grid gap-4">
                    {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
                      <FormField
                        key={platform}
                        control={form.control}
                        name={`socialMedia.${platform}` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">{platform}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder={`${platform}.com/...`} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === steps[0].id}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              type="button"
              onClick={goToNextStep}
            >
              {currentStep === steps[steps.length - 1].id ? (
                "Create Listing"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}