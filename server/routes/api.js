const fetch = require("node-fetch")
require("dotenv").config()

module.exports = function(app) {

    app.post("/api/weather/local", (req, res) => {

        const {lon, lat} = req.body

        fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`)
            .then(response => response.json())
            .then(data => {
                res.json(data)
            })

    })

    app.post("/api/weather/custom", (req, res) => {
        const key = process.env.API_ACCESS_KEY
        const {adress} = req.body
        
        fetch(`http://api.positionstack.com/v1/forward?access_key=${key}&query=${adress}&limit=1&output=json`)
            .then(response => response.json())
            .then(data => {

                if (data.data[0]) {

                    let lat = data.data[0].latitude
                    let lon = data.data[0].longitude
    
                    fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`)
                        .then(response => response.json())
                        .then(data => {
                            res.json(data)
                        })

                } else {
                    res.json({error: "api error"})
                }


            })
        
    })
}