import React from 'react'
import UserRow from "./user-row";
import {Link} from "react-router-dom";

export default class UserTable
  extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
          <nav className="navbar navbar-expand-lg bg-light sticky-top">
              <div className="container-fluid">
                  <div className="col-12 mx-auto table-container">
                      <table className="table">
                          <tr>
                              <th scope="col"
                                  className="list-title-col d-lg-table-cell">Title
                              </th>
                              <th scope="col"
                                  className="list-title-col-1 d-none d-md-table-cell">Owned By
                              </th>
                              <th scope="col"
                                  className=" list-title-col-1 d-none d-lg-table-cell">Last modified by me
                              </th>
                              <td> </td>
                              <th scope="col"
                                  className="icon-col">
                                  <a href="#">
                                      <i className="fas fa-folder"/>
                                  </a>
                              </th>
                              <th scope="col"
                                  className="icon-col">
                                  <a href="#">
                                      <i className="fas fa-sort-alpha-down"/>
                                  </a>
                              </th>
                              <th scope="col"
                                  className="icon-col">
                                  <Link to="/courses/grid">
                                      <i className="fas fa-th"/>
                                  </Link>
                              </th>

                          </tr>
                      </table>
                  </div>
              </div>
          </nav>

        <table className="table">
          <tbody>{
            this.props.courses.map((course) =>
              <UserRow
                updateCourse={this.props.updateCourse}
                deleteCourse={this.props.deleteCourse}
                key={course._id}
                course={course}
                title={course.title}
                owner={course.owner}
                lastModified={course.lastModified}
                layout = {this.props.layout}
              />)
          }
          </tbody>
        </table>
      </div>
    )
  }
}
