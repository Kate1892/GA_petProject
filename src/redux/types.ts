export type Item = {
  id: string
  name: string
  description: string
  discount: number
  price: number
  mainImageURL: string
  brand: string
  newProduct: number
  onlyInGA: number
}

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}
