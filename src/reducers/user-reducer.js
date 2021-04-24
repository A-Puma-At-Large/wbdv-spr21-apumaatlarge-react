const initialState = {
  users: []
}

const userReducer = (prevState= initialState, action) => {
  switch (action.type) {
    case "FIND_ALL_USERS":
      return {
        ...prevState,
        users: action.users
      }
    case "CREATE_USER":
      return {
        ...prevState,
        users: [
          ...prevState.users,
          action.user
        ]
      }

    case "FIND_USER_BY_USERNAME":
      return {
        ...prevState,
        user: action.user
      }


    case "UPDATE_USER":
      return {
        ...prevState,
        users: prevState.users.map(user => {
          return user.id === action.updatedUser.id ? action.updatedUser : user;
        })
      }

    case "DELETE_USER":
      return {
        ...prevState,
        users: prevState.users.filter(user => user.id !== action.userToDelete.id)
      }

    default:
      return prevState
  }
}

export default userReducer