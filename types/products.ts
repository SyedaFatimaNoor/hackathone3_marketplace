// types/products.ts

export interface SanityImage {
    url?: string;
    _ref?: string;
    _type: "image";
}

export function isValidImage(image: any): image is SanityImage {
    return image && (typeof image === 'string' || 
        (typeof image === 'object' && 
         (image.url || image._ref) && 
         image._type === 'image'));
}

export interface Product {
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    _id: string;
    name: string;
    _type: "product";
    image?: SanityImage | string;
    price: number;
    description?: string;
    category?: string | null;
}
