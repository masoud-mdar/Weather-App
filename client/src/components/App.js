import React, {useState, useEffect} from "react"
import axios from "axios"
import BASE_URL from "../constants"
import GeneralInfo from "./GeneralInfo"
import WeatherInfo from "./WeatherInfo"
import Search from "./Search"


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
                <GeneralInfo
                    data={{
                        city: city,
                        country: country,
                        day: day,
                        date: date,
                        wind: wind,
                        humid: humid
                    }}
                />

                <WeatherInfo
                    data={{
                        city: city,
                        country: country,
                        minTemp: minTemp,
                        maxTemp: maxTemp,
                        temp: temp,
                        logoKey: logoKey,
                        descrip: descrip
                    }}
                />
            </div>

            <Search
                data={{
                    handleChange: handleChange,
                    handleClick: handleClick,
                    adress: adress
                }}
            />

        </div>
    )
}

export default App