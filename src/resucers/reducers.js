let inc_page = 2;
let search_page = 2;
const reducer = ( state = [], action ) => {
    switch (action.type) {
        case 'ADD_INITIAL_PAGE':
            return {
                ...state,
                appReady: action.appReady
            }
        case 'ADD_INITIAL_PAGE_SEARCH':
            return {
                ...state,
                searchReady: action.searchReady
            }
        case 'ADD_PHOTOS':
            const newArr = [ ...state.photoList, ...action.photoList];
            return{
                ...state,
                photoList: newArr
            }   
        case 'CHANGE_PHOTOS':
            return{
                ...state,
                photoList: action.photoList
            }       
        case 'INC_PAGE':
            return {
                ...state,
                page: ++inc_page
            }
        case 'INC_SEARCH_PAGE':
            return {
                ...state,
                searchPage: ++search_page
            }
        case 'SEARCH':
            return {
                ...state,
                photoList: [],
                search: action.search
            }    
        case 'ADD_BIG_PHOTO':
            return {
                ...state,
                bigPhoto: action.bigPhoto
            }
        case 'INC_LIKES':
            const newLikesInc = +state.bigPhoto.likes + 1;
            let likedArrInc = [];
            likedArrInc = JSON.parse(localStorage.getItem('likedID')) || [];
            likedArrInc.push(action.likedID);
            localStorage.setItem('likedID',JSON.stringify(likedArrInc));
            return {
                ...state,
                likedID: likedArrInc,
                bigPhoto: {likes: newLikesInc},
            }
        case 'DEC_LIKES':
            const newLikesDec = parseFloat(state.bigPhoto.likes) - 1;
            let likedArrDec = [];
            likedArrDec = JSON.parse(localStorage.getItem('likedID')) || [];
            let index = likedArrDec.indexOf(action.likedID);
            likedArrDec.splice(index, 1);
            localStorage.setItem('likedID', JSON.stringify(likedArrDec));
            return {
                ...state,
                likedID: likedArrDec,
                bigPhoto: {likes: newLikesDec},   
            }
        case 'VISITED_PHOTO':
            return {
                ...state,
                justVisitedPhoto: action.justVisitedPhoto
            }
        default:
            return state;
    }
}

export default reducer;