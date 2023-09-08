import { useState } from 'react'
import { getCity } from './apis/city.api'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [cityName, setCityName] = useState('hanoi')

  const { data } = useQuery({
    queryKey: ['weather', cityName],
    queryFn: () => getCity(cityName)
  })

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-300 via-blue-300 to-[#e7f1fa]'>
      <div className='h-3/4 w-2/5 bg-[#f5f5f5] rounded-3xl p-4'></div>
    </div>
  )
}

export default App
