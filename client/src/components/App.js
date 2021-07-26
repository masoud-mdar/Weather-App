import React, {useState, useEffect} from "react"
import axios from "axios"
import BASE_URL from "../constants"


const App = () => {

    const handleClick = (Event) => {
        const {name} = Event.target
        console.log(name)

        if (name === "coor-demand") {

            let lon = ""
            let lat = ""
            let sendingData = {}

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords.latitude)
                    console.log(position.coords.longitude)

                    lon = position.coords.longitude
                    lat = position.coords.latitude

                    sendingData = {
                        lon: lon,
                        lat: lat
                    }

                    axios.post(`${BASE_URL}/api/weather/local`, sendingData).then(response => {
                        const {data} = response
                        console.log(data)
                    })
                })

            }



        }
    }


    return (
        <div>
            <button name="coor-demand" onClick={handleClick}>click to know coordinates</button>
        </div>
    )
}

export default App