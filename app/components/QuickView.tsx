// app/components/QuickView.tsx
import {useState, useEffect, Fragment} from 'react';
import type {FC} from 'react';
import {
  ProductPrice,
} from '@shopify/hydrogen-react';
import {Dialog, Transition} from '@headlessui/react';
import {ChevronLeftIcon, ChevronRightIcon, XMarkIcon} from '@heroicons/react/24/outline';
import type {Product, ProductVariant, ProductOption} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

interface Typography {
  title?: string;
  price?: string;
  button?: string;
}

interface QuickViewSettings {
  enabled?: boolean;
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  typography?: Typography;
  elementOrder?: Array<'images' | 'title' | 'price' | 'variants' | 'addToCart'>;
}

interface QuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  settings?: QuickViewSettings;
}

export const QuickView: FC<QuickViewProps> = ({
  product,
  isOpen,
  onClose,
  settings = {}
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const {open} = useAside();
  
  const {
    enabled = true,
    buttonPosition = 'bottom-right',
    typography = {
      title: 'text-2xl',
      price: 'text-xl',
      button: 'text-base'
    },
    elementOrder = ['images', 'title', 'price', 'variants', 'addToCart']
  } = settings;

  useEffect(() => {
    if (product?.variants?.nodes?.[0]) {
      const firstVariant = product.variants.nodes[0] as ProductVariant;
      setSelectedVariant(firstVariant);
      // Initialize selected options from the first variant
      const options: Record<string, string> = {};
      firstVariant.selectedOptions.forEach(option => {
        options[option.name] = option.value;
      });
      setSelectedOptions(options);
    }
  }, [product]);

  if (!enabled || !product) return null;

  const images = product.images?.nodes || [];
  
  const handlePrevImage = (): void => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (): void => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const renderElement = (elementType: string): JSX.Element | null => {
    switch(elementType) {
      case 'images':
        return (
          <div key="images" className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {images.length > 0 && (
              <>
                <img
                  src={images[currentImageIndex]?.url}
                  alt={images[currentImageIndex]?.altText || product.title}
                  className="w-full h-full object-contain"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex ? 'bg-gray-800' : 'bg-gray-400'
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      
      case 'title':
        return (
          <h2 key="title" className={`font-bold ${typography.title}`}>
            {product.title}
          </h2>
        );
      
      case 'price':
        return (
          <div key="price" className={`font-semibold ${typography.price}`}>
            {selectedVariant && (
              <ProductPrice
                data={product}
                variantId={selectedVariant.id}
              />
            )}
          </div>
        );
      
      case 'variants':
        return (
          <VariantPicker
            key="variants"
            product={product}
            selectedOptions={selectedOptions}
            onOptionChange={(optionName, optionValue) => {
              const newSelectedOptions = { ...selectedOptions, [optionName]: optionValue };
              setSelectedOptions(newSelectedOptions);
              
              // Find the variant that matches all selected options
              const matchingVariant = product.variants.nodes.find((variant: any) =>
                variant.selectedOptions.every((option: any) =>
                  newSelectedOptions[option.name] === option.value
                )
              ) as ProductVariant | undefined;
              
              if (matchingVariant) {
                setSelectedVariant(matchingVariant);
              }
            }}
          />
        );
      
      case 'addToCart':
        return (
          <AddToCartButton
            key="addToCart"
            disabled={!selectedVariant?.availableForSale}
            onClick={() => {
              open('cart');
              onClose(); // Close the quick view after adding to cart
            }}
            lines={
              selectedVariant
                ? [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                      selectedVariant,
                    },
                  ]
                : []
            }
            className={`w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors ${typography.button}`}
          >
            {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          </AddToCartButton>
        );
      
      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-amber-50 p-6 text-left align-middle shadow-xl transition-all">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                aria-label="Close quick view"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {elementOrder.slice(0, Math.ceil(elementOrder.length / 2)).map(renderElement)}
                </div>
                <div className="space-y-4">
                  {elementOrder.slice(Math.ceil(elementOrder.length / 2)).map(renderElement)}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

interface VariantPickerProps {
  product: Product;
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, optionValue: string) => void;
}

const VariantPicker: FC<VariantPickerProps> = ({
  product,
  selectedOptions,
  onOptionChange
}) => {
  const options = product.options || [];
  
  // Function to get CSS color from color name
  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'white': '#ffffff',
      'black': '#000000',
      'gray': '#808080',
      'grey': '#808080',
      'red': '#ff0000',
      'green': '#008000',
      'blue': '#0000ff',
      'yellow': '#ffff00',
      'orange': '#ffa500',
      'purple': '#800080',
      'pink': '#ffc0cb',
      'brown': '#a52a2a',
      'beige': '#f5f5dc',
      'navy': '#000080',
      'maroon': '#800000',
      'olive': '#808000',
      'lime': '#00ff00',
      'aqua': '#00ffff',
      'teal': '#008080',
      'silver': '#c0c0c0',
      'gold': '#ffd700'
    };
    
    const lowerColor = colorName.toLowerCase();
    return colorMap[lowerColor] || '#cccccc'; // Default to light gray if color not found
  };
  
  const isColorOption = (optionName: string): boolean => {
    return optionName.toLowerCase().includes('color');
  };
  
  return (
    <div className="space-y-4">
      {options.map((option: ProductOption) => (
        <div key={option.id}>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {option.name === 'Color' ? 'Colors' : option.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value: string) => {
              // Check if there's a variant that has this option value along with all other selected options
              const testOptions = { ...selectedOptions, [option.name]: value };
              const variant = product.variants.nodes.find((v: any) =>
                v.selectedOptions.every((o: any) => testOptions[o.name] === o.value)
              ) as ProductVariant | undefined;
              
              const isSelected = selectedOptions[option.name] === value;
              
              if (isColorOption(option.name)) {
                // Render color swatches for color options
                return (
                  <button
                    key={value}
                    onClick={() => onOptionChange(option.name, value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${!variant?.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: getColorValue(value) }}
                    disabled={!variant?.availableForSale}
                    title={value}
                    aria-label={`Select ${value} color`}
                  />
                );
              } else {
                // Render text buttons for non-color options
                return (
                  <button
                    key={value}
                    onClick={() => onOptionChange(option.name, value)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${!variant?.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!variant?.availableForSale}
                  >
                    {value}
                  </button>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};