import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Today from "./pages/today";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/today/:cityName" element={<Today />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
