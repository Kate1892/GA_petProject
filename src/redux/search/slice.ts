import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item, Status } from '../types'
import { fetchSearchItems } from './asyncAction'
import { SearchSliceState } from './types'

const initialState: SearchSliceState = {
  products: [],
  status: Status.LOADING,
  searchFormOpen: false,
  searchValue: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchFormOpen(state, action: PayloadAction<boolean>) {
      state.searchFormOpen = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchItems.pending, state => {
      state.status = Status.LOADING
      state.products = []
    })
    builder.addCase(fetchSearchItems.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchSearchItems.rejected, state => {
      state.status = Status.ERROR
      state.products = []
    })
  },
})

export const { setSearchValue, setSearchFormOpen } = searchSlice.actions

export default searchSlice.reducer
