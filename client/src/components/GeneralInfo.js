import React from "react"


const GeneralInfo = (props) => {

    return (
        <div className="general-info">
            <div className="city-name">
                <h2>
                    {
                        `${props.data.city}, ${props.data.country}`
                    }
                </h2>
            </div>
            <div className="date-wrapper">
                <div className="day">
                    <h2>
                        {
                            props.data.day
                        }
                    </h2>
                </div>
                <div className="date">
                    <h2>
                        {
                            props.data.date
                        }
                    </h2>
                </div>
            </div>
            <div className="wind">
                <img src="images/wind.png" alt="wind logo"></img>
                <h2>
                    {props.data.wind} km/h
                </h2>
            </div>
            <div className="humidity">
                <img src="images/humidity.png" alt="humidity icon"></img>
                <h2>
                    {props.data.humid} %
                </h2>
            </div>
            <div className="cover"></div>
        </div>
    )

}


export default GeneralInfo