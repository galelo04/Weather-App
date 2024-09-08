import { weatherAPI } from './weatherAPI';
import { imagesAPI } from './imagesAPI';

const appManager = (function () {
  const init = () => {
    weatherAPI.getWeather('Russia').then((data) => renderWeather(data));

    const image = new Image();
    imagesAPI.getImage().then((url) => (image.src = url));

    document.querySelector('.img').appendChild(image);
    bindEvents();
  };
  const bindEvents = () => {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const location = document.querySelector('input').value;
      weatherAPI
        .getWeather(location)
        .then((data) => renderWeather(data))
        .catch((error) => renderError(error));

      const image = new Image();
      imagesAPI.getImage().then((url) => (image.src = url));
      document.querySelector('.img').innerHTML = '';
      document.querySelector('.img').appendChild(image);
    });
  };
  const renderError = (error) => {
    alert(error);
  };
  const renderWeather = (weatherData) => {
    document.querySelector('.resolvedAddress').innerText =
      weatherData.resolvedAddress;
    document.querySelector('.address').innerText = weatherData.address;
    document.querySelector('.temp').innerText =
      weatherData.currentCondition.temp;
    document.querySelector('.condition').innerText =
      weatherData.currentCondition.condition;
    document.querySelector('.time').innerText =
      weatherData.currentCondition.dateTime;
    document.querySelector('.windSpeed').innerText =
      weatherData.currentCondition.windSpeed;
    document.querySelector('.visibility').innerText =
      weatherData.currentCondition.visibility;
    document.querySelector('.dewPoint').innerText =
      weatherData.currentCondition.dewPoint;
    document.querySelector('.pressure').innerText =
      weatherData.currentCondition.pressure;
    const image = new Image();
    image.src = imagesAPI.getWeatherIcon(
      weatherData.currentCondition.condition,
      weatherData.currentCondition.dateTime
    );
    document.querySelector('.icon').innerHTML = '';
    document.querySelector('.icon').appendChild(image);
    document.querySelector('.forecast').innerHTML = '';
    weatherData.days.forEach((dayData) => {
      const day = document.createElement('div');
      day.classList.add('day');
      day.innerHTML = `  <div class="date"></div>
  <div class="tempMin"></div>
  <div class="tempMax"></div>
  <div class="icon"></div>`;
      day.querySelector('.date').innerText = dayData.date;
      day.querySelector('.tempMin').innerText = dayData.tempMin;
      day.querySelector('.tempMax').innerText = dayData.tempMax;
      console.log(dayData.conditions);
      const image = new Image();
      image.src = imagesAPI.getWeatherIcon(
        dayData.conditions,
        weatherData.currentCondition.dateTime
      );
      day.querySelector('.icon').appendChild(image);
      document.querySelector('.forecast').appendChild(day);
    });
  };
  return { init };
})();

export { appManager };
