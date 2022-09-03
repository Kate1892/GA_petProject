import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item, Status } from '../types'
import { fetchItems } from './asyncAction'
import { Filters, SORT, SortSliceState } from './types'

const initialState: SortSliceState = {
  items: [],
  status: Status.LOADING,
  sortBy: SORT.DEFAULT,
  brand: '',
  onlyInGA: '',
}

export const sortnewSlice = createSlice({
  name: 'sortnew',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload
    },
    setSortID(state, action: PayloadAction<SORT>) {
      state.sortBy = action.payload
    },
    setBrand(state, action: PayloadAction<string>) {
      state.brand = action.payload
    },
    setOnlyGA(state, action: PayloadAction<string>) {
      state.onlyInGA = action.payload
    },
    setFilters(state, action: PayloadAction<Filters>) {
      state.sortBy = action.payload.sortBy
      state.brand = action.payload.brand
      state.onlyInGA = action.payload.onlyInGA
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchItems.rejected, state => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { setItems, setSortID, setBrand, setOnlyGA, setFilters } =
  sortnewSlice.actions

export default sortnewSlice.reducer
