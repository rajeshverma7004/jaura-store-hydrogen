import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useState} from 'react';
import {QuickView} from './QuickView';
import {quickViewSettings} from '~/settings/quickview.settings';
import {EyeIcon} from '@heroicons/react/24/outline';

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

export function ProductItem({
  product,
  loading,
  quickViewSettings: settings = quickViewSettings,
}: {
  product: any;
  loading?: 'eager' | 'lazy';
  quickViewSettings?: QuickViewSettings;
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const {
    enabled = true,
    buttonPosition = 'bottom-right'
  } = settings;
  
  const buttonPositionClasses: Record<string, string> = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <>
      <div className="product-item w-96 relative group">
        <div className="relative">
          <Link
            key={product.id}
            prefetch="intent"
            to={variantUrl}
          >
            {image && (
              <Image
                alt={image.altText || product.title}
                aspectRatio="1/1"
                data={image}
                loading={loading}
                sizes="(min-width: 450px) 400px, 450px"
                className="w-full"
              />
            )}
          </Link>
          
          {enabled && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className={`absolute ${buttonPositionClasses[buttonPosition]} bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white`}
              aria-label="Quick view"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className='content flex flex-wrap -mx-4'>
          <div className='content-left w-full md:w-2/3 px-4'>
            <h4>{product.title}</h4>
            <small>
              <Money data={product.priceRange.minVariantPrice} />
            </small>
          </div>
          <div className='content-right w-full md:w-1/3 px-4 flex items-center justify-center md:justify-end'>
            {/* Quick View button removed as it's now overlay */}
          </div>
        </div>
      </div>
      
      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        settings={settings}
      />
    </>
  );
}