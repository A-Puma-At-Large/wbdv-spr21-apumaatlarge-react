import React, {useState} from 'react'
import {Link} from "react-router-dom";

const EditableItem = (
    {   to="/",
        deleteUser,
        updateUser,
        user,
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(user)

    return (
        <div className={"row col-12 mx-auto"}>
            {
                !editing && <>
                    <td className={"col-md-2"}>{user.id}</td>
                    <td className={"col-md-2"}>
                        <Link to={to}>
                        {user.username}
                        </Link>
                    </td>
                    <td className={"col-md-2"}>{user.email}</td>
                    <td className={"col-md-2"}>{user.firstName}</td>
                    <td className={"col-md-2"}>{user.lastName}</td>
                    <td className={"col-md-2"}>
                        <button
                            onClick={() => {
                            deleteUser(user)
                            }} className="btn-outline-primary fas fa-trash"/>
                        <button onClick={() => {
                                 setEditing(true)}
                        } className="btn-outline-primary fas fa-edit"/>
                    </td>
                </>

            }
            {
                editing &&
                <div className={"row active"}>
                    <td >{user.id}</td>
                    <td>
                        <input
                            onChange={(e) =>
                                setCachedItem({
                                    ...cachedItem,
                                    username: e.target.value
                                })}
                            value={cachedItem.username}
                            placeholder={user.username}
                        />
                    </td>
                    <td>
                        <input
                            onChange={(e) =>
                                setCachedItem({
                                    ...cachedItem,
                                    email: e.target.value
                                })}
                            value={cachedItem.email}
                            placeholder={user.email}
                        />
                    </td>
                    <td>  <input
                        onChange={(e) =>
                            setCachedItem({
                                ...cachedItem,
                                firstName: e.target.value
                            })}
                        value={cachedItem.firstName}
                        placeholder={user.firstName}
                    /></td>
                    <td>
                        <input
                            onChange={(e) =>
                                setCachedItem({
                                    ...cachedItem,
                                    lastName: e.target.value
                                })}
                            value={cachedItem.lastName}
                            placeholder={user.lastName}/>
                    </td>
                    <td>
                        <i onClick={() => {
                            setEditing(false)
                            updateUser({
                                ...cachedItem,
                                id : user.id
                            })
                            setCachedItem(cachedItem)
                        }} className="fas fa-check float-right"/>
                    </td>

                </div>
            }
        </div>
    )
}

export default EditableItem