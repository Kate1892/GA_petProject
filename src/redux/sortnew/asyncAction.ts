import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Item } from '../types'
import { Filters } from './types'

export const fetchItems = createAsyncThunk<Item[], Filters>(
  'items/fetchItemsStatus',
  async ({ sortBy, brand, onlyInGA }) => {
    const order = sortBy.includes('-') ? 'desc' : 'asc'
    const sID = sortBy.replace('-', '')

    const sort = sortBy ? `sortBy=${sID}` : ''
    const brandList = brand ? `search=${brand}` : ''
    const onlyGA = onlyInGA ? `onlyInGA=1` : ''

    const { data } = await axios.get<Item[]>(
      `https://62f8bcb83eab3503d1da6b9a.mockapi.io/items?${brandList}&${sort}&order=${order}&${onlyGA}&newProduct=1`
    )

    return data
  }
)
