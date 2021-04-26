import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import favoritesService from "../../services/favorites-service"
import reviewService from "../../services/review-service"
import "../user-table/user-profile.css"

const ArtworkCard = ({artworkId, imgSrc, title, artist, date}) => {
  const {userId} = useParams();
  const [isAddReview, setIsAddReview] = useState(false)
  const [cachedReview, setCachedReview] = useState("Type your review here")
  const prefix = `/${userId}`
  return (
      <div className="col-auto mb-3">
        <div style={{width: "18rem"}}>
          <img className="card-img-top" width={500} height={200} src={imgSrc}
               alt="Card image cap"/>
          <div className={"card-body"}>
            <div className={"row title-row"}>
              <div className={"col-auto"}>
              <Link to={`${userId == undefined || userId == "undefined" ? '' : prefix}/artworks/${artworkId}`}
                    className={"card-link"}>{title}</Link>
              </div>
              <div className={"col-auto float-right"}>
                <i className={"fas fa-heart"}
                   style={{"color" : "red"}}
                   onClick={() => {
                     favoritesService.createFavoriteForUser({userId: userId, idOfArtwork: artworkId}, userId)
                     alert(`Add favorite art item for user ${userId}`)
                   }}/>
              </div>

            </div>
            <ul>
              <li key={artist}>
                Artist: {artist}
              </li>
              <li key={date}>
                Date: {date}
              </li>
              { userId !== undefined && userId !== "undefined" &&
                <>
                  <li>
                    {/*<Link to={`/${userId}/artworks/${artworkId}/userReviews`}>Add Reviews</Link>*/}
                    {!isAddReview && <button className={"btn btn-sm btn-info"}
                        onClick={() => {setIsAddReview(true)}}>Add Reviews</button>}
                    {isAddReview && <>


                      <textarea className="form-control"
                                onChange={(e) => setCachedReview(e.target.value)}
                                value={cachedReview}
                      />

                      <i className={"fas fa-times"}
                         style={{paddingRight : "2%"}}
                         onClick={() => {
                        setIsAddReview(false)
                      }}/>

                      <i className={"fas fa-check"} onClick={() => {
                            reviewService.createReview({
                              userId: userId,
                              artworkId: artworkId,
                              comment: cachedReview
                            })
                      alert(`Add review for artwork ${title}!`)
                          setIsAddReview(false)
                          setCachedReview("Type your review here")
                      }}/>
                    </>}
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
  )
}

export default ArtworkCard