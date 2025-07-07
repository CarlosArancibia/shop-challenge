import { useContext } from 'react'
import { FilterContext } from '../context/FilterContext'

export const Header = () => {
  const { filters, handleFilter } = useContext(FilterContext)

  return (
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
  )
}
