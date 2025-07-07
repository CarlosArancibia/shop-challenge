import type { CartProduct, Product } from '../types'
import { CartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

interface Props {
  filteredProducts: Product[]
}

export const Products = ({ filteredProducts }: Props) => {
  const { cart, onAddToCart, onRemoveFromCart } = useCart()

  return (
    <main
      className='grid gap-4 w-full'
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}
    >
      {filteredProducts.map((product) => (
        <article key={product.id} className='flex flex-col gap-3'>
          <img src={product.thumbnail} alt={product.description} />
          <div>
            <h3 className='overflow-hidden text-nowrap text-ellipsis'>{product.title}</h3>
            <span>${product.price}</span>
          </div>
          {cart.find((prod: CartProduct) => prod.id === product.id) ? (
            <button
              className='bg-red-700 p-2 rounded-lg font-semibold flex gap-3 justify-center cursor-pointer'
              onClick={() => onRemoveFromCart(product)}
            >
              Remove to cart <RemoveFromCartIcon />
            </button>
          ) : (
            <button
              className='bg-blue-700 p-2 rounded-lg font-semibold flex gap-3 justify-center cursor-pointer'
              onClick={() => onAddToCart(product)}
            >
              Add to cart <CartIcon />
            </button>
          )}
        </article>
      ))}
    </main>
  )
}
