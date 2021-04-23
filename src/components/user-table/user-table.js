import UserRow from "./user-row";
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import userService from "../../services/user-service"

const UserTable = (
    users = [],
    findAllUsers,
    deleteUser
) => {
    useEffect(() => {
        findAllUsers()
    }, [users])
    return (
                <div>
                    <nav className="navbar navbar-expand-lg bg-light sticky-top">
                        <div className="container-fluid">
                            <div className="col-12 mx-auto table-container">
                                <table className="table">
                                    <tr>
                                        <th scope="col"
                                            className="list-title-col d-lg-table-cell">Username
                                        </th>
                                        <th scope="col"
                                            className="list-title-col-1 d-none d-md-table-cell">Email
                                        </th>

                                        <td></td>

                                    </tr>
                                </table>
                            </div>
                        </div>
                    </nav>

                    <table className="table">
                        <tbody>{
                            users.map((user) =>
                                <UserRow
                                    deleteUser={deleteUser}
                                    user={user}
                                />)
                        }
                        </tbody>
                    </table>
                </div>
            )
}

const stpm = (state) => {
    return {
        users: state.userReducer.users
    }
}
const dtpm = (dispatch) => {
    return {
        findAllUsers: () => {
            userService.findAllUsers()
                .then(theUsers => dispatch({
                    type: "FIND_ALL_USERS",
                    users: theUsers
                }))
        },
        deleteUser: (user) =>
            userService.deleteUser(user.id)
                .then(status => dispatch({
                    type: "DELETE_USER",
                    userToDelete: user
                })),

    }
}

export default connect(stpm, dtpm)(UserTable)
