import React, {useState} from 'react'
import "./login.css"
import {Link} from "react-router-dom";
import userService from "../services/user-service"
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import userReducer from "../reducers/user-reducer";
import artworkReducer from "../reducers/artwork-reducer";

const reducer = combineReducers({
    userReducer : userReducer,
    artworkReducer : artworkReducer
})

const store = createStore(reducer)

const Login = (
    {   to="/",
        deleteItem,
        updateItem,
        item,
        active
    }) => {
    const [userLogin, setUserLogin] = useState(false)
    const [q, setAdminLogin] = useState(false)
    const [cachedItem, setCachedItem] = useState({username: "username",
                                                            password : "password",
                                                            role :"user"})
    return (

        <Provider store={store}>
        <div className="container-fluid container-login">

        <br/>
        <div className={"login-image"}>
            <img
            height={"120"}
            width={"120"}
            src={"https://www.artic.edu/iiif/2/3c27b499-af56-f0d5-93b5-a7f2f1ad5813/full/843,/0/default.jpg"}/>
        </div>
        <div className={"login-title"}>
            <h2>Please Login</h2>
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
                       id="password"
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
                    Role
                </label>
                <div className="col-sm-10">
                    <select
                        onChange={(e) => {
                            setCachedItem({
                                ...cachedItem,
                                role: e.target.value
                            })
                        }}
                         className="form-control">
                        <option value={"Admin"}>Admin</option>
                        <option value={"User"}>User</option>
                    </select>
                </div>
            </div>

        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">
            </label>
            <div className="col-sm-10">
                <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => {
                            if (cachedItem.role === "Admin"){
                                userService.authenticateAdmin(cachedItem).then(
                                    (isValid => {
                                        if (!isValid)
                                            alert("The password or the Username is not correct!")
                                        setAdminLogin(isValid)
                                    }))
                            }else if (cachedItem.role === "User") {
                                userService.authenticateUser(cachedItem).then(
                                    (isValid => {
                                        if (!isValid)
                                            alert("The password or the Username is not correct!")
                                        setUserLogin(isValid)
                                    }))
                            }}}>Login</button>

                <div className="row">
                    <Link to="/register" className="col">
                        Register
                    </Link>
                    <Link to="/" className="col col-home">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </Provider>)
}
export default Login