import { useState } from 'react'
import { getCity } from './apis/city.api'
import { useQuery } from '@tanstack/react-query'
import hot from './assets/images/hot.png'
import cold from './assets/images/cold.png'

const IMAGES = {
  bgHot: hot,
  bgCold: cold
}

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>(IMAGES.bgHot)
  const [cityName, setCityName] = useState<string>('hanoi')
  const { data } = useQuery({
    queryKey: ['weather', cityName],
    queryFn: () => getCity(cityName)
  })

  return (
    <div
      className='flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center'
      style={{
        background:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(' +
          backgroundImage +
          ') no-repeat center/cover'
      }}
    >
      <div
        className='h-3/4 bg-[#f5f5f5] rounded-3xl px-6 py-8 bg-no-repeat bg-center bg-cover min-w-[500px]'
        style={{ backgroundImage: 'url(' + backgroundImage + ')' }}
      >
        <div className='w-full relative mb-12'>
          <button className='absolute h-full left-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3}
              stroke='currentColor'
              className='w-6 h-6 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
          <input
            type='text'
            placeholder='Search'
            className='w-full h-14 py-3 px-12 bg-transparent text-xl text-white placeholder-white font-bold focus:shadow-2xl transition-shadow outline-none rounded-3xl border-white border-4'
          />
        </div>
        <div className='text-white text-5xl font-bold text-center drop-shadow-2xl text-shadow-3xl'>Hanoi , VN</div>
        <div className='text-white text-xl font-medium text-center drop-shadow-2xl mt-2 mb-5'>9/9/2023, 9:34:14 PM</div>
        <div className='flex justify-center w-3/5 text-7xl text-white font-bold bg-[#fff6] rounded-3xl border-r-4 border-b-4 border-black px-5 py-10 m-auto'>
          <span className='text-shadow-4xl'>
            28
            <sup className=''> o</sup>C
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
