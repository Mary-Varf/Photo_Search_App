export const addInitialPage = (appReady) => ({
    type: 'ADD_INITIAL_PAGE',
    appReady
})
export const addInitialPageSearch = (searchReady) => ({
    type: 'ADD_INITIAL_PAGE_SEARCH',
    searchReady
})
export const addPhotos = (photoList) => ({
    type: 'ADD_PHOTOS',
    photoList
})
export const changePhoto = (photoList) => ({
    type: 'CHANGE_PHOTOS',
    photoList
})
export const incPage = (page) => ({
    type: 'INC_PAGE',
    page
})
export const incSearchPage = (searchPage) => ({
    type: 'INC_SEARCH_PAGE',
    searchPage
})
export const searchImg = (search, photoList = []) => ({
    type: 'SEARCH',
    photoList,
    search
})
export const addBigPhoto =(bigPhoto) => ({
    type: 'ADD_BIG_PHOTO',
    bigPhoto
})

export const incLikes = (bigPhoto, likedID) => ({
    type: 'INC_LIKES',
    bigPhoto,
    likedID
})
export const decLikes = (bigPhoto, likedID) => ({
    type: 'DEC_LIKES',
    bigPhoto,
    likedID
})
export const visitedPhoto = (justVisitedPhoto) => ({
    type: 'VISITED_PHOTO',
    justVisitedPhoto
})
