export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  image?: {
    url: string;
    _ref: string;
    _type: string;
  };
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
}
