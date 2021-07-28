import React from "react"

const Search =(props) => {

    return (
        <div className="search-part">
            <input name="coords" onChange={props.data.handleChange} value={props.data.adress} placeholder="Enter an adress..."></input>
            <button name="coor-submit" onClick={props.data.handleClick}>Show the weather</button>
        </div>
    )
}

export default Search