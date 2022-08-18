import { Dispatch, SetStateAction } from "react";
import "./index.scss";

interface ForecastCardProps {
  index: number;
  currentIndex: number;
  icon: string;
  day: string;
  date: string;
  temperature: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

function ForecastCard(props: ForecastCardProps): JSX.Element {
  const { icon, day, date, temperature, index, setCurrentIndex, currentIndex } =
    props;

  const isSelected = currentIndex === index + 1;
  return (
    <div
      className={
        isSelected ? "forecast-card-wrapper-selected" : "forecast-card-wrapper"
      }
      onClick={() => {
        if (isSelected) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(index + 1);
        }
      }}
    >
      <img src={icon} alt="Icon Weather" />
      <div className="date-container">
        <h1>{day}</h1>
        <span>{date}</span>
      </div>
      <h1>{temperature} Cº</h1>
    </div>
  );
}

export default ForecastCard;
