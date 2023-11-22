import React from 'react'
import { useState } from 'react'

export const WheatherApp = () => {
  
  const [city, setCity] = useState('')
  const [dataWeather, setDataWeather] = useState(null)
  
  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(city.length > 0 ) fetchClima()
  }

  const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
  const API_KEY = '2ac0ebc3cb1ed365070a98a3f2ae6d3d';
  const difKelvin = 273.15;

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      setDataWeather(data);
    }catch(error){
      console.error('ocurrio un problema: ', error)
    }
  }


  return (
    <>
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleCityChange}/>
        <button type="submit">Buscar</button>
      </form>
      {
        dataWeather &&  (
          <div>
            <h2>{dataWeather.name}</h2>
            <p>Temperatura: {parseInt(dataWeather?.main.temp - difKelvin)}ºC</p>
            <p>Condicion meteorologica: {dataWeather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}/>
          </div>
        )
      }
    </div>
    </>
  )
}
