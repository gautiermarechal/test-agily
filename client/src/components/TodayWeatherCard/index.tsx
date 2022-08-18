import { useTranslation } from "react-i18next";
import { GoLocation } from "react-icons/go";
import convertUnixToDate from "../../utils/helpers/convertUnixToDate";
import "./index.scss";

interface TodayWeatherCardProps {
  unix: number;
  title: string;
  icon: string;
  temperature: number;
  humidity: number;
  wind: number;
  pressure: number;
}

function TodayWeatherCard(props: TodayWeatherCardProps): JSX.Element {
  const { t } = useTranslation();
  const { unix, title, icon, humidity, temperature, pressure, wind } = props;
  return (
    <div className="today-weather">
      <h1>{convertUnixToDate(unix)}</h1>
      <div className="title-container">
        <GoLocation size={40} />
        <h1>{title}</h1>
      </div>
      <img src={icon} alt="Weather" />
      <h2>{temperature} Cº</h2>
      <hr />
      <div className="information-container">
        <span>
          {t("today.humidity")}: {humidity}%
        </span>
        <span>
          {t("today.pressure")}: {pressure}hPa
        </span>
        <span>
          {t("today.wind")}: {wind}km/h
        </span>
      </div>
    </div>
  );
}

export default TodayWeatherCard;
