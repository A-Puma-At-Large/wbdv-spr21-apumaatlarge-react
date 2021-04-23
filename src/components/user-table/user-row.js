import React, {useState} from 'react'
import {Link} from "react-router-dom";

const UserRow = (
    {   deleteCourse,
        updateCourse,
        course,
        layout
    }) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(course.title)

    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: title
        }
        updateCourse(newCourse)
    }

  return (
      <div className="container-fluid">
      <div className="col-12 mx-auto table-container">
          <tr>
            <td className={"list-title-col d-lg-table-cell"} >
                <i className="far fa-file-alt col-md-auto text-primary"/>
                {
                    !editing &&
                    <Link to={`/courses/${layout}/edit/${course._id}`}>
                        {course.title}
                    </Link>
                }
                {
                    editing &&
                    <input
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                        className="form-control"/>
                }
            </td>
            <td class="list-title-col-content-1 d-none d-md-table-cell" >{course.owner}</td>
            <td class="list-title-col-content-1 d-none d-lg-table-cell" >{course.lastModified}</td>
              <td>
                  <Link  to={`/courses/${course._id}/quizzes`}>
                      Quizzes
                  </Link>
              </td>
              <td className="icon-col">
                  {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"/>}
                  {editing && <i onClick={() => saveTitle()} className="fas fa-check"/>}
              </td>
              <td className="icon-col">
                  {editing && <i onClick={() => {
                      deleteCourse(course)
                      setEditing(false)
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
