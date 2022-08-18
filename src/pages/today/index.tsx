import "./index.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TodayWeatherCard from "../../components/TodayWeatherCard";
import useFetchWeatherData from "../../utils/customHooks/useFetchWeatherData";
import { useNavigate, useParams } from "react-router-dom";
import useFetchCityImage from "../../utils/customHooks/useFetchCityImage";
import ImageCard from "../../components/ImageCard";
import ForecastCard from "../../components/ForecastCard";
import getDayOfUnix from "../../utils/helpers/getDayOfUnix";
import convertUnixToDate from "../../utils/helpers/convertUnixToDate";
import { useMemo, useState } from "react";

function Today(): JSX.Element {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const data = useFetchWeatherData(cityName ?? "");
  const { city, weatherForecast } = data;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const cityImage = useFetchCityImage(city.name);

  const currentData = useMemo(
    () => weatherForecast[currentIndex],
    [currentIndex, weatherForecast]
  );

  return (
    <div className="wrapper-today">
      <div className="button-container">
        <button onClick={() => navigate("/")}>
          <AiOutlineArrowLeft />
        </button>
      </div>
      <div className="content-container">
        <div className="left-container">
          {city && currentData ? (
            <>
              <TodayWeatherCard
                unix={currentData.unix}
                title={city.name}
                humidity={currentData.humidity}
                temperature={currentData.temperature}
                icon={currentData.icon}
                wind={currentData.wind}
                pressure={currentData.pressure}
              />
            </>
          ) : null}
          <ImageCard url={cityImage} />
        </div>
        <div className="right-container">
          {weatherForecast
            ? weatherForecast.slice(1).map((weather, index) => {
                return (
                  <ForecastCard
                    currentIndex={currentIndex}
                    key={index}
                    index={index}
                    setCurrentIndex={setCurrentIndex}
                    icon={weather.icon}
                    temperature={weather.temperature}
                    day={getDayOfUnix(weather.unix)}
                    date={convertUnixToDate(weather.unix)}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Today;
