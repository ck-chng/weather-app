import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';

const api = {
  key: "89b8f505298b1ac57cdafb6e78e6ca1a",
  base: "http://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const realDate = new Date();  

  const dateBuilder = (date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 
  "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentMonth = months[date.getMonth()];
    let currentDay = days[date.getDay()];

    let currentDate = date.getDate();
    let currentYear = date.getFullYear();

    return `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`
  }

  const timeBuilder = (date) => {
    let currentHour = ((date.getHours() > 12) ? date.getHours() - 12: date.getHours());
    let currentMinute = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
    let amPm = ((date.getHours() < 12) ? 'am' : 'pm'); 

    return `${currentHour}: ${currentMinute} ${amPm}`
  }

  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(weather);
          });
    }
  }

  return (
    <Container className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm": "app") : "app"} fluid={true}>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "main warm": "main") : "main"}>
        <div className="search">
          <div className="search-bar">
            <h3 id="instruction">Enter a city:</h3>
            <input type="text" onChange= {e => setQuery(e.target.value)} value={query} placeholder="Search.." onKeyPress={search}/>
          </div>
          <div className="date">
            <h3>{dateBuilder(realDate)}</h3>
            <h4 id="time">{timeBuilder(realDate)}</h4>
          </div>
        </div>
        {(typeof weather.main != "undefined") ? 
          (<div className="info">

              <h1>{weather.name}, {weather.sys.country}</h1>
              <h1 className="temperature">{Math.round(weather.main.temp)} &#176;C</h1>
              <h3>{weather.weather[0].main}</h3>

          </div>) : ''}
      </div>
    </Container>
  );
}



export default App;

