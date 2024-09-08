const weatherAPI = (function () {
  const getData = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DDVZUHKV4KUX9QMUJESMQKU9B`;
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error('Invalid Location');
          case 401:
            throw new Error('Invalid Key');
        }
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  const getWeather = async (location) => {
    const data = await getData(location);
    const currentCondition = data.currentConditions;
    const days = [];
    data.days.forEach((dayData) => {
      const day = {};
      (day.tempMax = dayData.tempmax),
        (day.tempMin = dayData.tempmin),
        (day.conditions = dayData.conditions),
        (day.date = dayData.datetime),
        days.push(day);
    });
    const weather = {
      currentCondition: {
        condition: currentCondition.conditions,
        dateTime: currentCondition.datetime,
        temp: currentCondition.temp,
        humidity: currentCondition.humidity,
        windSpeed: currentCondition.windspeed,
        visibility: currentCondition.visibility,
        dewPoint: currentCondition.dew,
        pressure: currentCondition.pressure,
      },
      days: days,
      address: data.address,
      resolvedAddress: data.resolvedAddress,
    };
    return weather;
  };
  return { getWeather };
})();
export { weatherAPI };
