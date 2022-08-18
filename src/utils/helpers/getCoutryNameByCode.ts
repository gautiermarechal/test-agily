import countries from "../../assets/countries.json";

function getCountryNameByCode(iso: string): string {
  return countries.find((country) => country.code === iso)?.name ?? "";
}

export default getCountryNameByCode;
