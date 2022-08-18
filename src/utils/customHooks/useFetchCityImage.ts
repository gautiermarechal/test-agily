import axios from "axios";
import { useState } from "react";

function useFetchCityImage(cityName: string): string {
  const [image, setImage] = useState<string>("");

  if (cityName) {
    axios({
      method: "GET",
      url: `https://api.teleport.org/api/urban_areas/slug:${cityName.toLocaleLowerCase()}/images`,
    }).then((res) => setImage(res.data.photos[0].image.mobile));
  }

  return image;
}

export default useFetchCityImage;
