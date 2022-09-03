import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartItem, CartSliceState } from './types'

const getCartLS = () => {
  const cartsLS = localStorage.getItem('cart')
  const items = cartsLS ? JSON.parse(cartsLS) : []
  const totalPrice = calcTotalPrice(items)

  return {
    items: items as CartItem[],
    totalPrice,
  }
}

const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

//
const { items, totalPrice } = getCartLS()

const initialState: CartSliceState = {
  items,
  totalPrice,
  cartFormOpen: false,
  itemDel: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    setCartFormOpen(state, action: PayloadAction<boolean>) {
      state.cartFormOpen = action.payload
    },
    setItemDel(state, action: PayloadAction<boolean>) {
      state.itemDel = action.payload
    },
  },
})

export const { addItem, removeItem, minusItem, setCartFormOpen, setItemDel } =
  cartSlice.actions

export default cartSlice.reducer
