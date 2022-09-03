export type CartItem = {
  id: string
  name: string
  description: string
  discount: number
  price: number
  mainImageURL: string
  count: number
}

export interface CartSliceState {
  items: CartItem[]
  totalPrice: number
  cartFormOpen: boolean
  itemDel: boolean
}
