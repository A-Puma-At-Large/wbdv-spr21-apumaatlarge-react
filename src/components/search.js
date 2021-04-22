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
            <button>
              <Link to={`/search/${keyword}`}>
                Search
              </Link>
            </button>
          </div>


          {/*<ul>*/}
          {/*  <li>*/}
          {/*    <ArtworkDetails />*/}
          {/*  </li>*/}
          {/*</ul>*/}
        </div>
  )
}

export default Search