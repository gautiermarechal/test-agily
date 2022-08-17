import SearchInput from "../../components/SearchInput";
import "./index.scss";

function Home(): JSX.Element {
  function handleChange(): void {
    console.log("Hello");
  }
  return (
    <div className="wrapper">
      <h1>The Forecast Weather App</h1>
      <SearchInput handleChange={handleChange} />
    </div>
  );
}

export default Home;
