const USER_LOGIN = "https://a-puma-at-large-server-java.herokuapp.com/api/login/user"
const ADMIN_LOGIN = "https://a-puma-at-large-server-java.herokuapp.com/api/login/admin"
const FIND_ALL_USER = "https://a-puma-at-large-server-java.herokuapp.com/api/find/users"
const USER_URL = "https://a-puma-at-large-server-java.herokuapp.com/api/users"

const authenticateUser = (user) => fetch(USER_LOGIN, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(user)
}).then(response => {
    return response.status !== 200? 0:1
})


const authenticateAdmin = (admin) => fetch(ADMIN_LOGIN,{
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(admin)
}).then(response => {
    return response.status !== 200? 0:1
})


const findUserByUserName = (username) => fetch(`${USER_URL}/username/${username}`).then(response => {

  return response.json()
    })

const findUserById = (userId) => fetch(`${USER_URL}/${userId}`).then(response => {
  return response.json()
})

const findAllUsers = () => {
    return fetch(FIND_ALL_USER).then(response => response.json())}

const createUser = (user) =>
    fetch(USER_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())


const updateUser = (user) => {

    console.log("updating user", user)
    return fetch(`${USER_URL}/${user.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
}


const deleteUser = (userId) =>
    fetch(`${USER_URL}/${userId}`, {method: 'DELETE'}).then(response => response.json())

// eslint-disable-next-line import/no-anonymous-default-export
const apis = {
  authenticateUser, findUserByUserName,
  findAllUsers, createUser,
  updateUser, deleteUser, authenticateAdmin,
  findUserById
}

export default apis