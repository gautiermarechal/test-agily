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
      url: `${process.env.REACT_APP_OPEN_WEATHER_API_URL}/geo/1.0/direct?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&limit=1`,
    })
      .then((json) => setCity(json.data[0]))
      .then(() => {
        if (city.lat && city.lon) {
          axios({
            method: "GET",
            url: `${process.env.REACT_APP_OPEN_WEATHER_API_URL}/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
          }).then((json) => {
            const parsedJson: Weather[] = [
              {
                unix: json.data.current.dt,
                temperature: json.data.current.temp,
                main: json.data.current.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${json.data.current.weather[0].icon}.png`,
                humidity: json.data.current.humidity,
                wind: json.data.current.wind_speed,
                pressure: json.data.current.pressure,
              },
              ...json.data.daily.map((day: any) => ({
                unix: day.dt,
                temperature: day.temp.day,
                main: day.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${json.data.current.weather[0].icon}.png`,
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
