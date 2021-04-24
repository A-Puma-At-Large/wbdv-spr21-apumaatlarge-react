import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import reviewService from "../../services/review-service";

const ArtworkReviewList = ({
  userId,
  artworkId,
  reviews,
  userFirstNames,
  findUserFirstNamesWithReviews,
  createReview,
  updateReview,
  deleteReview,
  findReviewsForArtwork,
}) => {

  useEffect(() => {
    findReviewsForArtwork(artworkId)
  }, [artworkId])
  useEffect(() => {
    findUserFirstNamesWithReviews(reviews)
  }, [artworkId, reviews])

  const [reviewContent, setReviewContent] = useState("")
  const [editing, setEditing] = useState(false)

  return (<div className={"container-fluid"}>
    <br/>
    <div className={"row"}>
      <textarea className={"form-control"}
                value={reviewContent}
                placeholder={"Add your comment here."}
                onChange={(e) => {
                  setReviewContent(e.target.value)
                }}>
      </textarea>
    </div>
    <br/>
    <div className={'row'}>
      <button className={"btn btn-primary"}
              onClick={() => createReview(userId, artworkId, reviewContent)}>
        Submit
      </button>
    </div>
    <br/>

    <h3>Reviews for this artwork:</h3>

    <table className="table">
      <thead>
      <tr className={"d-flex"}>
        <th className={"col-lg-2 text-center"}>From</th>
        <th className={"col-lg-10 text-center"}>Comments</th>
      </tr>
      </thead>
      <tbody>
      {reviews.map((review, idx) => {
        return (<tr className={"d-flex"}>
          <td className={"col-lg-2 text-left"}>
            <Link to={`/artworks/${review.artworkId}`}>
              {userFirstNames[idx]}
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
  userFirstNames: state.reviewReducer.userFirstNames
})

const dtpm = (dispatch) => {
  return {
    findUserFirstNamesWithReviews: (reviews) => {
      reviewService.findUserFirstNamesWithReviews(reviews).then(userFirstNames => dispatch({
        type: "FIND_USER_FIRST_NAMES_WITH_REVIEWS",
        userFirstNames: userFirstNames
      }))
    },
    createReview: (userId, artworkId, comment) => {
      reviewService.createReview({userId: userId, artworkId: artworkId, comment: comment}).then(actualReview => dispatch({
        type: "CREATE_REVIEW",
        review: actualReview
      }))
    },
    findReviewsForArtwork: (artworkId) => {
      reviewService.findReviewsForArtwork(artworkId).then(reviews => dispatch({
        type: "FIND_REVIEW_FOR_ARTWORK",
        reviewsForArtwork: reviews
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
    }
  }

}

export default connect(stpm, dtpm)(ArtworkReviewList)