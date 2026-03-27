"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => new Set(prev).add(imageId));
  };

  const selectedImage = images[selectedIndex];
  const hasError = selectedImage ? imageErrors.has(selectedImage.id) : true;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnail strip */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 md:pb-0 md:pr-2">
        {images.map((image, index) => {
          const thumbError = imageErrors.has(image.id);
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`
                relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all
                ${index === selectedIndex ? "border-dark-900" : "border-light-300 hover:border-dark-500"}
              `}
              aria-label={`View ${image.alt}`}
              aria-current={index === selectedIndex ? "true" : undefined}
            >
              {thumbError ? (
                <div className="w-full h-full flex items-center justify-center bg-light-200">
                  <ImageOff className="w-5 h-5 text-dark-500" aria-hidden="true" />
                </div>
              ) : (
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() => handleImageError(image.id)}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-square md:aspect-[4/3] rounded-xl overflow-hidden bg-light-200">
        {hasError || !selectedImage ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <ImageOff className="w-16 h-16 text-dark-500" aria-hidden="true" />
            <span className="text-caption text-dark-500">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            onError={() => handleImageError(selectedImage.id)}
          />
        )}
      </div>
    </div>
  );
}
