import SearchInput from "../../components/SearchInput";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import City from "../../assets/models/City";

function Home(): JSX.Element {
  const { t } = useTranslation();
  const [citiesSuggestions = [], setCitiesSuggestions] = useState<City[]>([]);

  async function handleChange(payload: string): Promise<void> {
    if (payload !== "") {
      const response = await fetch(
        `${process.env.REACT_APP_OPEN_WEATHER_API_URL}/geo/1.0/direct?q=${payload}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&limit=5`
      );
      const data = (await response.json()) as City[];
      setCitiesSuggestions(data);
    } else {
      setCitiesSuggestions([]);
    }
  }

  return (
    <div className="wrapper">
      <h1>{t("home.mainTitle")}</h1>
      <SearchInput
        suggestions={citiesSuggestions}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Home;
