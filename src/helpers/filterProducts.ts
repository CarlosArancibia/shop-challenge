import type { Filters, Product } from '../types'

export const filterProducts = (products: Product[], filter: Filters) =>
  products.filter(
    (prod) => prod.price >= filter.price && (filter.category === 'all' || prod.category === filter.category)
  )
