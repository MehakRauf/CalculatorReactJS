import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assests/search.png'
import drizzle_icon from '../assests/drizzle.png'
import humidity_icon from '../assests/humidity.png'
import clear_icon from '../assests/clear.png'
import cloud_icon from '../assests/cloud.png'
import rain_icon from '../assests/rain.png'
import snow_icon from '../assests/snow.png'
import wind_icon from '../assests/wind.png'

const Weather = () => {
    const Icons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": snow_icon,
        "10n": snow_icon,
    }
    const [city, setCity] = useState('');
    const [data, setdata] = useState(false);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearchClick = () => {
        if (city.trim() === '') {
            alert('Enter city name');
            return;
        }
        if (city.trim()) {
            search(city);
        }
        setCity("");
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                alert("City not found");
                return;
            }

            const data = await response.json();
            console.log(data);
            const icons = Icons[data.weather[0].icon] || clear_icon;
            setdata({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icons,
            })
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setdata(null); // Clear the data on error
        }
    }

    useEffect(() => {
        search("Karachi");
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder='Search'
                    value={city}
                    onChange={handleInputChange}
                />
                <img
                    src={search_icon}
                    alt='Search icon'
                    onClick={handleSearchClick}
                />
            </div>

            {data ? <><img src={data.icon} alt='Weather icon' className='weather-icon' />
                <p className='temperature'>{data.temperature}°C</p>
                <p className='location'>{data.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt='Humidity icon' />
                        <div>
                            <p>{data.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt='Wind speed icon' />
                        <div>
                            <p>{data.windSpeed}Km/h</p>
                            <span>Wind speed</span>
                        </div>
                    </div>
                </div></> : <p>No data available</p>}

        </div>
    );
}

export default Weather;
