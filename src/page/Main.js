import { connect } from 'react-redux';
import { ImgList } from '../components/ImgList';
import { addPhotos, incPage, addInitialPage, changePhoto } from '../actions/index';

const mapStateToProps = (state) => {
    return { state:state }
}
const MapDispatchToProps = (dispatch) => {
    return {
        addPhotos: (photoList) => dispatch(addPhotos(photoList)),
        incPage: (page) => dispatch(incPage(page)),
        addInitialPage: (appReady) => dispatch(addInitialPage(appReady)),
        changePhoto: (photoList) => dispatch(changePhoto(photoList))
    }
} 

export default connect(
    mapStateToProps,
    MapDispatchToProps
)(ImgList);
