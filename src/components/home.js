import React from 'react'
import {Link, Route} from 'react-router-dom'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import Search from "./search";
import PopularArtworks from "./popular-artworks";
import artworkReducer from "../reducers/artwork-reducer";
import ArtworkDetails from "./artwork-details";
import userReducer from "../reducers/user-reducer";
import Register from "./register";
import Login from "./login";

const reducer = combineReducers({
  userReducer : userReducer,
  artworkReducer: artworkReducer
})

const store = createStore(reducer)

const Home = () => {
  return (
      <Provider store={store}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <h1>
              Art Institute of Chicago Artworks Review
            </h1>
          </div>
          <div className={"row"}>
            <div className={"col-8"}>
              <Search/>
            </div>
            <div className={"col-2"}>
              <div className={"row"}>
                  <Link to="/register" className="btn btn-outline-primary float-right">
                    Register
                  </Link>

                  <Link to="/login" className="btn btn-outline-primary float-right">
                    Sign in
                  </Link>
            </div>
            </div>
            {/*<div className={"col-2"}>*/}
            {/*  */}
            {/*</div>*/}
          </div>
          <div className={"row"}>
            <PopularArtworks page={1} limit={12}/>
          </div>
        </div>
      </Provider>
  )
}

export default Home