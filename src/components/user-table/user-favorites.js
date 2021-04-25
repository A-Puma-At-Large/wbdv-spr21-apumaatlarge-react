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
import favoritesService from "../../services/favorites-service"

const UserFavorites = () => {
  const {userId} = useParams();
  const [userFavorites, setFavorites] = useState({favorites:[]})
  // const [userFavorites, setFavorites] = useState([])
  useEffect(() => {
    console.log(userId)
    favoritesService.findFavoritesForUser(userId).then(
        favorites => {
          console.log(favorites)
          setFavorites({...userFavorites, favorites:[...favorites]})
          console.log(userFavorites , 111)
    })

    // favoritesService.findFavoritesForUser(userId).then(favorites => {
    //   setFavorites(...favorites)
    // })
    // console.log(userFavorites)
  },[])
  return (
      <div className={"container-fluid"}>
        <div>
          <h1>See your favorite artworks!</h1>
          <Link to={`/user/${userId}/homepage`} className='fas fa-times'/>
        </div>
        <table className="table">
          <thead>
          <tr className={"d-flex"}>
            <th >Favorites Item</th>
          </tr>
          </thead>
          <tbody>
            {userFavorites.favorites.map(
              (f) => { return (
                  <tr className={"d-flex"}>
                    <th ><Link to={`/artworks/${f.idOfArtwork}`}>{f.idOfArtwork}</Link></th>
                    <th className={"float-right"}>
                      <button className="fas fa-trash float-right" onClick={() =>
                      {
                        favoritesService.deleteFavoriteForUser(userId, f.fid).then(state =>{
                          const tmp = userFavorites.favorites.filter(t => t.fid !== f.fid)
                          console.log(tmp)
                          setFavorites({...userFavorites, favorites:tmp})
                        })
                      }}></button></th>
                  </tr>

              )
              }
              )}
          </tbody>
        </table>

        </div>
  )
}
export default UserFavorites