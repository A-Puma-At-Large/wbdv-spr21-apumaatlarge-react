const initialState = {
  theReview: null,
  reviews: [],
  userFirstNames:[]
}

const reviewReducer = (prevState= initialState, action) => {
  switch (action.type) {
    case "FIND_REVIEW_BY_ID":
      return {
        ...prevState,
        theReview: action.theReview
      }
    case "FIND_REVIEW_FOR_USER":
      return {
        ...prevState,
        reviews: action.reviewsForUser,
      }
    case "FIND_REVIEWS_FOR_ARTWORK":
      return {
        ...prevState,
        reviews: action.reviewsForArtwork
      }
    case "CREATE_REVIEW":
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
        reviews: prevState.reviews.filter(review => review.id !== action.reviewToDelete.id)
      }
    case "FIND_USER_FIRST_NAMES_WITH_REVIEWS":
      return {
        ...prevState,
        userFirstNames: action.userFirstNames
      }

    default:
      return prevState
  }
}

export default reviewReducer