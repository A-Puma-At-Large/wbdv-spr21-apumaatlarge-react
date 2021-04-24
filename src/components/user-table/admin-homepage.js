import {Link} from "react-router-dom";
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import userService from "../../services/user-service"
import "./admin-homepage.css"


const AdminHomepage = (
    {
        users = [],
        findAllUsers,
        deleteUser,
        history
    }) => {
    useEffect(() => {findAllUsers()}, [findAllUsers])

    return(
    <div className={"container-fluid"}>
        <table className="table">
            <thead className="table-primary">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">

                </th>
            </tr>
            </thead>
            <tbody>

            {users.map(user =>
                <tr>
                    <th scope="row">{user.id}</th>
                    <td>
                        <Link to={`/home/admin/user/${user.id}`}>
                            {user.username}
                        </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.firstName + " " + user.lastName}</td>
                    <td> <button
                        onClick={() => {
                        deleteUser(user)
                    }} className="btn-outline-primary fas fa-trash"/>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </div>)}

const stpm = (state) => {
    return {
        users: state.userReducer.users
    }   
}
const dtpm = (dispatch) => {
    return {
        findAllUsers: () => {
            userService.findAllUsers()
                .then(users => dispatch({
                    type: "FIND_ALL_USERS",
                    users: users
                }))
        },
        deleteUser : (user) => {
            console.log(user.username)
            userService.deleteUser(user.id).then(
                status => dispatch({
                    type : "DELETE_USER",
                    userToDelete : user
                })
            )
        },

        createUser: (user) => {
        userService.createUser(user).then(status => dispatch({
            type : "CREATE_USER",
            user : user
        }))
    }}
}

export default connect(stpm, dtpm)(AdminHomepage)
