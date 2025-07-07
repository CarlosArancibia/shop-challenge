import { useReducer } from 'react'
import { CartContext } from './CartContext'
import { type CartProduct, type Product } from '../types'
import { cartReducer } from '../reducers/cart'

interface Props {
  children: React.ReactNode
}

export const CartProvider = ({ children }: Props) => {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const onAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    })
  }

  const onRemoveFromCart = (product: Product | CartProduct) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    })
  }

  const onClearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  return (
    <CartContext.Provider value={{ cart, onAddToCart, onRemoveFromCart, onClearCart }}>
      {children}
    </CartContext.Provider>
  )
}
