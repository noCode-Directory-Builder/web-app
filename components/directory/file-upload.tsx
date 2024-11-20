"use client";

import { ChangeEvent, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  value?: File[];
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

export function FileUpload({
  onChange,
  value = [],
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
}: FileUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(null);

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setError(`File ${file.name} exceeds ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      // Create object URLs for previews
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
      
      // Update form with new files
      onChange(multiple ? [...value, ...validFiles] : [validFiles[0]]);
    }
  };

  const handleRemove = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = value.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            {multiple ? "Upload files" : "Upload a file"}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </label>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}