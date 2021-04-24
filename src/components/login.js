import React, {useState} from 'react'
import "./login.css"
import {Link} from "react-router-dom";
import userService from "../services/user-service"
import {useHistory} from 'react-router-dom'




const Login = (
    {}) => {
    const [cachedItem, setCachedItem] = useState({username: "username",
                                                            password : "password",
                                                            role :"user"})
    const history = useHistory()
    const[user, setUser] = useState({})
    return (
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
                                console.log(cachedItem)
                                userService.authenticateAdmin(cachedItem).then(
                                    (isValid => {
                                        if (isValid === 0){
                                            alert("Admin Login, please check your username or password")
                                        } else {
                                            // jump to homepage
                                            alert("Logged in as admin")
                                            // eslint-disable-next-line no-restricted-globals
                                            history.push("/home/admin")
                                        }
                                    }))
                            }else if (cachedItem.role === "User") {
                                console.log(cachedItem)
                                userService.authenticateUser(cachedItem).then(
                                    (isValid => {
                                        if (isValid === 0) {
                                            alert("The password or the Username is not correct!")
                                        } else{
                                            //jump to homepage
                                            alert("Logged in")
                                            userService.findUserByUserName(cachedItem.username).then(user =>
                                            setUser(user))

                                            history.push("/") // remember to modify this route
                                        }
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
    </div>)

}


export default Login