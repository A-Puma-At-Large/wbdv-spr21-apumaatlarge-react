import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import artworkService from "../services/artwork-service";

const ArtworkDetails = ({theArtwork, findArtworkById}) => {
  const {artworkId} = useParams();


  useEffect(() => {
    if (artworkId !== undefined && typeof artworkId !== undefined) {
      findArtworkById(artworkId)
      console.log("theArtwork:" + theArtwork)
    }
    console.log("theArtwork:" + theArtwork)
  },[artworkId])


  return (
      <div className={"container-fluid"}>
        <div className={"float-center"}>
          <img src={`https://www.artic.edu/iiif/2/${theArtwork.image_id}/full/843,/0/default.jpg`}/>
        </div>
        <div className={"row"}>
          <h1>{theArtwork.title}</h1>
        </div>
        <div className={"row"}>
          {theArtwork.date_display}
        </div>
        <div className={"row"}>
          {theArtwork.artist_display}
        </div>
        <div className={"row"}>
          {theArtwork.place_of_origin}
        </div>
        {
          theArtwork.thumbnail !== undefined &&
          <div className={"row"}>
            <p>
              {theArtwork.thumbnail.alt_text}
            </p>
          </div>
        }

        <div className={"row"}>
          {theArtwork.medium_display}
        </div>
        <div className={"row"}>
          {theArtwork.dimensions}
        </div>
        <div className={"row"}>
          {theArtwork.main_reference_number}
        </div>
        <div className={"row"}>
          {theArtwork.credit_line}
        </div>

      </div>
  )
}

const stpm = (state) => ({
  theArtwork: state.artworkReducer.theArtwork
})

const dtpm = (dispatch) => ({
  findArtworkById: (artworkId) => {
    artworkService.findArtworkById(artworkId).then(theArtwork => dispatch({
      type: "FIND_ARTWORK_BY_ID",
      theArtwork: theArtwork.data
    }))
  }
})

export default connect(stpm, dtpm)(ArtworkDetails)
