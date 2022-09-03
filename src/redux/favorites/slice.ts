import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../types'
import { FavSliceState } from './types'

const initialState: FavSliceState = {
  items: [],
  favoritesFormOpen: false,
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavItem(state, action: PayloadAction<Item>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
      } else {
        state.items.push({ ...action.payload })
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    setFavoriteFormOpen(state, action: PayloadAction<boolean>) {
      state.favoritesFormOpen = action.payload
    },
  },
})

export const { addFavItem, removeItem, setFavoriteFormOpen } =
  favoritesSlice.actions

export default favoritesSlice.reducer
