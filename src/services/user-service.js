const USER_LOGIN = "http://localhost:8080/api/login/user"
const ADMIN_LOGIN = "http://localhost:8080/api/login/admin"
const FIND_ALL_USER = "http://localhost:8080/api/find/users"
const USER_URL = "http://localhost:8080/api/users/"

const authenticateUser = (user) => fetch(USER_LOGIN).then(res => res.json())

const authenticateAdmin = (admin) => fetch(ADMIN_LOGIN).then(res => res.json())

const findUserById = (userId) => fetch(`${USER_URL}/${userId}`).then(response => response.json())

const findAllUsers = () => fetch(FIND_ALL_USER).then(response => response.json())

const createUser = (user) =>
    fetch(USER_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())


const updateUser = (user) =>
    fetch(USER_URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())


const deleteUser = (userId) =>
    fetch(`${USER_URL}/${userId}`, {method: 'DELETE'}).then(response => response.json())

export default {
  authenticateUser, findUserById,
  findAllUsers, createUser,
  updateUser, deleteUser, authenticateAdmin
}