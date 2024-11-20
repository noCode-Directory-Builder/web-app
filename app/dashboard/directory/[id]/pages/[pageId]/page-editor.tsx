"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import { Save, Eye, ArrowLeft, Plus, Monitor, Tablet, Smartphone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PageBlockEditor } from "@/components/page-builder/page-block-editor";
import { BlockPicker } from "@/components/page-builder/block-picker";
import { LivePreview } from "@/components/page-builder/live-preview";
import { SEOForm } from "@/components/shared/seo-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";

const pageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  content: z.object({
    blocks: z.array(z.any()),
  }),
  styles: z.string(),
  seo: z.object({
    title: z.string().max(60, "Meta title should not exceed 60 characters"),
    description: z.string().max(160, "Meta description should not exceed 160 characters"),
    keywords: z.string().optional(),
    ogImage: z.any().optional(),
    noIndex: z.boolean().default(false),
  }),
});

type PageFormValues = z.infer<typeof pageSchema>;

interface PageBlock {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface PageEditorProps {
  directory: {
    id: string;
    name: string;
    type: string;
  };
  page: {
    id: string;
    title: string;
    slug: string;
    content: {
      blocks: PageBlock[];
    };
    styles: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string;
      ogImage?: any;
      noIndex?: boolean;
    };
  };
}

export function PageEditor({ directory, page }: PageEditorProps) {
  const [activeTab, setActiveTab] = useState("visual");
  const [isBlockPickerOpen, setIsBlockPickerOpen] = useState(false);
  const [blocks, setBlocks] = useState(page.content.blocks);
  const [styles, setStyles] = useState(page.styles);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: page.title,
      slug: page.slug,
      content: {
        blocks: page.content.blocks,
      },
      styles: page.styles,
      seo: {
        title: page.seo?.title || "",
        description: page.seo?.description || "",
        keywords: page.seo?.keywords || "",
        ogImage: page.seo?.ogImage,
        noIndex: page.seo?.noIndex || false,
      },
    },
  });

  const handleSave = async (data: PageFormValues) => {
    try {
      // Here you would typically make an API call to save the page
      console.log(data);
      toast({
        title: "Success",
        description: "Page saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save page. Please try again.",
      });
    }
  };

  const handleAddBlock = (blockType: string) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      data: {},
    };
    setBlocks([...blocks, newBlock]);
    setIsBlockPickerOpen(false);
  };

  const handleUpdateBlock = (blockId: string, data: Record<string, any>) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, data } : block
    );
    setBlocks(newBlocks);
    form.setValue("content.blocks", newBlocks);
  };

  const handleRemoveBlock = (blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(newBlocks);
    form.setValue("content.blocks", newBlocks);
  };

  const handleMoveBlock = (blockId: string, direction: "up" | "down") => {
    const index = blocks.findIndex(block => block.id === blockId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setBlocks(newBlocks);
    form.setValue("content.blocks", newBlocks);
  };

  const handleStylesChange = (value: string | undefined) => {
    const newStyles = value || "";
    setStyles(newStyles);
    form.setValue("styles", newStyles);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          <div className="border-b bg-card px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-lg font-medium">
                  Editing: {page.title}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden md:block">
                  <TabsList>
                    <TabsTrigger value="visual">Visual</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-1 border rounded-md p-1">
                  <Button
                    variant={viewport === "desktop" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewport("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewport === "tablet" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewport("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewport === "mobile" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewport("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button type="submit" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={30}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsContent value="visual" className="p-4 h-[calc(100%-45px)] overflow-auto">
                    <div className="max-w-5xl mx-auto space-y-8">
                      {blocks.map((block, index) => (
                        <PageBlockEditor
                          key={block.id}
                          block={block}
                          onUpdate={(data) => handleUpdateBlock(block.id, data)}
                          onRemove={() => handleRemoveBlock(block.id)}
                          onMoveUp={() => handleMoveBlock(block.id, "up")}
                          onMoveDown={() => handleMoveBlock(block.id, "down")}
                          isFirst={index === 0}
                          isLast={index === blocks.length - 1}
                        />
                      ))}

                      <Dialog open={isBlockPickerOpen} onOpenChange={setIsBlockPickerOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Block
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Block</DialogTitle>
                            <DialogDescription>
                              Choose a block type to add to your page
                            </DialogDescription>
                          </DialogHeader>
                          <BlockPicker onSelect={handleAddBlock} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="h-[calc(100%-45px)]">
                    <Editor
                      height="100%"
                      defaultLanguage="css"
                      theme="vs-dark"
                      value={styles}
                      onChange={handleStylesChange}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        tabSize: 2,
                        automaticLayout: true,
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="seo" className="p-4 h-[calc(100%-45px)] overflow-auto">
                    <div className="max-w-3xl mx-auto">
                      <SEOForm form={form} />
                    </div>
                  </TabsContent>
                </Tabs>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={50} minSize={30}>
                <div className={cn(
                  "h-full p-4",
                  viewport === "mobile" && "max-w-[375px]",
                  viewport === "tablet" && "max-w-[768px]"
                )}>
                  <LivePreview blocks={blocks} styles={styles} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </form>
      </Form>
    </div>
  );
}