import { createContext } from 'react'
import type { Filters } from '../types'

interface FilterState {
  filters: Filters
  handleFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const FilterContext = createContext({} as FilterState)
