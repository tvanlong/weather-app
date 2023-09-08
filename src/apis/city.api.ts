import { apiKey } from 'src/constants/apiKey'
import { WeatherOfCity } from 'src/types/weather.type'
import http from 'src/utils/http'

export const getCity = (cityName: string) =>
  http.get<WeatherOfCity>('weather', {
    params: {
      q: cityName,
      appid: apiKey
    }
  })
