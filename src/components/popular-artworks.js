import React, {useEffect} from 'react'
import {connect} from "react-redux"
import artworkService from "../services/artwork-service"
import ArtworkCard from "./artwork-card";


const PopularArtworks = ({page, limit, artworks=[], findPaginatedArtworks}) => {
  useEffect(() => {
    findPaginatedArtworks(page, limit)
  }, [page, limit])
  return (
      <div className={"container-fluid"}>
        <div className={"row"}>
          <h2>
            Popular Artworks
          </h2>
        </div>
        <div className={"row mt-4"}>
          {artworks.map((artwork) => <ArtworkCard artworkId={artwork.id}
                                                  artist={artwork.artist_title}
                                                  date={artwork.date_display}
                                                  dimensions={artwork.dimensions}
                                                  imgSrc={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                                  origion={artwork.place_of_origin}
                                                  title={artwork.title}/>)}

        </div>

      </div>
  )

}

const stpm = (state) => ({
  artworks: state.artworkReducer.popularArtworks
})

const dtpm = (dispatch) => ({
  findPaginatedArtworks: (page, limit) => {
    artworkService.findPaginatedArtworks(page, limit).then(paginatedArtworks => dispatch({
      type: "FIND_PAGENATED_ARTWORKS",
      popularArtworks: paginatedArtworks.data
    }))
  }
})

export default connect(stpm, dtpm)(PopularArtworks)