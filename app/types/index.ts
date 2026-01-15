// app/types/index.ts
export interface SelectedOption {
  name: string;
  value: string;
}

export interface Price {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductVariantNode {
  id: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  image: ProductImage | null;
  price: Price;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

// Re-export types from Shopify if needed
export type {
  Product,
  ProductVariant,
  Collection,
  Image,
} from '@shopify/hydrogen/storefront-api-types';