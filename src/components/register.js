import React, {useState} from 'react'
import "./login.css"
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import userService from "../services/user-service"

const Register = (
    {    createUser,
        updateUser,
        deleteUser
    }) => {

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
                           placeholder="jhzhang.523@gmail.com"
                           id="username"
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
                           id="password"
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                    Verify Password
                </label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control"
                           id="password"
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                </label>
                <div className="col-sm-10">
                    <a className="btn btn-primary btn-block"
                       href="">Sign in</a>
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
                }))
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