import { createAsyncThunk } from '@reduxjs/toolkit'
import { StockItem } from './types'
import axios from 'axios'

export const fetchPromos = createAsyncThunk<StockItem[]>(
  'promos/fetchPromosStatus',
  async () => {
    const { data } = await axios.get<StockItem[]>(
      `https://630a2e8e32499100328201a2.mockapi.io/promo`
    )
    return data
  }
)
