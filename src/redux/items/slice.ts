import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item, Status } from '../types'
import { fetchItems } from './asyncAction'
import { ItemSliceState } from './types'

const initialState: ItemSliceState = {
  products: [],
  status: Status.LOADING,
  pageNumber: 1,
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Item[]>) {
      state.products = action.payload
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.status = Status.LOADING
      state.products = []
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchItems.rejected, state => {
      state.status = Status.ERROR
      state.products = []
    })
  },
})

export const { setProducts, setPageNumber } = itemsSlice.actions

export default itemsSlice.reducer
