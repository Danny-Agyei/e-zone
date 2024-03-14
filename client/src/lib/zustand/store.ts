import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import cartSlice from "./slices/cartSlice";
import wishListSlice from "./slices/wishListSlice";
import createSelectors from "./createSelectors";
import { CartSliceTypes, WishListSliceTypes } from "../../types";

export const useBoundStore = create<CartSliceTypes & WishListSliceTypes>()(
  devtools(
    persist(
      (...a) => ({
        ...cartSlice(...a),
        ...wishListSlice(...a),
      }),
      { name: "ezone-store" }
    )
  )
);

const store = createSelectors(useBoundStore);

export default store;
