import { Item, Status } from '../types'

export interface ItemSliceState {
  products: Item[]
  status: Status
  pageNumber: number
}

export type FetchItems = {
  pageNumber: number
}
