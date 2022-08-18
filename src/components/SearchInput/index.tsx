import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import City from "../../assets/models/City";
import getCountryNameByCode from "../../utils/helpers/getCoutryNameByCode";
import "./index.scss";

interface SearchInputProps {
  handleChange: (payload: string) => void;
  suggestions: City[];
}

function SearchInput(props: SearchInputProps): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleChange, suggestions = [] } = props;
  const showDropDown = useMemo(() => suggestions.length !== 0, [suggestions]);
  return (
    <div className="wrapper-search-input">
      <input
        placeholder={t("home.inputPlaceholder")}
        type="text"
        className="main-input"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className={showDropDown ? "dropdown" : "dropdown-hidden"}>
        {suggestions.map((city, index) => {
          return (
            <div
              className="dropdown-item"
              key={index}
              onClick={() => navigate(`/today:${city.name}`)}
            >
              <h4>{city.name},</h4>
              <span>{getCountryNameByCode(city.country)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchInput;
