import { useState } from 'react'
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './components/Icons'
import { products } from './mocks/products.json'
import { filterProducts } from './helpers/filterProducts'
import type { CartProduct } from './types'

function App() {
  const [filters, setFilters] = useState({
    price: 0,
    category: 'all',
  })
  const [cart, setCart] = useState<CartProduct[]>([])

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const filteredProducts = filterProducts(products, filters)

  const onAddToCart = (id: number) => {
    const cartItemIndex = cart.findIndex((prod) => prod.id === id)

    if (cartItemIndex >= 0) {
      // const newCart = cart.map((prod) =>
      //   prod.id === id ? { ...prod, quantity: prod.quantity! + 1 } : prod
      // )

      const item = cart[cartItemIndex]
      const newCart = [
        ...cart.slice(0, cartItemIndex),
        { ...item, quantity: (item.quantity ?? 0) + 1 },
        ...cart.slice(cartItemIndex + 1),
      ]

      setCart(newCart)
    } else {
      const productToAdd = products.find((prod) => prod.id === id)
      if (!productToAdd) return

      setCart([...cart, { ...productToAdd, quantity: 1 }])
    }
  }

  const onClearCart = () => {
    setCart([])
  }

  const onRemoveToCart = (id: number) => {
    setCart((prev) => prev.filter((prev) => prev.id !== id))
  }

  return (
    <div className='bg-slate-800 min-h-screen text-gray-100'>
      <div className='max-w-[900px] m-auto px-3 py-15'>
        <header className='w-full'>
          <h1 className='font-bold text-4xl text-center'>React Shop 🛒</h1>
          <section className='flex flex-col items-center sm:justify-between py-10 sm:flex-row gap-3'>
            <div className='flex gap-3 items-center'>
              <label htmlFor='price'>Precio:</label>
              <input
                type='range'
                name='price'
                id='price'
                min='0'
                max='1000'
                value={filters.price}
                onChange={handleFilter}
                className='cursor-pointer'
              />
              <output>${filters.price}</output>
            </div>
            <div className='flex gap-3 items-center'>
              <label htmlFor='category'>Categories</label>
              <select
                name='category'
                id='category'
                onChange={handleFilter}
                className='bg-slate-800 border rounded-md p-1'
              >
                <option value='all'>All</option>
                <option value='fragrances'>Fragrances</option>
                <option value='furniture'>Furniture</option>
                <option value='groceries'>Groceries</option>
                <option value='beauty'>Beauty</option>
              </select>
            </div>
          </section>
        </header>
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
              {cart.find((prod) => prod.id === product.id) ? (
                <button
                  className='bg-red-700 p-2 rounded-lg font-semibold flex gap-3 justify-center cursor-pointer'
                  onClick={() => onRemoveToCart(product.id)}
                >
                  Remove to cart <RemoveFromCartIcon />
                </button>
              ) : (
                <button
                  className='bg-blue-700 p-2 rounded-lg font-semibold flex gap-3 justify-center cursor-pointer'
                  onClick={() => onAddToCart(product.id)}
                >
                  Add to cart <CartIcon />
                </button>
              )}
            </article>
          ))}
        </main>
        <>
          <label
            htmlFor='btnCart'
            className='peer fixed top-2 right-4 z-50 bg-blue-500 p-3 rounded-full cursor-pointer'
          >
            <CartIcon />
            <input type='checkbox' id='btnCart' className='hidden peer' />
          </label>
          <div className='hidden peer-has-checked:block fixed inset-0 bg-black/60'></div>
          <aside className='hidden fixed w-80 bg-slate-800 right-0 top-0 bottom-0 peer-has-checked:block z-40 overflow-y-auto'>
            <ul className='p-5 flex flex-col gap-4'>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className='flex flex-col items-center border-b-1 pb-2 last:border-none gap-2'
                >
                  <img src={item.thumbnail} alt={item.title} className='w-30' />
                  <div className='text-center'>
                    <strong>{item.title}</strong> - ${item.price}
                  </div>
                  <footer>
                    <small>Qty: {item.quantity}</small>
                    <button
                      className='bg-slate-700 px-3 rounded-lg py-1 ml-2 cursor-pointer font-semibold'
                      onClick={() => onAddToCart(item.id)}
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
      </div>
    </div>
  )
}

export default App
