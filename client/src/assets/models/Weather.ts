interface Weather {
  unix: number;
  temperature: number;
  main: string;
  icon: string;
  humidity: number;
  wind: number;
  pressure: number;
}

export default Weather;
