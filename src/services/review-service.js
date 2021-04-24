const BASE_URL = "http://localhost:8080/api"
const REVIEW_BASE_URL = BASE_URL + "/reviews"
const USER_BASE_URL = BASE_URL + "/users"

const findReviewById = (reviewId) => fetch(`${REVIEW_BASE_URL}/${reviewId}`).then(response => response.json())

const findReviewsForUser = (userId) => fetch(`${BASE_URL}/users/${userId}/reviews`).then(response => response.json())

const findReviewsForArtwork = (artworkId) => fetch(`${BASE_URL}/artworks/${artworkId}/reviews`).then(response => response.json())

const createReview = (review) =>
    fetch(`${REVIEW_BASE_URL}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
    }).then(response => response.json())

const updateReview = (reviewId, newReview) =>
    fetch(`${REVIEW_BASE_URL}/${reviewId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newReview)
    }).then(response => response.json())

const deleteReview = (reviewId) =>
    fetch(`${REVIEW_BASE_URL}/${reviewId}`, {method: 'DELETE'}).then(response => response.json())

const findUserById = (userId) => fetch(`${USER_BASE_URL}/${userId}`).then(response => response.json())

const findUserFirstNamesWithReviews = (reviews) => {
  let userFirstNames = []
  for (let i = 0; i < reviews.length; i++) {
    let id = reviews[i].userId
    findUserById(id).then(actualUser => {
      userFirstNames.push(actualUser.firstName)
    })
  }
  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(userFirstNames)
    }, 250)
  })
  return promise
}

export default {
  findReviewById, findReviewsForUser, findReviewsForArtwork, createReview, updateReview, deleteReview,findUserFirstNamesWithReviews
}