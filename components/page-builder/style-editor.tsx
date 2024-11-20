"use client";

import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface StyleEditorProps {
  styles: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  onChange: (viewport: "desktop" | "tablet" | "mobile", styles: string) => void;
}

export function StyleEditor({ styles, onChange }: StyleEditorProps) {
  return (
    <Card className="h-full flex flex-col">
      <Tabs defaultValue="desktop" className="flex-1">
        <div className="border-b p-4">
          <TabsList>
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="tablet">Tablet</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="desktop" className="flex-1 p-0 m-0">
          <Editor
            height="100%"
            defaultLanguage="css"
            theme="vs-dark"
            value={styles.desktop}
            onChange={(value) => onChange("desktop", value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
            }}
          />
        </TabsContent>

        <TabsContent value="tablet" className="flex-1 p-0 m-0">
          <Editor
            height="100%"
            defaultLanguage="css"
            theme="vs-dark"
            value={styles.tablet}
            onChange={(value) => onChange("tablet", value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
            }}
          />
        </TabsContent>

        <TabsContent value="mobile" className="flex-1 p-0 m-0">
          <Editor
            height="100%"
            defaultLanguage="css"
            theme="vs-dark"
            value={styles.mobile}
            onChange={(value) => onChange("mobile", value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
            }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}