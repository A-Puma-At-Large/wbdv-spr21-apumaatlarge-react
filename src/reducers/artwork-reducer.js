const initialState = {
  artworksWithKeyword: [],
  artworksWithKeywordComplete:[],
  popularArtworks:[],
  theArtwork: {},
  theImage: ""
}

const artworkReducer = (prevState= initialState, action) => {
  switch (action.type) {
    case "FIND_ARTWORK_BY_ID":
      return {
        ...prevState,
        theArtwork: action.theArtwork
      }
    case "FIND_ARTWORKS_BY_KEYWORD":
      return {
        ...prevState,
        artworksWithKeyword: action.artworksWithKeyword,
      }
    case "FIND_COMPLETE_ARTWORKS_BY_KEYWORD":
      return {
        ...prevState,
        artworksWithKeywordComplete: action.artworksWithKeywordComplete
      }
    case "FIND_PAGENATED_ARTWORKS":
      return {
        ...prevState,
        popularArtworks: action.popularArtworks
      }
    case "FIND_ARTWORK_IMAGE_BY_IMAGE_ID":
      return {
        ...prevState,
        theImage: action.theImage
      }
    default:
      return prevState
  }
}

export default artworkReducer