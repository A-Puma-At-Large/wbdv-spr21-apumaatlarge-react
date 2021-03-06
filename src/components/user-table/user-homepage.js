import React, {useEffect, useState} from 'react'
import userService from "../../services/user-service"
import "./admin-homepage.css"
import {Link,useParams} from 'react-router-dom'
import {combineReducers, createStore} from "redux";
import userReducer from "../../reducers/user-reducer";
import artworkReducer from "../../reducers/artwork-reducer";
import PopularArtworks from "../artworks/popular-artworks";


const UserHomepage = () => {
  const {userId} = useParams();
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const reducer = combineReducers({
    userReducer : userReducer,
    artworkReducer: artworkReducer
  })

  const store = createStore(reducer)
  useEffect(() => {
    console.log(userId)
    userService.findUserById(userId).then(user => setUser(user))
  }, [])
  const [keyword, setKeyword] = useState("")
  return (
      <div className={"container-fluid container-home"}>

          <nav className="navbar navbar-light bg-light">
              <div className={"row"}>
                  <div className={"col-md-auto"}>
                      <img src="data:image/png;base64,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" alt="" width="50" height="50"/>
                  </div>
                  <div className={"co-md-auto"}>
                      <label className={"navbar-brand"}
                             style={{"fontWeight": "bold"}}>
                          Welcome {user.username}
                      </label>
                  </div>

                  <div className={"col-md-2"}>
                      <button className={" btn btn-light float-right"}>
                          <Link to={`/user/${user.id}/profile`}>Profile</Link></button>
                  </div>
                  <div className={"col-md-2"}>
                      <button className={" btn btn-light float-right"}>
                          <Link to={`/user/${user.id}/favorites`}>favorites</Link>
                      </button>
                  </div>
                  <div className={"col-md-2"}>
                      <button className={" btn btn-light float-right"}>
                          <Link to={`/user/${user.id}/reviews`}>Reviews</Link>
                      </button>
                  </div>

                  <div className={"col-auto flow-right"}>
                      <button className={" btn btn-light "}><Link to={"/"}>Logout</Link></button>
                  </div>
              </div>
          </nav>


        <div className={"row"}>
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
                <Link to={`/user/${user.id}/search/${keyword}`}>
                  Search
                </Link>
              </button>
              <>{keyword}</>
            </div>

          </div>
          <div className={"col-2"}>

          </div>
        </div>
        <div className={"row"}>
          <PopularArtworks page={1} limit={12}/>
        </div>
      </div>
          )
}

export default UserHomepage