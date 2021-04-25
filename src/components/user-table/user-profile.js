import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import userService from "../../services/user-service"
import "./admin-homepage.css"
import EditableItem from "./editable-item"
import {Link,useParams} from 'react-router-dom'

const UserProfile = () => {
  const {userId} = useParams()
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    console.log(user)
    userService.findUserById(userId).then(user => setUser(user))
  }, [])
return(
   <>
     {
  !isEditing &&
  <>
    <div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputPassword6"
                 className="col-form-label">User Name</label>
        </div>
        <div className="col-auto">
          <input id={"firstName"} disabled value={user.username} className={"form-control"}></input>
        </div>
        <div className="col-auto">
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputPassword6"
                 className="col-form-label">First Name</label>
        </div>
        <div className="col-auto">
          <input id={"firstName"} disabled value={user.firstName} className={"form-control"}></input>
        </div>
        <div className="col-auto">
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputPassword6"
                 className="col-form-label">Last Name</label>
        </div>
        <div className="col-auto">
          <input id={"firstName"} disabled value={user.lastName} className={"form-control"}></input>
        </div>
        <div className="col-auto">
        </div>
      </div>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputPassword6"
                 className="col-form-label">Email    </label>
        </div>
        <div className="col-auto">
          <input id={"firstName"} disabled value={user.email} className={"form-control"}></input>
        </div>
        <div className="col-auto">
        </div>
      </div>
      <button onClick={()=> setIsEditing(true)}>Update Profile</button>
    </div>
    <Link to={`/user/${user.id}/homepage`}>Go back to homepage</Link>
  </>
}
  {isEditing &&
  <>
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6"
               className="col-form-label">User Name</label>
      </div>
      <div className="col-auto">
        <input id={"firstName"}
               onChange={(e) =>
                   setUser({
                     ...user,
                     username: e.target.value
                   })}
               className={"form-control"} value={user.username}></input>
      </div>
      <div className="col-auto">
      </div>
      <span id="passwordHelpInline" className="form-text">
      Cannot be empty!
    </span>
    </div>
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6"
               className="col-form-label">Fisrt Name</label>
      </div>
      <div className="col-auto">
        <input id={"firstName"} value={user.firstName}
               onChange={(e) =>
                   setUser({
                     ...user,
                     firstName: e.target.value
                   })}
               className={"form-control"}></input>
      </div>
      <div className="col-auto">
      </div>
    </div>
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6"
               className="col-form-label">Last Name</label>
      </div>
      <div className="col-auto">
        <input id={"firstName"} value={user.lastName}
               onChange={(e) =>
                   setUser({
                     ...user,
                     lastName: e.target.value
                   })}
               className={"form-control"}></input>
      </div>
      <div className="col-auto">
      </div>
    </div>
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6"
               className="col-form-label">Password</label>
      </div>
      <div className="col-auto">
        <input type={"password"} id={"inputPassword6"} value={user.password}
               onChange={(e) =>
                   setUser({
                     ...user,
                     password: e.target.value
                   })}
               className={"form-control"}></input>
      </div>
      <div className="col-auto">
        {/*<span id="passwordHelpInline" className="form-text">*/}
        {/*  Must be 8-20 characters long.*/}
        {/*</span>*/}
      </div>

    </div>
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <label htmlFor="inputPassword6"
               className="col-form-label">User Email</label>
      </div>
      <div className="col-auto">
        <input id={"firstName"} value={user.email}
               onChange={(e) =>
                   setUser({
                     ...user,
                     email: e.target.value
                   })}
               className={"form-control"}></input>
      </div>
      <div className="col-auto">
      </div>
    </div>
    <button onClick={()=> {
      userService.updateUser(user).then(user => console.log(user))
      setIsEditing(false)
    }}>Submit</button>
  </>
  }
</>
)
}

export default UserProfile