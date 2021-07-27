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
                    setTemp(data.main.temp)
                    setMinTemp(data.main.temp_min)
                    setMaxTemp(data.main.temp_max)
                    setHumid(data.main.humidity)
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
                setTemp(data.main.temp)
                setMinTemp(data.main.temp_min)
                setMaxTemp(data.main.temp_max)
                setHumid(data.main.humidity)
                setAdress("")
            })
        }
    }


    return (
        <div className="container">
            <div className="info-part">
                <div className="general-info"></div>
                <div className="weather-info"></div>
            </div>

            <div className="search-part">
                <input name="coords" onChange={handleChange} value={adress} placeholder="Enter your location"></input>
                <button name="coor-submit" onClick={handleClick}>click to know coordinates</button>
            </div>

        </div>
    )
}

export default App