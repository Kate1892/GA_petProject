import { Status } from '../types'

export type StockItem = {
  id: string
  name: string
  description: string
  dates: string
  mainImageURL: string
}

export interface StockSliceState {
  stocks: StockItem[]
  status: Status
}
