import "./Home.css";
import { useState } from "react";
import axios from "axios";
import pic1 from "./wearher1.jpg";
import { TbTemperatureCelsius } from "react-icons/tb";

const Home = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(false);
  const [temp, setTemp] = useState("");
  const [cityName, setCityName] = useState("");

  const cityChangeHander = (event) => {
    setCity(event.target.value);
  };
  const feachWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b29467b8c7b2c03568265ab5e698f7e2`
      )
      .then((response) => {
        // const data = [];
        setData(true);
        console.log(response.data.name);
        setCityName(response.data.name);
        setTemp((response.data.main.temp - 273.15).toFixed(2));
      })
      .catch((error) => {
        setCity("");
        alert("City not found...!!");
      });
  };
  return (
    <div>
      <div className="searchBox">
        <div>
          <input
            value={city}
            onChange={cityChangeHander}
            placeholder="Enter City Name"
          />
          <button onClick={feachWeather}>Search City</button>
        </div>
      </div>
      {data && (
        <div className="output">
          <div>
            <h1>{cityName}</h1>
            <img src={pic1} alt="pic 1" />
            <h2>
              {temp}
              <TbTemperatureCelsius />
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
