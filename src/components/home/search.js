import React, {useState} from 'react'
import {Link} from "react-router-dom";


const Search = () => {
  const [keyword, setKeyword] = useState("")
  return (
        <div className={"container-fluid row"}>
          <div className={"col-10"}>
            <input className={"form-control"}
                   placeholder={"Enter a keyword to start search"}
                   type={"text"}
                   onChange={(e) => setKeyword(e.target.value)}
                   value={keyword}/>
          </div>
          <div className={"col-2"}>
            <button className={"btn btn-outline-info search-link"}>
              <Link to={`/search/${keyword}`}>
                Search
              </Link>
            </button>
          </div>

        </div>
  )
}

export default Search