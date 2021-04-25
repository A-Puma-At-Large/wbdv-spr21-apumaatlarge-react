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
import reviewService from "../../services/review-service"
import ReviewItem from "./review-item";
const UserReviews = () => {
  const {userId} = useParams()
  const [userReviews, setUserReviews] = useState([])
  useEffect(
      () => {
        console.log(userId)
        reviewService.findReviewsForUser(userId).then(
            r => {
              setUserReviews([...r])
            })

        // favoritesService.findFavoritesForUser(userId).then(favorites => {
        //   setFavorites(...favorites)
        // })
        // console.log(userFavorites)
      },[])
  return(
      <div className={"container-fluid"}>
        <table className="table">
          <thead>
          <tr className={"row"}>
            <th className={"col-2"}>User Id</th>
            <th className={"col-3"}>Artwork Title</th>
            <th className={"col-2"}>Artwork Id</th>
            <th className={"col-2"}>Comments</th>
            <th className={"col-3"}></th>
          </tr>
          </thead>
          <tbody>
          {userReviews.map((r) => {
            console.log(r)
            return (<ReviewItem review={r} userReviews={userReviews} setUserReviews={setUserReviews}></ReviewItem>)
          })}
          </tbody>
        </table>
      </div>
  )
}

export default UserReviews