const input = document.querySelector('input')
const button = document.querySelector('button')
const errorMessage = document.querySelector('.error')
const cityName = document.querySelector('.cityName')
const img = document.querySelector('img')
const temperature = document.querySelector('.temperature')
const feelTemperature = document.querySelector('.feelTemperature')
const temperatureDescription = document.querySelector('.temperatureDescription')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.windSpeed')
const date = document.querySelector('.date')

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=5eaa17b7383cf49058d4f4ed26011bdf'
const apiUnits = '&units=metric'

const checkWeather = () => {
    const city = input.value
    const URL = apiLink + city + apiKey + apiUnits

    if (!navigator.onLine) {
        errorMessage.textContent = 'Brak połączenia z internetem'
    } else {
        axios.get(URL).then(response => {
            console.log(response.data)
    
            errorMessage.textContent = ''
    
            cityName.textContent = `${response.data.name}, ${response.data.sys.country}`
            temperature.textContent = `Temperatura: ${Math.floor(response.data.main.temp)} °C`
            feelTemperature.textContent = `Temperatura odczuwalna: ${Math.floor(response.data.main.feels_like)} °C`
            pressure.textContent = `Ciśnienie: ${response.data.main.pressure} hPa`
            humidity.textContent = `Wilgotność: ${response.data.main.humidity} %`
            windSpeed.textContent = `Prędkość wiatru: ${response.data.wind.speed} m/s`
            temperatureDescription.textContent = `${response.data.weather[0].description}`
            date.textContent = `${new Date().toString().slice(4, 21)}`
    
            img.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
        }).catch((error) => {
            if (error.response.data.cod == '404') {
                errorMessage.textContent = 'Nie ma takiej nazwy miasta'
            } else {
                errorMessage.textContent = 'Wystąpił nieznany błąd'
            }
    
            cityName.textContent = ''
            temperature.textContent = ''
            feelTemperature.textContent = ''
            pressure.textContent = ''
            humidity.textContent = ''
            windSpeed.textContent = ''
            temperatureDescription.textContent = ''
            date.textContent = ''
    
            img.setAttribute('src', '')
        }).finally(() => {
            input.value = ''
        })
    }
}

const checkWeatherByEnter = e => {
    if (e.key == 'Enter') {
        checkWeather()
    }
}

input.addEventListener('keyup', checkWeatherByEnter)
button.addEventListener('click', checkWeather)
