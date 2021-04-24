import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Search from "./components/search";
import ArtworkDetails from "./components/artwork-details";
import Home from "./components/home";
import React from 'react'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import artworkReducer from "./reducers/artwork-reducer";
import ArtworkList from "./components/artwork-list";
import Login from "./components/login";
import Register from "./components/register";
import UserReviewList from "./components/review-list/user-review-list";
import ArtworkReviewList from "./components/review-list/artwork-review-list";
import reviewReducer from "./reducers/review-reducer";
import userReducer from "./reducers/user-reducer";
import AdminHomepage from "./components/user-table/admin-homepage";



const reducer = combineReducers({
  artworkReducer: artworkReducer,
  reviewReducer: reviewReducer,
  userReducer : userReducer
})

const store = createStore(reducer)

function App() {
  return (
      <Provider store={store}>
        <div className="container-fluid">
          <BrowserRouter>
            <Route exact={true} path={"/"}>
              <Home />
            </Route>
            <Route exact={true} path={"/login"}>
              <Login/>
            </Route>

            <Route exact={true} path={"/register"}>
              <Register/>
            </Route>
            <Route exact={true} path={["/search/:keyword"]}>
              <ArtworkList />
            </Route>
            <Route exact={true} path={["/artworks/:artworkId"]}>
              <ArtworkDetails />
            </Route>
            <Route exact={true} path={["/:userId/artworks/:artworkId/userReviews"]}>
              <UserReviewList />
            </Route>
            <Route exact={true} path={["/:userId/artworks/:artworkId/artworkReviews"]}>
              <ArtworkReviewList />
            </Route>
            <Route exact={true} path={[
                "/home/admin",
            ]}>
              <AdminHomepage/>
            </Route>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
