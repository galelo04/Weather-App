import weatherCloudy from '../assets/weather-cloudy.svg';
import weatherDust from '../assets/weather-dust.svg';
import weatherFog from '../assets/weather-fog.svg';
import weatherHail from '../assets/weather-hail.svg';
import weatherHazy from '../assets/weather-hazy.svg';
import weatherHurricaneOutline from '../assets/weather-hurricane-outline.svg';
import weatherHurricane from '../assets/weather-hurricane.svg';
import weatherLightningRainy from '../assets/weather-lightning-rainy.svg';
import weatherLightning from '../assets/weather-lightning.svg';
import weatherNightPartlyCloudy from '../assets/weather-night-partly-cloudy.svg';
import weatherNight from '../assets/weather-night.svg';
import weatherPartlyCloudy from '../assets/weather-partly-cloudy.svg';
import weatherPartlyLightning from '../assets/weather-partly-lightning.svg';
import weatherPartlyRainy from '../assets/weather-partly-rainy.svg';
import weatherPartlySnowyRainy from '../assets/weather-partly-snowy-rainy.svg';
import weatherPartlySnowy from '../assets/weather-partly-snowy.svg';
import weatherPouring from '../assets/weather-pouring.svg';
import weatherRainy from '../assets/weather-rainy.svg';
import weatherSnowyHeavy from '../assets/weather-snowy-heavy.svg';
import weatherSnowyRainy from '../assets/weather-snowy-rainy.svg';
import weatherSnowy from '../assets/weather-snowy.svg';
import weatherSunny from '../assets/weather-sunny.svg';
import weatherTornado from '../assets/weather-tornado.svg';
import weatherWindy from '../assets/weather-windy.svg';

const imagesAPI = (function () {
  const weatherIcons = {
    Clear: weatherSunny,
    Sunny: weatherSunny,
    'Partially cloudy': weatherPartlyCloudy,
    'Mostly cloudy': weatherCloudy,
    Overcast: weatherCloudy,
    Fog: weatherFog,
    Haze: weatherHazy,
    'Light Rain': weatherPartlyRainy,
    Rain: weatherRainy,
    'Heavy Rain': weatherPouring,
    Thunderstorm: weatherLightningRainy,
    Snow: weatherSnowy,
    'Heavy Snow': weatherSnowyHeavy,
    Sleet: weatherSnowyRainy,
    Windy: weatherWindy,
    Hail: weatherHail,
    Dust: weatherDust,
    Tornado: weatherTornado,
    Hurricane: weatherHurricane,
    'Night Clear': weatherNight,
    'Night Partially cloudy': weatherNightPartlyCloudy,
  };

  const getWeatherIcon = (condition, time) => {
    if (condition === 'Clear' || condition === 'Partially cloudy') {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      if (hours < 6 || hours >= 18) {
        condition = 'Night ' + condition;
      }
    }
    return weatherIcons[condition] || weatherSunny;
  };
  const getData = async () => {
    const accessKey = 'dcSwMBkHteybDv0qVslxYLG5UBQhPxsYrayWcgAlJHY';
    const url = `https://api.unsplash.com/photos/random?query=tree&orientation=squarish&client_id=${accessKey}`;
    try {
      const response = await fetch(url, { mode: 'cors' });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const getImage = async () => {
    const data = await getData();
    return data.urls.raw;
  };
  return { getImage, getWeatherIcon };
})();
export { imagesAPI };
