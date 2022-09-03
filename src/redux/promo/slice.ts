import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Status } from '../types'
import { fetchPromos } from './asyncAction'

import { StockSliceState } from './types'

const initialState: StockSliceState = {
  stocks: [],
  status: Status.LOADING,
}

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPromos.pending, state => {
      state.status = Status.LOADING
      state.stocks = []
    })
    builder.addCase(fetchPromos.fulfilled, (state, action) => {
      state.stocks = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPromos.rejected, state => {
      state.status = Status.ERROR
      state.stocks = []
    })
  },
})

export const {} = stocksSlice.actions

export default stocksSlice.reducer
