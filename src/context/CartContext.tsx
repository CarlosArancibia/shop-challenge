import { createContext } from 'react'
import type { CartProduct, Product } from '../types'

interface Context {
  cart: CartProduct[]
  onAddToCart: (product: Product | CartProduct) => void
  onRemoveFromCart: (product: Product | CartProduct) => void
  onClearCart: () => void
}

export const CartContext = createContext<Context | undefined>(undefined)
