const AICA_BASE_URL = "https://api.artic.edu/api/v1/artworks"
const IIIF_IMAGE_BASE_URL = "https://www.artic.edu/iiif/2"
const IIIF_IMAGE_SUFFIX = "/full/843,/0/default.jpg"

const findArtworkById = (artworkId) => fetch(`${AICA_BASE_URL}/${artworkId}`).then(response => response.json())

const findArtworksByKeyword = (keyword) => fetch(`${AICA_BASE_URL}/search?q=${keyword}`).then(response => response.json())

const findPaginatedArtworks = (page, limit) => fetch(`${AICA_BASE_URL}?page=${page}&limit=${limit}`).then(response => response.json())

const findArtworkImageByImageId = (imageId) => fetch(`${IIIF_IMAGE_BASE_URL}/${imageId}/${IIIF_IMAGE_SUFFIX}`).then(response => response.json())

const findCompleteArtworks = (artworksInfo) => {

  let completeInfo = []
  for (let i = 0; i < artworksInfo.length; i++) {
    let _id = artworksInfo[i].id
    findArtworkById(_id).then(actualArtwork => {
      completeInfo.push(actualArtwork.data)
      console.log(completeInfo.length)
    })
  }
  let promise = new Promise((resolve, reject) => {
    // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
    // In this example, we use setTimeout(...) to simulate async code.
    // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout( function() {
      resolve(completeInfo)  // Yay! Everything went well!
    }, 250)
  })
  return promise
}

export default {
  findArtworkById, findArtworksByKeyword, findPaginatedArtworks, findArtworkImageByImageId, findCompleteArtworks
}