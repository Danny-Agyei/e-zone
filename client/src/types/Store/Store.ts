export interface ProductType {
  id?: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    slug: string;
    inStock: number;
    type: string;
    features: string[];
    hasDiscount: boolean;
    discountPercent: number;
    sizes:
     {
      size: number;
      price: number;
    }[];
    storage:
      {
          capacity: string;
          price: number;
        }[];
    variants: {
      images: string[];
      details: string;
      colorCode: string;
      colorName: string;
    }[];
    sub_category: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    categories: {
      data: {
        attributes: {
          title: string;
          description: string;
        };
      }[];
    };
  };
}

export interface ProductCardType {
  attributes: {
    name: string;
    price: number;
    slug: string;
    hasDiscount: boolean;
    discountPercent: number;
    categories: {
      data: {
        attributes: {
          title: string;
          description: string;
        };
      }[];
    };
    variants: {
      images: string[];
      details: string;
      colorCode: string;
      colorName: string;
    }[];
  };
}

export type CartItemType = {
  id: string;
  name: string;
  color: string;
  image: string;
  price: number;
  qty: number;
  stock: number;
};

export interface BannerType {
  attributes: {
    heading: string;
    description: string;
    type: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}
