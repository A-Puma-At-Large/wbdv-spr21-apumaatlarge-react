import React, {useState} from 'react'
import {Link} from "react-router-dom";

const UserRow = (
    {   deleteUser,
        user,
    }) => {

  return (
      <div className="container-fluid">
      <div className="col-12 mx-auto table-container">
          <tr>
            <td className={"list-title-col d-lg-table-cell"} >
                <i className="far fa-file-alt col-md-auto text-primary"/>
                {
                    <Link to={`/homepage/user/${user.id}`}>
                        {user.username}
                    </Link>
                }
            </td>
            <td class="list-title-col-content-1 d-none d-md-table-cell" >{user.email}</td>
              <td>
                  <Link  to={`/homepage/${user.id}/reviews`}>
                      Reviews
                  </Link>
              </td>
              <td className="icon-col">
                  {<i onClick={() => {
                      deleteUser(user)
                  }} className="fas fa-trash"/>
                  }
              </td>
              <td className="icon-col">
              </td>
          </tr>
      </div>
      </div>
  )
}
export default UserRow
