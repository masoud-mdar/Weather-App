const express = require("express")
const cors = require("cors")
require("dotenv").config()

const apiRoutes = require("./routes/api")

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

/*app.get("/", (req, res) => {
    res.send("Hello!")
})*/

apiRoutes(app)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})