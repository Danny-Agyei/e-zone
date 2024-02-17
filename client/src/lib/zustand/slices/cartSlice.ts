import {StateCreator} from 'zustand'
import { CartSliceTypes } from '../../../types'

const cartSlice : StateCreator<CartSliceTypes> = ((set) => ({
    cart: [],
    addToCart: (cartItem) => set((state) => ({cart: [...state.cart,cartItem]})),
    removeFromCart: (id) => set((state) => ({cart: state.cart.filter((item => item.id !== id))}))
}))

export default cartSlice;