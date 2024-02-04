const inputBox = document.querySelector('.input_box');
const searchButton = document.querySelector('.search_box');
const images = document.querySelector('.weather_img');
const description = document.querySelector('.description');

searchButton.addEventListener('click',function(){
    let city = inputBox.value;
    const apiKey = 'a43e5c8253adc3e603997f97943b4429';
    const cityName = city;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.cod == '404'){
            document.querySelector('.cityNotFound').style.display = 'flex';
            document.querySelector('.notFoundCity').innerHTML = data.message;
            document.querySelector('.weatherDetails').style.display = 'none';
        }
        
        let temperature = document.querySelector('.temp_num');
        temperature.innerHTML = (data.main.temp - 273.15).toFixed();
        description.innerHTML = data.weather[0].description;
        document.querySelector('.weatherDetails').style.display = 'block';
        document.querySelector('.weatherDetails').style.transition = 'all 1s ease-out;';
        

        if(data.weather[0].main == 'Clouds'){
            document.querySelector('.cityNotFound').style.display = 'none';
            images.src = 'images/cloud.png';
        }
        else if(data.weather[0].main == 'Clear'){
            document.querySelector('.cityNotFound').style.display = 'none';
            images.src = 'images/clear.png';
        }
        else if(data.weather[0].main == 'Rain'){
            document.querySelector('.cityNotFound').style.display = 'none';
            images.src = 'images/rain.png';
        }
        else if(data.weather[0].main == 'Mist'){
            document.querySelector('.cityNotFound').style.display = 'none';
            images.src = 'images/mist.png';
        }
        else if(data.weather[0].main == 'Snow'){
            document.querySelector('.cityNotFound').style.display = 'none';
            images.src = 'images/snow.png';
        }
        else{
            document.querySelector('.cityNotFound').style.display = 'none';
            images.src = 'images/haze.png';
        }

        //Sunrise and Sunset Starts
        let sunrise = new Date(data.sys.sunrise * 1000)
        document.querySelector('.sunrise').innerHTML = `${sunrise.toLocaleTimeString()}`;
        let sunset = new Date(data.sys.sunset * 1000)
        document.querySelector('.sunset').innerHTML = `${sunset.toLocaleTimeString()}`;
        //Sunrise and Sunset Ends

        //Humidity and Pressure Starts
        document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
        document.querySelector('.pressure').innerHTML = data.main.pressure + ' hpa';
        //Humidity and Pressure Ends

        //Wind Speed and Degree Starts
        document.querySelector('.wind').innerHTML = data.wind.speed + 'm/s';
        document.querySelector('.degree').innerHTML = data.wind.deg + '°';
        //Humidity and Pressure Ends


    })
})