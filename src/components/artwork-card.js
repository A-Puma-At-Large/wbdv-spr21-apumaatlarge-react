import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import favoritesService from "../services/favorites-service"
import reviewService from "../services/review-service"

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
            <Link to={`${userId == undefined || userId == "undefined" ? '' : prefix}/artworks/${artworkId}`} className={"card-link"}>{title}</Link>
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
                    <button onClick={() => {
                      favoritesService.createFavoriteForUser({userId: userId, idOfArtwork: artworkId}, userId)
                      alert(`Add favorite art item for user ${userId}`)
                    }
                    }>Add Favorites</button>
                  </li>
                  <li>
                    {/*<Link to={`/${userId}/artworks/${artworkId}/userReviews`}>Add Reviews</Link>*/}
                    {!isAddReview && <button onClick={() => {setIsAddReview(true)}}>Add Reviews</button>}
                    {isAddReview && <>
                      <input value={cachedReview} onChange={(e) => setCachedReview(e.target.value)}></input>
                      <i className={"fas fa-times"} onClick={() => {
                        setIsAddReview(false)
                      }}></i>
                      <i className={"fas fa-check"} onClick={() => {
                        reviewService.createReview({
                          userId: userId,
                          artworkId: artworkId,
                          comment: cachedReview
                        })
                        alert(`Add review for artwork ${title}!`)
                        setIsAddReview(false)
                        setCachedReview("Type your review here")
                      }
                      }></i>
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