import React from "react"

const WeatherInfo = (props) => {

    return (
        <div className="weather-info">
            <div className="reserved">
                <h2>
                    {
                        `${props.data.city}, ${props.data.country}`
                    }
                </h2>
            </div>
            <div className="temp-part">
                <div className="temp-min-max">
                    <div className="temp-min min-max">
                        <img src="images/minTemp.png" alt="min temperature logo"></img>
                        <h2>
                            {props.data.minTemp}°
                        </h2>
                    </div>
                    <div className="temp-max min-max">
                        <img src="images/maxTemp.png" alt="max temperature logo"></img>
                        <h2>
                            {props.data.maxTemp}°
                        </h2>
                    </div>
                </div>
                <div className="temp-main">
                    <h2>
                        {props.data.temp}°
                    </h2>
                </div>
            </div>
            <div className="icon-part">
                <img src={`images/${props.data.logoKey}.png`} alt="weather-logo"></img>
            </div>
            <div className="description">
                <h2>
                    {
                        props.data.descrip
                    }
                </h2>
            </div>
        </div>
    )
}

export default WeatherInfo