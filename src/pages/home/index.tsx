import SearchInput from "../../components/SearchInput";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import City from "../../assets/models/City";
import axios from "axios";

function Home(): JSX.Element {
  const { t } = useTranslation();
  const [citiesSuggestions = [], setCitiesSuggestions] = useState<City[]>([]);

  async function handleChange(payload: string): Promise<void> {
    if (payload !== "") {
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/cities/${payload}?limit=5`,
      });
      const data = (await response.data.data) as City[];
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
