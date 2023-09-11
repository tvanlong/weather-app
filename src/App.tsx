import { useEffect, useState } from 'react'
// import { getCity } from './apis/city.api'
// import { useQuery } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import hot from './assets/images/hot.png'
import cold from './assets/images/cold.png'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons/faCloudSun'
import axios from 'axios'
import { WeatherOfCity } from './types/weather.type'

const IMAGES = {
  bgHot: hot,
  bgCold: cold
}

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>(IMAGES.bgHot)
  const [cityName, setCityName] = useState<string>('hanoi')
  const [data, setData] = useState<WeatherOfCity>({
    coord: { lon: 0, lat: 0 },
    weather: [{ id: 0, main: '', description: '', icon: '' }],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: { speed: 0, deg: 0, gust: 0 },
    rain: { '1h': 0 },
    clouds: { all: 0 },
    dt: 0,
    sys: { type: 0, id: 0, country: '', sunrise: 0, sunset: 0 },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  })
  // const { data: cityWeatherData } = useQuery({
  //   queryKey: ['weather', cityName],
  //   queryFn: () => getCity(cityName)
  // })

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=32453de2fa72fdb0da4feeda287b7d6e`)
      .then((res) => {
        const cityNameResponse = (res.data.name as string).toLowerCase()
        if (cityNameResponse !== cityName.toLowerCase()) {
          setCityName(cityNameResponse)
        }
        setData(res.data)
      })
  }, [cityName])

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
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className='w-full h-14 py-3 px-12 bg-[#ffffff2a] placeholder-shown:bg-transparent text-xl text-white placeholder-white font-bold focus:shadow-2xl transition-shadow outline-none rounded-3xl border-white border-4'
          />
          <button className='absolute h-full right-4'>
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
                d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>
        </div>
        <div className='text-white text-5xl font-bold text-center drop-shadow-2xl text-shadow-3xl'>
          {data.name} , {data.sys.country}
        </div>
        <div className='text-white text-xl font-medium text-center drop-shadow-2xl mt-2 mb-5'>
          {new Date().toLocaleString()}
        </div>
        <div className='flex justify-center w-3/5 text-7xl text-white font-bold bg-[#fff6] rounded-3xl border-r-4 border-b-4 border-black px-5 py-10 m-auto'>
          <span className='text-shadow-4xl'>
            {Math.round(data.main.temp - 273.15)}
            <sup className=''> o</sup>C
          </span>
        </div>
        <div className='text-white text-5xl font-bold text-center drop-shadow-2xl text-shadow-3xl mt-8'>
          {data.weather[0].main}
        </div>
        <div className='flex justify-around text-white mt-10'>
          <div className='flex flex-col items-center'>
            <FontAwesomeIcon className='text-lg' icon={faEye} />
            <span className='font-semibold tracking-wider mt-3'>{data.visibility} (m)</span>
          </div>
          <div className='flex flex-col items-center'>
            <FontAwesomeIcon className='text-lg' icon={faWind} />
            <span className='font-semibold tracking-wider mt-3'>{data.wind.speed} (m/s)</span>
          </div>
          <div className='flex flex-col items-center'>
            <FontAwesomeIcon className='text-lg' icon={faCloudSun} />
            <span className='font-semibold tracking-wider mt-3'>100 (%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
