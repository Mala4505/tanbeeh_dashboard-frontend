import { createContext, useContext, useState } from 'react'

const FilterContext = createContext()

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) throw new Error('useFilter must be used within FilterProvider')
  return context
}

export const FilterProvider = ({ children }) => {
  const [dateFilter, setDateFilter] = useState(new Date())
  const [roomFilter, setRoomFilter] = useState('')
  const [hizbFilter, setHizbFilter] = useState('')

  return (
    <FilterContext.Provider
      value={{ dateFilter, setDateFilter, roomFilter, setRoomFilter, hizbFilter, setHizbFilter }}
    >
      {children}
    </FilterContext.Provider>
  )
}
