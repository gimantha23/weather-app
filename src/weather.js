import React, { Component } from "react";
import "./css/App.css";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Favorites from "./components/Favorites";
import { API_KEY } from "./config.js";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {
        weather: "",
        city: "",
        country: "",
        temp: 0,
      },
      searchDone: false,
      savedCities: [],
      hasSavedCities: false,
      errorMessage: "",
    };

    this.callWeatherData = this.callWeatherData.bind(this);
    this.updateSavedCities = this.updateSavedCities.bind(this);
  }

  callWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
    fetch(url)
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((data) => {
        const weatherObj = {
          weather: data.weather,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
        };
        this.setState({
          weatherData: weatherObj,
          searchDone: true,
          errorMessage: "",
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  updateSavedCities(cityArr) {
    const hasCities = cityArr.length > 0;
    this.setState({ savedCities: cityArr, hasSavedCities: hasCities });
  }

  componentWillMount() {
    let existingCities = JSON.parse(localStorage.getItem("cityList") || "[]");

    if (existingCities.length !== 0) {
      this.setState({
        hasSavedCities: true,
        savedCities: existingCities,
      });
    }
  }

  render() {
    const {
      searchDone,
      weatherData,
      hasSavedCities,
      savedCities,
      errorMessage,
    } = this.state;

    return (
      <div>
       
        <div className="App">
          <SearchBar
            callBackFromParent={this.callWeatherData}
            error={errorMessage}
          />
           <div className="background-im">
          {searchDone && (
             
            <WeatherCard
              weatherData={weatherData}
              savedCities={savedCities}
              callBackFromParent={this.updateSavedCities}
            />
          
          )}
          {hasSavedCities && (
            <Favorites
              savedCities={savedCities}
              callBackFromParent={this.callWeatherData}
            />
          )}
        </div>
        </div>
      </div>
   
    );
  }
}

export default App2;
