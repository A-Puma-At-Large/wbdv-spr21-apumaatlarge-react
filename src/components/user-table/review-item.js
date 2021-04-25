import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import artWorkService from "../../services/artwork-service"
import reviewService from "../../services/review-service"

const ReviewItem = (
    { review,userReviews, setUserReviews
    }) => {
  const [editing, setEditing] = useState(false)
  const [cachedItem, setCachedItem] = useState(review)
  const [artWorkName, setArtWorkName] = useState("undefined")
  useEffect(
      () => {
        artWorkService.findArtworkById(review.artworkId).then(a => console.log(
          setArtWorkName(a.data.title)
      ))},
      []
  )

  return (
      <>
        {!editing &&
          <tr className={"row"}>
            <td className={"col-2"}>{review.userId}</td>
            <td className={"col-3"}>{artWorkName}</td>
            <td className={"col-2"}>{review.artworkId}</td>
            <td className={"col-2"}>{cachedItem.comment}</td>
            <td className={"col-2"}>
              <i className={"fas fa-edit"} onClick={() => setEditing(true)}></i>
            </td>
          </tr>
        }
        {
          editing &&
          <tr className={"row"}>
            <td className={"col-2"}>{review.userId}</td>
            <td className={"col-3"}>{artWorkName}</td>
            <td className={"col-3"}>{review.artworkId}</td>
            <td className={"col-3"}>
              <input value={cachedItem.comment}
                     onChange={
                       (e) => {
                         setCachedItem({...cachedItem, comment:e.target.value}
                         )
                console.log(cachedItem)
              }}>
              </input>
            </td>
            <td className={"col-1"}>
              <></>
              <i className={"fas fa-check"}
                 onClick={() => {
                   reviewService.updateReview(review.reviewId, cachedItem).then(a => console.log(a))
                   setEditing(false)}}></i>
              <i className={"fas fa-times"} onClick={() => {
                reviewService.deleteReview(cachedItem.reviewId).then(a => console.log(a))
                const tmp = userReviews.filter(r => r.reviewId !== cachedItem.reviewId)
                setUserReviews([...tmp])

              }
              }></i>
            </td>
          </tr>
        }

      </>
  )
}

export default ReviewItem