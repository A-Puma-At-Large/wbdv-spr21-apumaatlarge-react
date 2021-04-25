import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import userService from "../../services/user-service"
import "./admin-homepage.css"
import EditableItem from "./editable-item"
import {Link,useParams} from 'react-router-dom'
import UserProfile from "./user-profile";
import {combineReducers, createStore} from "redux";
import userReducer from "../../reducers/user-reducer";
import artworkReducer from "../../reducers/artwork-reducer";
import PopularArtworks from "../popular-artworks";
import Search from "../search";

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
      <div>
        <div className={"row"}>
          <div className={"col-10"}><h1>Welcome to your profile page! {user.username}</h1></div>
          <div className={"col-2"}><Link to={"/"}>Log Out</Link></div>
        </div>
        <p><Link to={`/user/${user.id}/profile`}>Go to profile</Link></p>
        <p><Link to={`/user/${user.id}/favorites`}>See your favorites</Link></p>
        <p><Link to={`/user/${user.id}/reviews`}>See your reviews</Link></p>
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
              <button>
                <Link to={`/user/${user.id}/search/${keyword}`}>
                  Search
                </Link>
              </button>
              <>{keyword}</>
            </div>


            {/*<ul>*/}
            {/*  <li>*/}
            {/*    <ArtworkDetails />*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </div>
          <div className={"col-2"}>

          </div>
          {/*<div className={"col-2"}>*/}
          {/*  */}
          {/*</div>*/}
        </div>
        <div className={"row"}>
          <PopularArtworks page={1} limit={12}/>
        </div>
      </div>
          )
}

export default UserHomepage