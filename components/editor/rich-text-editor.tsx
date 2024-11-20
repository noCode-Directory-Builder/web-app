"use client";

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Table as TableIcon,
  Undo,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function RichTextEditor({ content, onChange, className }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'html'>('visual');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  const handleHTMLChange = (html: string) => {
    editor.commands.setContent(html);
    onChange(html);
  };

  return (
    <div className={cn("border rounded-lg bg-background", className)}>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'visual' | 'html')}>
        <div className="border-b bg-muted p-2 flex justify-between items-center flex-wrap gap-2">
          <div className="flex flex-wrap gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(editor.isActive('bold') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(editor.isActive('italic') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(editor.isActive('strike') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={cn(editor.isActive('heading', { level: 1 }) && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={cn(editor.isActive('heading', { level: 2 }) && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={cn(editor.isActive('heading', { level: 3 }) && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Heading3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(editor.isActive('bulletList') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(editor.isActive('orderedList') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(editor.isActive('blockquote') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addLink}
              className={cn(editor.isActive('link') && 'bg-accent')}
              disabled={activeTab === 'html'}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addImage}
              disabled={activeTab === 'html'}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addTable}
              disabled={activeTab === 'html'}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={activeTab === 'html'}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={activeTab === 'html'}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <TabsList className="h-9">
            <TabsTrigger value="visual" className="text-xs">
              Visual
            </TabsTrigger>
            <TabsTrigger value="html" className="text-xs">
              <Code className="h-4 w-4 mr-1" />
              HTML
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="visual" className="mt-0">
          <EditorContent 
            editor={editor} 
            className="prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none min-h-[200px]"
          />
        </TabsContent>

        <TabsContent value="html" className="mt-0">
          <Textarea
            value={editor.getHTML()}
            onChange={(e) => handleHTMLChange(e.target.value)}
            className="font-mono text-sm p-4 min-h-[200px] bg-background resize-none border-0 focus-visible:ring-0"
            spellCheck={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}