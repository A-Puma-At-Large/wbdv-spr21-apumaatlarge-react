import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import reviewService from '../../services/review-service'
import artworkService from "../../services/artwork-service";

const UserReviewList = ({
  artworkId,
  reviews,
  artworkTitles,
  findArtworkTitlesWithReviews,
  createReview,
  updateReview,
  deleteReview,
  findReviewsForUser,
  findReviewsForArtwork,
}) => {

  const {userId} = useParams()
  const [userReviews, setUserReviews] = useState([])
  useEffect(()=> {
    reviewService.findReviewsForUser(userId).then(r => {
      setUserReviews([...r])
    })
  }, [userId])
  // useEffect(() => {
  //   findArtworkTitlesWithReviews(userReviews)
  // }, [userId, userReviews])

  const [reviewContent, setReviewContent] = useState("")
  const [editing, setEditing] = useState(false)

  return (<div className={"container-fluid"}>
    <br/>

    <h3>User's reviews:</h3>

    <table className="table">
      <thead>
        <tr className={"d-flex"}>
          <th className={"col-lg-2 text-left"}>Artwork Id</th>
          <th className={"col-lg-10 text-left"}>Comments</th>
        </tr>
      </thead>
      <tbody>
        {userReviews.map((review, idx) => {
          return (<tr className={"d-flex"}>
            <td className={"col-lg-2 text-left"}>
              <Link to={`/artworks/${review.artworkId}`}>
                {review.artworkId}
              </Link>
            </td>
            <td className={"col-lg-9 text-left"}>
              {!editing && review.comment}
              {editing && <input
                  className={"form-control"}
                  onChange={(e) => setReviewContent(e.target.value)}
                  value={reviewContent}
                  placeholder={review.comment}
                  type={"text"}/>}
            </td>
            <td className={"col-lg-1 text-left"}>
              {!editing && <button className={"btn btn-primary"} onClick={() => setEditing(true)}>
                Edit
              </button>}
              {editing && <button onClick={() => deleteReview(review)}>
                Delete
              </button>} &nbsp;
              {editing && <button onClick={() => {
                setEditing(false)
                updateReview({
                  ...review,
                  comment: reviewContent
                })
              }}>
                Ok
              </button>}
            </td>
          </tr>)
        })}
      </tbody>
    </table>

  </div>)


}

const stpm = (state) => ({
  reviews: state.reviewReducer.reviews,
  artworkTitles: state.artworkReducer.artworkTitles
})

const dtpm = (dispatch) => {
  return {
    createReview: (userId, artworkId, comment) => {
      reviewService.createReview({userId: userId, artworkId: artworkId, comment: comment}).then(actualReview => dispatch({
        type: "CREATE_REVIEW",
        review: actualReview
      }))
    },
    findReviewsForUser: (userId) => {
      reviewService.findReviewsForUser(userId).then(reviews => dispatch({
        type: "FIND_REVIEW_FOR_USER",
        reviewsForUser: reviews
      }))
    },
    updateReview: (review) => {
      reviewService.updateReview(review.id, review).then(status => dispatch({
        type: "UPDATE_REVIEW",
        updatedReview: review
      }))
    },
    deleteReview: (review) => {
      reviewService.deleteReview(review.id).then(status => dispatch({
        type: "DELETE_REVIEW",
        reviewToDelete: review
      }))
    },
    findArtworkTitlesWithReviews: (reviews) => {
      artworkService.findArtworkTitlesWithReviews(reviews).then(artworkTitles => dispatch({
        type: "FIND_ARTWORK_TITLES_WITH_REVIEWS",
        artworkTitles: artworkTitles
      }))
    }
  }

}

export default connect(stpm, dtpm)(UserReviewList)