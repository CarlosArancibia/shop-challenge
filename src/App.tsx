import { useState } from 'react'
import { CartIcon } from './components/Icons'
import { products } from './mocks/products.json'
import { filterProducts } from './helpers/filterProducts'

function App() {
  const [filters, setFilters] = useState({
    price: 0,
    category: 'all',
  })

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const filteredProducts = filterProducts(products, filters)

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
              <button className='bg-blue-700 p-2 rounded-lg font-semibold flex gap-3 justify-center cursor-pointer'>
                Add to cart <CartIcon />
              </button>
            </article>
          ))}
        </main>
        <>
          <label
            htmlFor='btnCart'
            className='peer fixed top-2 right-2 z-50 bg-blue-500 p-3 rounded-full cursor-pointer'
          >
            <CartIcon />
            <input type='checkbox' id='btnCart' className='hidden peer' />
          </label>
          <aside className='hidden fixed min-w-80 bg-slate-800 right-0 top-0 bottom-0 peer-has-checked:block z-40'></aside>
          <div className='hidden peer-has-checked:block fixed inset-0 bg-black/60'></div>
        </>
      </div>
    </div>
  )
}

export default App
