// app/settings/quickview.settings.ts
export interface QuickViewSettings {
  enabled: boolean;
  buttonPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  typography: {
    title: string;
    price: string;
    button: string;
  };
  elementOrder: Array<'images' | 'title' | 'price' | 'variants' | 'addToCart'>;
  popup?: {
    maxWidth: string;
    padding: string;
    borderRadius: string;
  };
}

export const quickViewSettings: QuickViewSettings = {
  enabled: true,
  buttonPosition: 'bottom-right',
  typography: {
    title: 'text-2xl md:text-3xl',
    price: 'text-xl md:text-2xl',
    button: 'text-base md:text-lg'
  },
  elementOrder: ['images', 'title', 'price', 'variants', 'addToCart'],
  popup: {
    maxWidth: 'max-w-4xl',
    padding: 'p-6',
    borderRadius: 'rounded-2xl'
  }
};