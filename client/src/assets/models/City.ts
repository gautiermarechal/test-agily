export default interface City {
  local_names: Record<string, string>;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
