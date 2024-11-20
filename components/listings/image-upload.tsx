"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Star, StarOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ImageFile {
  file: File;
  preview: string;
  isCover: boolean;
}

interface ImageUploadProps {
  value: ImageFile[];
  onChange: (files: ImageFile[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ value = [], onChange, maxFiles = 10 }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .slice(0, maxFiles - value.length);

    const newImages: ImageFile[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isCover: value.length === 0 // First image is automatically the cover
    }));

    onChange([...value, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...value];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    
    // If we removed the cover image, set the first image as cover
    if (value[index].isCover && newImages.length > 0) {
      newImages[0].isCover = true;
    }
    
    onChange(newImages);
  };

  const toggleCover = (index: number) => {
    const newImages = value.map((img, i) => ({
      ...img,
      isCover: i === index
    }));
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          dragActive ? "border-primary" : "border-muted",
          value.length >= maxFiles && "pointer-events-none opacity-50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleChange}
          disabled={value.length >= maxFiles}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 mb-2" />
            <p>Drag & drop images here or click to select</p>
            <p className="text-sm">
              {value.length} / {maxFiles} images
            </p>
          </div>
        </label>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {value.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={image.preview}
                alt={`Upload preview ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={() => toggleCover(index)}
                >
                  {image.isCover ? (
                    <Star className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {image.isCover && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Cover Photo
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}