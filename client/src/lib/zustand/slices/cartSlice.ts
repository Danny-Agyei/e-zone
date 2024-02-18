import { StateCreator } from "zustand";
import { CartSliceTypes } from "../../../types";

const cartSlice: StateCreator<CartSliceTypes> = (set) => ({
  cart: [],
  addToCart: (cartItem) =>
    set((state) => ({
      cart: state.cart.some(
        (item) => item.name === cartItem.name && item.color === cartItem.color
      )
        ? state.cart.map((item) => {
            return {
              ...item,
              qty: item.inStock !== item.qty ? item.qty + 1 : item.qty,
            };
          })
        : [...state.cart, cartItem],
    })),
  updateQty: (info) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === info.id) {
          return {
            ...item,
            qty:
              info.type === "dec"
                ? item.qty > 1
                  ? item.qty - 1
                  : item.qty
                : item.qty < item.inStock
                ? item.qty + 1
                : item.qty,
          };
        }
        return item;
      }),
    })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
});

export default cartSlice;
