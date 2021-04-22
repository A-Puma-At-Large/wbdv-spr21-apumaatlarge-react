import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import artworkService from "../services/artwork-service"
import ArtworkCard from "./artwork-card";
import { withRouter } from "react-router";
import {useParams} from "react-router-dom";
import Search from "./search";

const ArtworkList = ({artworks=[],completeArtworks, findArtworksWithKeyword, findCompleteArtworksWithKeyword}) => {
  const {keyword} = useParams();

  useEffect(() => {
    findArtworksWithKeyword(keyword)
  }, [keyword])
  useEffect(() => {
    findCompleteArtworksWithKeyword(artworks)
    console.log(artworks)
    console.log(completeArtworks)
  }, [keyword, artworks])
  return (
      <div className={"container-fluid"}>
        <div className={"row"}>
          <Search/>
        </div>
        <div className={"row"}>
          <h2>
            Artworks with keyword "<span>{`${keyword}`}</span>"
          </h2>
        </div>
        <div className={"row mt-4"}>
          {completeArtworks.map((artwork) => {
            // findArtworkById(artwork.id).then(acturalArtwork => {setCompleteArtworkInfo(acturalArtwork) })
            // findArtworkById(artwork.id)
            // return <ArtworkCard artworkId={theArtwork.id}
            //                     artist={theArtwork.artist_title}
            //                     date={theArtwork.date_display}
            //                     dimensions={theArtwork.dimensions}
            //                     imgSrc={`https://www.artic.edu/iiif/2/${theArtwork.image_id}/full/843,/0/default.jpg`}
            //                     origion={theArtwork.place_of_origin}
            //                     title={theArtwork.title}/>
            return <ArtworkCard artworkId={artwork.id}
                         artist={artwork.artist_title}
                         date={artwork.date_display}
                         dimensions={artwork.dimensions}
                         imgSrc={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                         origion={artwork.place_of_origin}
                         title={artwork.title}/>

          })}

        </div>

      </div>
  )

}

const stpm = (state) => ({
  artworks: state.artworkReducer.artworksWithKeyword,
  completeArtworks: state.artworkReducer.artworksWithKeywordComplete,
})

const dtpm = (dispatch) => ({
  findArtworksWithKeyword: (keyword) => {
    artworkService.findArtworksByKeyword(keyword).then(artworks => {
      dispatch({
        type: "FIND_ARTWORKS_BY_KEYWORD",
        artworksWithKeyword: artworks.data,
      })
    })
  },
  findCompleteArtworksWithKeyword: (artworksInfo) => {
    const completeArtworks = artworkService.findCompleteArtworks(artworksInfo).then(completeArtworks => {
      dispatch({
        type:"FIND_COMPLETE_ARTWORKS_BY_KEYWORD",
        artworksWithKeywordComplete: completeArtworks
      })
    })

  },
  findArtworkById: (artworkId) => {
    artworkService.findArtworkById(artworkId).then(artwork => dispatch({
      type: "FIND_ARTWORK_BY_ID",
      theArtwork: artwork.data
    }))
  }
})

export default connect(stpm, dtpm)(ArtworkList)


// class ArtworkList extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//
//   state = {
//     keyword: "",
//     artworksByKeyword: [],
//     artworksCompleteInfo:[]
//   }
//
//   componentDidMount() {
//     this.state.keyword = this.props.match.params.keyword
//     artworkService.findArtworksByKeyword(this.state.keyword).then(artworkList => {
//       this.setState((prevState) => ({
//         ...prevState,
//         artworksByKeyword: artworkList
//       }))
//       console.log(artworkList)
//       this.state.artworksByKeyword = artworkList
//     })
//     console.log("artworksByKeyword: " + this.state.artworksByKeyword)
//   }
//
//   render() {
//     return (
//         <div className={"container-fluid"}>
//           <div className={"row"}>
//             <h1>
//               Artworks with keyword <span>{`${this.state.keyword}`}</span>
//             </h1>
//           </div>
//           {/*<div className={"row mt-4"}>*/}
//           {/*  {artworks.map((artwork) => <ArtworkCard artworkId={artwork.id}*/}
//           {/*                                          artist={artwork.artist_title}*/}
//           {/*                                          date={artwork.date_display}*/}
//           {/*                                          dimensions={artwork.dimensions}*/}
//           {/*                                          imgSrc={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}*/}
//           {/*                                          origion={artwork.place_of_origin}*/}
//           {/*                                          title={artwork.title}/>)}*/}
//
//           {/*</div>*/}
//
//         </div>
//     )
//   }
//
// }
//
// export default withRouter(ArtworkList)
