const initialState = {
  theReview: null,
  reviews: [],
}

const reviewReducer = (prevState= initialState, action) => {
  switch (action.type) {
    case "FIND_REVEIW_BY_ID":
      return {
        ...prevState,
        theReview: action.theReview
      }
    case "FIND_REVEIWS_FOR_USER":
      return {
        ...prevState,
        reviews: action.reveiwsForUser,
      }
    case "FIND_REVIEWS_FOR_ARTWORK":
      return {
        ...prevState,
        reviews: action.reviewsForArtwork
      }
    case "CREATE_REVEIW":
      return {
        ...prevState,
        reviews: [
            ...prevState.reviews,
            action.review
        ]
      }
    case "UPDATE_REVIEW":
      return {
        ...prevState,
        reviews: prevState.reviews.map(review => {
          if (review.id === action.updatedReview.id) {
            return action.updatedReview
          } else {
            return review
          }
        })
      }
    case "DELETE_REVIEW":
      return {
        ...prevState,
        reveiws: prevState.reviews.filter(review => review.id !== action.reviewToDelete.id)
      }
    default:
      return prevState
  }
}

export default reviewReducer