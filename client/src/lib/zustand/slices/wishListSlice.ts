import { StateCreator } from "zustand";
import { WishListSliceTypes } from "../../../types";

const wishListSlice: StateCreator<WishListSliceTypes> = (set) => ({
  wishList: [],
  addToWishList: (sliceItem) =>
    set((state) => ({
      wishList: state.wishList.some(
        (item) => item.name === sliceItem.name && item.color === sliceItem.color
      )
        ? state.wishList.map((item) => {
            return {
              ...item,
              qty: item.inStock !== item.qty ? item.qty + 1 : item.qty,
            };
          })
        : [...state.wishList, sliceItem],
    })),
  removeFromWishList: (id) =>
    set((state) => ({
      wishList: state.wishList.filter((item) => item.id !== id),
    })),
});

export default wishListSlice;
