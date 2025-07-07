import { useState } from 'react'
import { FilterContext } from './FilterContext'

interface Props {
  children: React.ReactNode
}

export const FilterProvider = ({ children }: Props) => {
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

  return <FilterContext.Provider value={{ filters, handleFilter }}>{children}</FilterContext.Provider>
}
