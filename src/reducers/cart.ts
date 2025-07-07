import type { CartProduct, Product } from '../types'

interface Action {
  type: string
  payload?: Product | CartProduct
}

export const cartReducer = (state: CartProduct[], action: Action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload
      if (!product) return state

      const cartItemIndex = state.findIndex((item) => item.id === product.id)

      const item = state[cartItemIndex]

      if (cartItemIndex >= 0) {
        return [
          ...state.slice(0, cartItemIndex),
          { ...item, quantity: item.quantity + 1 },
          ...state.slice(cartItemIndex + 1),
        ]
      }

      return [...state, { ...product, quantity: 1 }]
    }

    case 'REMOVE_FROM_CART': {
      return state.filter((item) => item.id !== action.payload?.id)
    }

    case 'CLEAR_CART': {
      return []
    }
  }

  return state
}
