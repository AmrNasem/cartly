"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductImageForm } from "@/lib/types/product.types";
import { MAX_IMGS_ALLOWED } from "@/lib/utils/constants";
import { GripVertical, ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { memo, useState } from "react";

function Media({
  images,
  addImages,
  isValid,
  removeImage
}: {
  images: ProductImageForm[];
    addImages: (files: File[] | null) => void;
  isValid: boolean;
    removeImage: (index: number) => void;
}) {
  const [, setIsDragging] = useState(false);

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDragEnter(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addImages(droppedFiles);
  }

  return (
    <Card className={!isValid ? "border-destructive bg-red-50" : ""}>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Media <span className="text-destructive">*</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          className="rounded-lg border border-dashed border-black/15 bg-muted/40 px-3 py-4 text-center text-xs text-muted-foreground"
        >
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
            <ImagePlus className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">
            Drag and drop images here, or click to browse
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            JPG, PNG, AVIF, or WebP. Recommended aspect ratio 16 : 9
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <label
              htmlFor="upload"
              className="font-semibold text-xs py-2 px-3 cursor-pointer rounded-md text-white bg-primary duration-150 hover:bg-primary/90"
            >
              {/* TODO: Wire to real file picker and upload flow */}
              Upload images
            </label>
            <input
              onChange={(e) =>
                addImages(e.target.files ? Array.from(e.target.files) : null)
              }
              type="file"
              id="upload"
              hidden
              multiple
              accept="image/jpeg image/jpg image/png image/avif image/webp"
            />
          </div>
        </div>

        {images.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-muted-foreground">
              Thumbnails{" "}
              <span
                className={
                  images.length === 0 || images.length > MAX_IMGS_ALLOWED
                    ? "text-red-500"
                    : ""
                }
              >
                ({images.length} of 8 images)
              </span>
            </p>
            <ul className="space-y-2">
              {images.map((image, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 rounded-md border border-black/5 bg-background px-2 py-2 text-xs"
                >
                  <button
                    type="button"
                    className="mt-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-dashed border-black/10 bg-muted/60 text-muted-foreground"
                    aria-label="Reorder"
                  >
                    <GripVertical className="h-3 w-3" />
                  </button>
                  <div className="flex flex-1 items-start gap-2">
                    {/* Thumbnail Here */}
                    <div className="relative aspect-video w-22 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={URL.createObjectURL(image.file)}
                        alt={`image ${index + 1}`}
                        className="object-cover block w-full h-full"
                        fill
                        onLoad={(e) =>
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex flex-col">
                          <span className="line-clamp-2 text-[11px] font-medium">
                            {image.file.name}
                          </span>
                          {image.order === 1 && (
                            <span className="font-semibold text-[11px] text-muted-foreground">
                              (Main)
                            </span>
                          )}
                        </div>
                        <span className="text-nowrap text-[10px] text-muted-foreground">
                          Order #{image.order}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-black/10 bg-background text-muted-foreground hover:bg-destructive/5 hover:text-destructive"
                    onClick={() => removeImage(index)}
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!isValid && (
          <p className="text-[11px] text-destructive text-center">
            You should upload images between 1 - {MAX_IMGS_ALLOWED}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(Media);
