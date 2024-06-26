const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '7993c80261f2e36d8961252f1986ef53';
    const city = document.querySelector('.search-box input').value;

    if (city === "") 
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                // throw new Error('City not found');
                alert("CITY NOT FOUND");
            }
            return response.json();
        })
        .then(json => {
            console.log(json);

            if (json.cod == '404') {
                container.style.height='400px';
                error404.classList.add('active');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                console.log("Error 404: Image should be visible now.");
                return;
            }

            container.style.height='555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Update the weather image based on the weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            const tempCelsiu = (json.main.temp - 273.15).toFixed(1);
            temperature.innerHTML = `${tempCelsiu}°C`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;
        })
        .catch(error => {
            alert(error.message);
        });
});
