import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Item } from '../types'
import { FetchSearchItems } from './types'

export const fetchSearchItems = createAsyncThunk<Item[], FetchSearchItems>(
  'items/fetchSearchItemsStatus',
  async ({ searchValue }) => {
    console.log(searchValue)

    const search = searchValue ? `search=${searchValue}` : ''

    const { data } = await axios.get<Item[]>(
      `https://62f8bcb83eab3503d1da6b9a.mockapi.io/items?${search}`
    )
    return data
  }
)
