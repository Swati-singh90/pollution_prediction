document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getCoordinates(city);
    }
});


async function getCoordinates(city) {
    const apiKey = '0b274d82d4c8e55ca90ab3cdbb4f4cc4';
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            getPollutionData(lat, lon, city);
        } 
        else {
            alert('City not found');
        }
    } catch (error) {
        alert('Error fetching coordinates');
    }
}


async function getPollutionData(lat, lon, city) {
    const apiKey = '0b274d82d4c8e55ca90ab3cdbb4f4cc4';
    const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(pollutionUrl);
        const data = await response.json();

        if (response.ok) {
            displayPollutionData(data, city);
        } else {
            alert('Error fetching pollution data');
        }
    } catch (error) {
        alert('Error fetching pollution data');
    }
}
function displayPollutionData(data, city) {
    const aqi = data.list[0].main.aqi;
    const pollutants = data.list[0].components;

    document.getElementById('city-name').textContent = `City: ${city}`;
    document.getElementById('aqi').textContent = `Air Quality Index (AQI): ${aqi}`;
    document.getElementById('pollutants').textContent = `
        PM2.5: ${pollutants.pm2_5} µg/m³, PM10: ${pollutants.pm10} µg/m³,
        CO: ${pollutants.co} µg/m³, NO2: ${pollutants.no2} µg/m³,
        SO2: ${pollutants.so2} µg/m³, O3: ${pollutants.o3} µg/m³
    `;


    let weatherCondition = '';
      var conditionElement=document.getElementById('weather-condition');
    if (aqi === 1) {

       weatherCondition = 'Good';
       conditionElement.className = 'good';
    } else if (aqi === 2) {
        weatherCondition = 'Fair';
        conditionElement.className='fair';
    } else if (aqi === 3) {
        weatherCondition = 'Moderate';
        conditionElement.className='moderate';
    } else if (aqi === 4) {
        weatherCondition = 'Poor';
        conditionElement.className='poor';
    } else if (aqi === 5) {
     weatherCondition = 'Very Poor';
     conditionElement.className='very poor'
    }


    document.getElementById('weather-condition').textContent = `Weather Condition: ${weatherCondition}`;

    document.querySelector('.pollution-info').style.display = 'block';
}
