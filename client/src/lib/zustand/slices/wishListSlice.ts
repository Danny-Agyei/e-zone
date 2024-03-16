import { StateCreator } from "zustand";
import { WishListSliceTypes } from "../../../types";

const wishListSlice: StateCreator<WishListSliceTypes> = (set) => ({
  wishList: [],
  addToWishList: (newItem) =>
    set((state) => ({
      wishList: state.wishList.some((item) => item.slug === newItem.slug)
        ? state.wishList.filter((item) => item.slug !== newItem.slug)
        : [...state.wishList, newItem],
    })),
});

export default wishListSlice;
