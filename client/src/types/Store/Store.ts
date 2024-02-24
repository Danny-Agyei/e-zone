export interface ProductType {
  id?: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    brand: string;
    model_name: string;
    sim_card_size: string;
    slug: string;
    inStock: number;
    type: string;
    features: string[];
    hasDiscount: boolean;
    discountPercent: number;
    sizes: {
      size: number;
      price: number;
    }[];
    storage: {
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
    brand: string;
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

// @Cart
export type CartItemType = {
  id: string;
  name: string;
  color: string;
  image: string;
  price: number;
  qty: number;
  size?: string | number;
  inStock: number;
};

export interface CartSliceTypes {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateQty: (info: { id: string; type: "dec" | "inc" }) => void;
  removeFromCart: (id: string) => void;
}

export interface BannerType {
  attributes: {
    heading?: string;
    description?: string;
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
