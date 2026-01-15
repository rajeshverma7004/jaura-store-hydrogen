// app/components/ColorFilteredGallery.tsx
import {useState, useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';
import type {Product, ProductVariant, Image} from '@shopify/hydrogen/storefront-api-types';

interface ColorFilteredGalleryProps {
  product: any;
  selectedVariant: any;
}

export const ColorFilteredGallery: FC<ColorFilteredGalleryProps> = ({
  product,
  selectedVariant
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);

  // Get color from selected variant
  const selectedColor = useMemo<string | null>(() => {
    if (!selectedVariant) return null;
    const colorOption = selectedVariant.selectedOptions?.find(
      (option: any) => option.name.toLowerCase() === 'color'
    );
    return colorOption?.value || null;
  }, [selectedVariant]);

  // Filter images based on selected color
  useEffect(() => {
    if (!product.images?.nodes) {
      setFilteredImages([]);
      return;
    }

    let images: Image[] = product.images.nodes as Image[];

    // Filter images by color if color is selected
    if (selectedColor) {
      images = images.filter((image: Image) => {
        // Check if image altText contains the color
        const altText = image.altText?.toLowerCase() || '';
        return altText.includes(selectedColor.toLowerCase());
      });
      
      // If no images match the color, show variant image
      if (images.length === 0 && selectedVariant?.image) {
        images = [selectedVariant.image as Image];
      }
    }

    setFilteredImages(images);
    setCurrentImageIndex(0); // Reset to first image when filter changes
  }, [selectedColor, product.images, selectedVariant]);

  const handlePrevImage = (): void => {
    setCurrentImageIndex(prev => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (): void => {
    setCurrentImageIndex(prev => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  if (filteredImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={filteredImages[currentImageIndex]?.url}
          alt={filteredImages[currentImageIndex]?.altText || product.title}
          className="w-full h-full object-contain"
        />
        
        {/* Navigation Arrows */}
        {filteredImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-md"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {filteredImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
          {filteredImages.map((image: Image, idx: number) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(idx)}
              className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                idx === currentImageIndex 
                  ? 'border-black' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={image.url}
                alt={image.altText || `${product.title} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Color indicator */}
      {selectedColor && (
        <div className="text-sm text-gray-600">
          Showing images for: <span className="font-medium">{selectedColor}</span>
        </div>
      )}
    </div>
  );
};