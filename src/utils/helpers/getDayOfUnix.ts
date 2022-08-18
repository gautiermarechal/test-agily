function getDayOfUnix(UNIX_timestamp: number): string {
  const a = new Date(UNIX_timestamp * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(a.getDay());
  const day = days[a.getDay()];
  return day;
}

export default getDayOfUnix;
