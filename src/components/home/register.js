import React, {useState} from 'react'
import "./login.css"
import {Link, useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import userService from "../../services/user-service"
import {wrapMapToPropsConstant} from "react-redux/lib/connect/wrapMapToProps";

const Register = (
    {   createUser,
        updateUser,
        deleteUser
    }) => {
    const [cachedItem, setCachedItem] = useState(
        {username: "username",
        password : "password",
        role :"user"})
  const history = useHistory()
    return (
        <div className="container-fluid container-login">

            <br/>
            <div className={"login-image"}>
                <img
                    height={"120"}
                    width={"120"}
                    src={"https://idsb.tmgrup.com.tr/ly/uploads/images/2020/06/25/42895.jpg"}/>
            </div>
            <div className={"login-title"}>
                <h2>Create a new account</h2>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                    Username
                </label>
                <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           placeholder="username"
                           // id="username"
                           onChange={(e) =>{
                               setCachedItem({
                                   ...cachedItem,
                                   username: e.target.value
                               })}}
                           value={cachedItem.username}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                    Password
                </label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control"
                           // id="password"
                           onChange={(e) =>{
                               setCachedItem({
                                   ...cachedItem,
                                   password: e.target.value
                               })}}
                           value={cachedItem.password}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                    Email Address
                </label>
                <div className="col-sm-10">
                    <input type="email"
                           className="form-control"
                           // id="password"
                           onChange={(e) =>{
                               setCachedItem({
                                   ...cachedItem,
                                   email: e.target.value
                               })}}
                           value={cachedItem.email}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                </label>
                <div className="col-sm-10">

                    <button type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => {
                                let newUser = {...cachedItem, role: "User"}
                                userService.findUserByUserName(cachedItem.username)
                                // console.log(newUser, "test")
                                createUser(newUser)

                               }}>Register</button>
                    <div className="row">
                        <Link to="/login" className="col">
                            Login
                        </Link>
                        <Link to="/" className="col col-home">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>)
}

const stpm = (state) => {
    return {}
}

const dtpm = (dispatch) => {
    return {
        createUser: (user) => {
            userService.createUser(user)
                .then(user => dispatch({
                    type: "CREATE_USER",
                    user: user
                })).then(a => {
                  console.log(a)
                  if (a.user["Message:"] === "The user name has existed") {
                    alert("Username existed! Please change your username")
                  } else if(a.user.status === 500) {
                    alert("Internal Error 500! Please check your email format.")
                  } else {
                    alert("Create user successfully! You can login to your account right now")
                  }
            })
        },

        deleteUser: (user) =>
            userService.deleteUser(user.id)
                .then(status => dispatch({
                    type: "DELETE_User",
                    userToDelete: user
                })),
        updateUser: (user) =>
            userService.updateUser(user)
                .then(user => dispatch({
                    type: "UPDATE_user",
                    updatedUser : user
                })),
    }
}

export default connect(stpm, dtpm)(Register)