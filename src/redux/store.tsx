import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import search from './search/slice'
import cart from './cart/slice'
import items from './items/slice'
import logForm from './login/slice'
import favorites from './favorites/slice'
import sortnew from './sortnew/slice'
import stocks from './promo/slice'

export const store = configureStore({
  reducer: {
    search,
    cart,
    items,
    logForm,
    favorites,
    sortnew,
    stocks,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
