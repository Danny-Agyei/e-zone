import { create } from 'zustand'
import {devtools, persist } from 'zustand/middleware'
import cartSlice from './slices/cartSlice'
import createSelectors from './createSelectors'
import { CartSliceTypes } from '../../types'

export const useBoundStore = create<CartSliceTypes & CartSliceTypes>()(
    devtools(
    persist(
    (...a) => ({
        ...cartSlice(...a),
        ...cartSlice(...a)
      }),
      { name: 'ezone-store' },
        ),
    )
)


const store = createSelectors(useBoundStore);

export default store;