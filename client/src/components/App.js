import React, {useState, useEffect} from "react"
import axios from "axios"
import BASE_URL from "../constants"


const App = () => {
    const [adress, setAdress] = useState("")
    const [weather, setWeather] = useState("")
    const [city, setCity] = useState("")
    const [temp, setTemp] = useState("")
    const [minTemp, setMinTemp] = useState("")
    const [maxTemp, setMaxTemp] = useState("")
    const [descrip, setDescrip] = useState("")
    const [humid, setHumid] = useState("")
    const [wind, setWind] = useState("")

    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                let lon = position.coords.longitude
                let lat = position.coords.latitude

                let sendingData = {
                    lon: lon,
                    lat: lat
                }

                axios.post(`${BASE_URL}/api/weather/local`, sendingData).then(response => {
                    const {data} = response
                    console.log(data)
                    setCity(data.name)
                    setWeather(data.weather[0].main)
                    setDescrip(data.weather[0].description)
                    setTemp(Math.floor(data.main.temp))
                    setMinTemp(Math.floor(data.main.temp_min))
                    setMaxTemp(Math.floor(data.main.temp_max))
                    setHumid(data.main.humidity)
                    setWind(data.wind.speed)
                    setAdress("")
                })
            })

        }
    }, [])

    const handleChange = (Event) => {
        const {name, value} = Event.target

        if (name === "coords") {
            setAdress(value)
        }
    }

    const handleClick = (Event) => {
        const {name} = Event.target

        if (name === "coor-submit") {
            let sendingData = {
                adress: adress
            }

            axios.post(`${BASE_URL}/api/weather/custom`, sendingData).then(response => {
                const {data} = response
                console.log(data)
                console.log(data.name)
                setCity(data.name)
                setWeather(data.weather[0].main)
                setDescrip(data.weather[0].description)
                setTemp(Math.floor(data.main.temp))
                setMinTemp(Math.floor(data.main.temp_min))
                setMaxTemp(Math.floor(data.main.temp_max))
                setHumid(data.main.humidity)
                setWind(data.wind.speed)
                setAdress("")
            })
        }
    }


    return (
        <div className="container">
            <div className="info-part">
                <div className="general-info">
                    <div className="city-name">
                        <h2>
                            {
                                city
                            }
                        </h2>
                    </div>
                    <div className="date"></div>
                    <div className="wind">
                        <h2>
                            wind {wind}
                        </h2>
                    </div>
                    <div className="humidity">
                        <h2>
                            {humid} %
                        </h2>
                    </div>
                    <div className="cover"></div>
                </div>
                <div className="weather-info">
                    <div className="temp-part">
                        <div className="temp-min-max">
                            <div className="temp-min">
                                <h2>
                                    {
                                        minTemp
                                    }
                                </h2>
                            </div>
                            <div className="temp-max">
                                <h2>
                                    {
                                        maxTemp
                                    }
                                </h2>
                            </div>
                        </div>
                        <div className="temp-main">
                            <h2>
                                {
                                    temp
                                }
                            </h2>
                        </div>
                    </div>
                    <div className="icon-part"></div>
                    <div className="description">
                        <h2>
                            {
                                descrip
                            }
                        </h2>
                    </div>
                </div>
            </div>

            <div className="search-part">
                <input name="coords" onChange={handleChange} value={adress} placeholder="Enter your location"></input>
                <button name="coor-submit" onClick={handleClick}>click to know coordinates</button>
            </div>

        </div>
    )
}

export default App