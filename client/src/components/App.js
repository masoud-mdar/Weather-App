import React, {useState, useEffect} from "react"
import axios from "axios"
import BASE_URL from "../constants"


const App = () => {
    const [adress, setAdress] = useState("")
    const [logoKey, setLogoKey] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [temp, setTemp] = useState("")
    const [minTemp, setMinTemp] = useState("")
    const [maxTemp, setMaxTemp] = useState("")
    const [descrip, setDescrip] = useState("")
    const [humid, setHumid] = useState("")
    const [wind, setWind] = useState("")

    const [day, setDay] = useState("")
    const [date, setDate] = useState("")
    

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
                    setCountry(data.sys.country)
                    setDescrip((data.weather[0].description).toUpperCase())
                    setTemp(Math.floor(data.main.temp))
                    setMinTemp(Math.floor(data.main.temp_min))
                    setMaxTemp(Math.floor(data.main.temp_max))
                    setHumid(data.main.humidity)
                    setWind(Math.floor(data.wind.speed))
                    setAdress("")

                    let dateStr = new Date()
                    let dateArr = dateStr.toDateString().split(" ")

                    setDay(dateArr.shift())
                    setDate(dateArr.join(" "))

                    

                    let weather = (data.weather[0].main).toLowerCase()

                    if (/clear/.test(weather)) {
                        if (parseInt(Math.floor(data.main.temp)) < 30) {
                            setLogoKey("clear")
                        } else {
                            setLogoKey("heatwave")
                        }
                    } else if (/cloud/.test(weather)) {
                        setLogoKey("cloud")
                    } else if (/snow/.test(weather)) {
                        setLogoKey("snow")
                    } else if (/rain/.test(weather)) {
                        setLogoKey("rain")
                    }
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

                setCity(data.name)
                setCountry(data.sys.country)
                setDescrip((data.weather[0].description).toUpperCase())
                setTemp(Math.floor(data.main.temp))
                setMinTemp(Math.floor(data.main.temp_min))
                setMaxTemp(Math.floor(data.main.temp_max))
                setHumid(data.main.humidity)
                setWind(Math.floor(data.wind.speed))
                setAdress("")

                let dateStr = new Date()
                let dateArr = dateStr.toDateString().split(" ")

                setDay(dateArr.shift())
                setDate(dateArr.join(" "))

                let weather = (data.weather[0].main).toLowerCase()
                console.log(weather, "weather")

                if (/clear/.test(weather)) {
                    if (parseInt(Math.floor(data.main.temp)) < 30) {
                        setLogoKey("clear")
                    } else {
                        setLogoKey("heatwave")
                    }
                    
                } else if (/cloud/.test(weather)) {
                    setLogoKey("cloud")
                } else if (/snow/.test(weather)) {
                    setLogoKey("snow")
                } else if (/rain/.test(weather)) {
                    setLogoKey("rain")
                } else if (/wind/.test(weather)) {
                    setLogoKey("windy")
                } else if (/fog/.test(weather)) {
                    setLogoKey("fog")
                } else if (/thunder/.test(weather)) {
                    setLogoKey("thunder")
                }
            })
        }
    }



    return (
        <div className="container">
            <div className="title">
                <h1>
                    Weather App
                </h1>
            </div>
            <div className="info-part">
                <div className="general-info">
                    <div className="city-name">
                        <h2>
                            {
                                `${city}, ${country}`
                            }
                        </h2>
                    </div>
                    <div className="date-wrapper">
                        <div className="day">
                            <h2>
                                {
                                    day
                                }
                            </h2>
                        </div>
                        <div className="date">
                            <h2>
                                {
                                    date
                                }
                            </h2>
                        </div>
                    </div>
                    <div className="wind">
                        <img src="images/wind.png" alt="wind logo"></img>
                        <h2>
                            {wind} km/h
                        </h2>
                    </div>
                    <div className="humidity">
                        <img src="images/humidity.png" alt="humidity icon"></img>
                        <h2>
                            {humid} %
                        </h2>
                    </div>
                    <div className="cover"></div>
                </div>
                <div className="weather-info">
                    <div className="temp-part">
                        <div className="temp-min-max">
                            <div className="temp-min min-max">
                                <img src="images/minTemp.png" alt="min temperature logo"></img>
                                <h2>
                                    {minTemp}°
                                </h2>
                            </div>
                            <div className="temp-max min-max">
                                <img src="images/maxTemp.png" alt="max temperature logo"></img>
                                <h2>
                                    {maxTemp}°
                                </h2>
                            </div>
                        </div>
                        <div className="temp-main">
                            <h2>
                                {temp}°
                            </h2>
                        </div>
                    </div>
                    <div className="icon-part">
                        <img src={`images/${logoKey}.png`} alt="weather-logo"></img>
                    </div>
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