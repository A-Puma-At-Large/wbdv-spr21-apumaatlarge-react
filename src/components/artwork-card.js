import React from 'react'
import {Link} from 'react-router-dom'

const ArtworkCard = ({artworkId, imgSrc, title, artist, date}) => {
  return (
      <div className="col-auto mb-3">
        <div style={{width: "18rem"}}>
          <img className="card-img-top" width={500} height={200} src={imgSrc}
               alt="Card image cap"/>
          <div className={"card-body"}>
            <Link to={`/artworks/${artworkId}`} className={"card-link"}>{title}</Link>
            <ul>
              <li key={artist}>
                Artist: {artist}
              </li>
              <li key={date}>
                Date: {date}
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default ArtworkCard