import axios from "axios";
import { useEffect, useState } from "react";
import City from "../../assets/models/City";
import Weather from "../../assets/models/Weather";

function useFetchWeatherData(cityName: string): {
  city: City;
  weatherForecast: Weather[];
} {
  const [city, setCity] = useState<City>({} as City);
  const [weatherForecast, setWeatherForecast] = useState<Weather[]>(
    [] as Weather[]
  );

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:4000/cities/${cityName}?limit=1`,
    })
      .then((json) => setCity(json.data.data[0]))
      .then(() => {
        if (city.lat && city.lon) {
          axios({
            method: "GET",
            url: `http://localhost:4000/weather?lat=${city.lat}&lon=${city.lon}`,
          }).then((json) => {
            const parsedJson: Weather[] = [
              {
                unix: json.data.data.current.dt,
                temperature: json.data.data.current.temp,
                main: json.data.data.current.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${json.data.data.current.weather[0].icon}.png`,
                humidity: json.data.data.current.humidity,
                wind: json.data.data.current.wind_speed,
                pressure: json.data.data.current.pressure,
              },
              ...json.data.data.daily.map((day: any) => ({
                unix: day.dt,
                temperature: day.temp.day,
                main: day.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${json.data.data.current.weather[0].icon}.png`,
                humidity: day.humidity,
                wind: day.wind_speed,
                pressure: day.pressure,
              })),
            ];
            setWeatherForecast(parsedJson.slice(1));
          });
        }
      });
  }, [cityName, city.lat, city.lon]);

  return { city, weatherForecast };
}

export default useFetchWeatherData;
