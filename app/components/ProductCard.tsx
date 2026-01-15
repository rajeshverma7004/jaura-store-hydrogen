// app/components/ProductCard.tsx
import {useState} from 'react';
import type {FC} from 'react';
import {Link} from 'react-router';
import {QuickView} from './QuickView';
import {EyeIcon} from '@heroicons/react/24/outline';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

interface QuickViewSettings {
  enabled?: boolean;
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  typography?: {
    title?: string;
    price?: string;
    button?: string;
  };
  elementOrder?: Array<'images' | 'title' | 'price' | 'variants' | 'addToCart'>;
}

interface ProductCardProps {
  product: Product;
  quickViewSettings?: QuickViewSettings;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  quickViewSettings = {}
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);
  
  const {
    enabled = true,
    buttonPosition = 'bottom-right'
  } = quickViewSettings;
  
  const buttonPositionClasses: Record<string, string> = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <>
      <div className="relative group">
        <Link to={`/products/${product.handle}`}>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.featuredImage?.url}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.priceRange?.minVariantPrice?.amount} {product.priceRange?.minVariantPrice?.currencyCode}
            </p>
          </div>
        </Link>
        
        {enabled && (
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className={`absolute ${buttonPositionClasses[buttonPosition]} bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white`}
            aria-label="Quick view"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        settings={quickViewSettings}
      /> */}
    </>
  );
};