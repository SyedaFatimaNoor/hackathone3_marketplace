// types/products.ts


export interface Product {
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    _id: string;
    name: string;
    _type: "product";
    image?: {
        asset: {
            _ref: string;
            _type: "image";
        }
    };
    price: number;
    description?: string;
}

