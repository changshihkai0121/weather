import { Main, Weather, Clouds, Wind, Sys } from "@/store/types/weatherType";
export interface CityCoord {
  lon: number;
  lat: number;
}

export interface City {
  id: number;
  name: string;
  corrd: CityCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherList {
  dt: number;
  main: Main;
  weather: Weather;
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface CurrentWeatherList {
  cod: string;
  message: number;
  cnt: number;
  city: City;
  list: Array<WeatherList>;
}
