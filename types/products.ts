export interface SanityImageObject {
  _type: string;
  _ref?: string;
  asset?: {
    _ref?: string;
    _type: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string | SanityImageObject | null;
  category: string;
  description: string;
}

export function isValidImage(image: any): boolean {
  // Check if it's a non-empty string
  if (typeof image === 'string') {
    return image.trim() !== '';
  }

  // Check if it's a Sanity image object
  if (typeof image === 'object' && image !== null) {
    return !!(
      image._ref || 
      (image.asset && image.asset._ref)
    );
  }

  return false;
}