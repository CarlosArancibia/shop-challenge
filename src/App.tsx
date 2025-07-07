import { useContext } from 'react'
import { products } from './mocks/products.json'
import { filterProducts } from './helpers/filterProducts'
import { FilterContext } from './context/FilterContext'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { Cart } from './components/Cart'

function App() {
  const { filters } = useContext(FilterContext)
  const filteredProducts = filterProducts(products, filters)

  return (
    <div className='bg-slate-800 min-h-screen text-gray-100'>
      <div className='max-w-[900px] m-auto px-3 py-15'>
        <Header />
        <Products filteredProducts={filteredProducts} />
        <Cart />
      </div>
    </div>
  )
}

export default App
