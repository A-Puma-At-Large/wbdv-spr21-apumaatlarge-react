const BASE_URL = "https://a-puma-at-large-server-java.herokuapp.com/api"
const REVIEW_BASE_URL = BASE_URL + "/reviews"
const USER_BASE_URL = BASE_URL + "/users"

const findFavoritesForUser = (userId) => fetch(`${BASE_URL}/users/${userId}/favorites`).then(response => response.json())
const deleteFavoriteForUser = (userId,fid) => fetch(`${BASE_URL}/users/${userId}/${fid}`, {method: 'DELETE'}).then(response => response.json())
const createFavoriteForUser = (fav, userId) =>
    fetch(`${BASE_URL}/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(fav)
    }).then(response => response.json())
const api = {findFavoritesForUser, deleteFavoriteForUser,createFavoriteForUser}
export default api