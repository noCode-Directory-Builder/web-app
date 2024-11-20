"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, X, Pencil, GripVertical, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Directory {
  id: string;
  name: string;
  type: string;
}

interface CategoryManagerProps {
  directory: Directory;
}

// Mock data - in a real app, this would come from your API
const mockCategories = [
  {
    id: "1",
    name: "Restaurants",
    slug: "restaurants",
    description: "Places to eat and drink",
    listingCount: 45,
  },
  {
    id: "2",
    name: "Hotels",
    slug: "hotels",
    description: "Places to stay",
    listingCount: 32,
  },
  {
    id: "3",
    name: "Shopping",
    slug: "shopping",
    description: "Retail stores and malls",
    listingCount: 28,
  },
];

const mockTags = [
  { id: "1", name: "Family Friendly", listingCount: 25 },
  { id: "2", name: "Pet Friendly", listingCount: 18 },
  { id: "3", name: "Free WiFi", listingCount: 42 },
  { id: "4", name: "Parking Available", listingCount: 35 },
  { id: "5", name: "Outdoor Seating", listingCount: 22 },
];

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
});

const tagSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;
type TagFormValues = z.infer<typeof tagSchema>;

export function CategoryManager({ directory }: CategoryManagerProps) {
  const [categories, setCategories] = useState(mockCategories);
  const [tags, setTags] = useState(mockTags);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const tagForm = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: "",
    },
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(result.type === "category" ? categories : tags);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (result.type === "category") {
      setCategories(items);
    } else {
      setTags(items);
    }
  };

  const handleAddCategory = async (data: CategoryFormValues) => {
    try {
      // Here you would typically make an API call to create the category
      const newCategory = {
        id: String(categories.length + 1),
        ...data,
        listingCount: 0,
      };
      setCategories([...categories, newCategory]);
      setIsAddingCategory(false);
      categoryForm.reset();
      toast({
        title: "Success",
        description: "Category created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create category. Please try again.",
      });
    }
  };

  const handleAddTag = async (data: TagFormValues) => {
    try {
      // Here you would typically make an API call to create the tag
      const newTag = {
        id: String(tags.length + 1),
        ...data,
        listingCount: 0,
      };
      setTags([...tags, newTag]);
      setIsAddingTag(false);
      tagForm.reset();
      toast({
        title: "Success",
        description: "Tag created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create tag. Please try again.",
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      // Here you would typically make an API call to delete the category
      setCategories(categories.filter(c => c.id !== categoryId));
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete category. Please try again.",
      });
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      // Here you would typically make an API call to delete the tag
      setTags(tags.filter(t => t.id !== tagId));
      toast({
        title: "Success",
        description: "Tag deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete tag. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Categories & Tags</h1>
        <p className="text-muted-foreground">
          Manage categories and tags for {directory.name}
        </p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Organize your listings into categories
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddingCategory(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories" type="category">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {categories.map((category, index) => (
                        <Draggable
                          key={category.id}
                          draggableId={category.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center justify-between p-4 rounded-lg border bg-card"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="text-muted-foreground"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">{category.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {category.description}
                                  </div>
                                </div>
                                <Badge variant="secondary">
                                  {category.listingCount} listings
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingItem(category)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteCategory(category.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
                <DialogDescription>
                  Create a new category for your listings
                </DialogDescription>
              </DialogHeader>
              <Form {...categoryForm}>
                <form onSubmit={categoryForm.handleSubmit(handleAddCategory)} className="space-y-4">
                  <FormField
                    control={categoryForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={categoryForm.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The URL-friendly version of the name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={categoryForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Add Category</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to better describe your listings
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddingTag(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Tag
              </Button>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tags" type="tag">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {tags.map((tag, index) => (
                        <Draggable
                          key={tag.id}
                          draggableId={tag.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center justify-between p-4 rounded-lg border bg-card"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="text-muted-foreground"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <div className="font-medium">{tag.name}</div>
                                <Badge variant="secondary">
                                  {tag.listingCount} listings
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingItem(tag)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteTag(tag.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          <Dialog open={isAddingTag} onOpenChange={setIsAddingTag}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Tag</DialogTitle>
                <DialogDescription>
                  Create a new tag for your listings
                </DialogDescription>
              </DialogHeader>
              <Form {...tagForm}>
                <form onSubmit={tagForm.handleSubmit(handleAddTag)} className="space-y-4">
                  <FormField
                    control={tagForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Add Tag</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}