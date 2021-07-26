const fetch = require("node-fetch")
require("dotenv").config()

module.exports = function(app) {

    app.post("/api/weather/local", (req, res) => {
        console.log(req.body)
        const {lon, lat} = req.body

        fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`)
            .then(response => response.json())
            .then(data => {
                res.json(data)
            })


        
    })
}