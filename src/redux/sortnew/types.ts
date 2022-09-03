import { Item, Status } from '../types'

export enum SORT {
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  DISCOUNT_DESC = '-discount',
  DEFAULT = '',
}

export interface SortSliceState {
  items: Item[]
  status: Status
  sortBy: SORT
  brand: string
  onlyInGA: string
}

export type Filters = {
  sortBy: SORT
  brand: string
  onlyInGA: string
}
