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
import UserHomepage from "./components/user-table/user-homepage";
import PopularArtworks from "./components/popular-artworks";
import UserProfile from "./components/user-table/user-profile";
import UserFavorites from "./components/user-table/user-favorites";
import UserReviews from "./components/user-table/user-reviews";



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
            <Route exact={true} path={["/:userId/artworks/:artworkId"]}>
              <ArtworkDetails/>
            </Route>
            <Route exact={true} path={["/:userId/artworks/:artworkId/userReviews"]}>
              <UserReviewList />
            </Route>
            <Route exact={true} path={["/:userId/artworks/:artworkId/artworkReviews"]}>
              <ArtworkReviewList/>
            </Route>
            <Route exact={true} path={[
                "/home/admin",]}>
              <AdminHomepage/>
            </Route>
            <Route exact={true} path={[
              "/home/admin/user/:userId"]}>
              <UserReviewList/>
            </Route>
            <Route exact={true} path={[
              "/user/:userId/homepage",]}>
              <UserHomepage/>
            </Route>
            <Route exact={true} path={[
              "/user/:userId/profile",]}>
              <UserProfile/>
            </Route>
            <Route exact={true} path={["/user/:userId/search/:keyword"]}>
              <ArtworkList />
            </Route>
            <Route exact={true} path={["/user/:userId/favorites"]}>
              <UserFavorites/>
            </Route>
            <Route exact={true} path={["/user/:userId/reviews"]}>
              <UserReviews/>
            </Route>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
