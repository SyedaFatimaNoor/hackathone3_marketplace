export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
}
