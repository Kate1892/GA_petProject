import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Item } from '../types'
import { FetchItems } from './types'

export const fetchItems = createAsyncThunk<Item[], FetchItems>(
  'items/fetchItemsStatus',
  async ({ pageNumber }) => {
    const { data } = await axios.get<Item[]>(
      `https://62f8bcb83eab3503d1da6b9a.mockapi.io/items?page=${pageNumber}&newProduct=1&type=product&limit=4`
    )
    return data
  }
)
