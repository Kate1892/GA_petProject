import { Item, Status } from '../types'

export type FetchSearchItems = {
  searchValue: string
}

export interface SearchSliceState {
  products: Item[]
  status: Status
  searchFormOpen: boolean
  searchValue: string
}
