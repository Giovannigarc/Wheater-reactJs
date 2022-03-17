import React, { useState } from 'react';
const api = {
  key: "740ddb1a9c597c03e25d4038072a856e",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br"
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=${api.lang}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result)
        });
    }
  };

  const dateBuilder = (data) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

    let day = days[data.getDay()];
    let date = data.getDate();
    let month = months[data.getMonth()];
    let year = data.getFullYear();

    return `${day} ${date} ${month} ${year} `;
  };

  return (
    <div className={(typeof weather.main != "undefined") ?
      ((weather.main.temp > 16) ? "app warm" : "app") : "app"}>
        <div className="container">
          <h1> CLIMA-TEMPO</h1>
        </div>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Digite aqui o país ou cidade que deseja consultar"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country }</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].description}
              </div>
             </div>
            <div>
           </div>
          </div>
        ) : ('')}
          <div className="footer">
        <footer>
          <p>Desenvolvido por: Giovanni Garcia @ MTX Tecnologia2022.</p>
        </footer>
      </div>
      </main>
    
    </div>
  );
}

export default App;