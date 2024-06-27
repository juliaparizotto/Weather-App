const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '8fdfbcd70dfebf589a8c495bff658a4d';
    const city = document.querySelector('.search-box input').value;
    
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                notFound.style.visibility = 'visible';
                weatherBox.style.visibility = 'hidden';
                weatherDetails.style.visibility = 'hidden';
                return;
            }

            notFound.style.visibility = 'hidden';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/clear.png';
                    break;
                case 'Rain':
                    image.src = 'assets/rain.png';
                    break;
                case 'Snow':
                    image.src = 'assets/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'assets/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'assets/mist.png';
                    break;
                case 'Haze':
                    image.src = 'assets/mist.png';
                    break;
                default:
                    image.src = 'assets/default.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
        });
});