import { CartIcon, ClearCartIcon } from './Icons'
import type { CartProduct } from '../types'
import { useCart } from '../hooks/useCart'

export const Cart = () => {
  const { cart, onAddToCart, onClearCart } = useCart()

  return (
    <>
      <label
        htmlFor='btnCart'
        className='peer fixed top-2 right-4 z-50 bg-blue-500 p-3 rounded-full cursor-pointer'
      >
        <CartIcon />
        <input type='checkbox' id='btnCart' className='hidden peer' />
      </label>
      <div className='hidden peer-has-checked:block fixed inset-0 bg-black/60'></div>
      <aside className='hidden fixed w-80 bg-slate-800 right-0 top-0 bottom-0 peer-has-checked:block z-40 overflow-y-auto no-scrollbar'>
        <ul className='p-5 flex flex-col gap-4'>
          {cart.map((item: CartProduct) => (
            <li key={item.id} className='flex flex-col items-center border-b-1 pb-2 last:border-none gap-2'>
              <img src={item.thumbnail} alt={item.title} className='w-30' />
              <div className='text-center'>
                <strong>{item.title}</strong> - ${item.price}
              </div>
              <footer>
                <small>Qty: {item.quantity}</small>
                <button
                  className='bg-slate-700 px-3 rounded-lg py-1 ml-2 cursor-pointer font-semibold'
                  onClick={() => onAddToCart(item)}
                >
                  +
                </button>
              </footer>
            </li>
          ))}
        </ul>
        <div className='flex justify-center my-10'>
          <button className='bg-slate-700 p-3 rounded-lg cursor-pointer' onClick={onClearCart}>
            <ClearCartIcon />
          </button>
        </div>
      </aside>
    </>
  )
}
