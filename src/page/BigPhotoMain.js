import { connect } from 'react-redux';
import {BigPhoto} from '../components/BigPhoto';
import { addBigPhoto, incLikes, decLikes, visitedPhoto} from '../actions/index';

const mapStateToProps = (state) => {
    return {
        bigPhoto: state.bigPhoto,
        likedID: state.likedID
    
    }}
const MapDispatchToProps = (dispatch) => {
    return {
        addBigPhoto: (bigPhoto) => dispatch(addBigPhoto(bigPhoto)),
        incLikes: (bigPhoto, likedID) => dispatch(incLikes(bigPhoto, likedID)),
        decLikes: (bigPhoto, likedID) => dispatch(decLikes(bigPhoto, likedID)),
        visitedPhoto: (justVisitedPhoto) => dispatch(visitedPhoto(justVisitedPhoto)),
    }
} 

export default connect(
    mapStateToProps,
    MapDispatchToProps
)(BigPhoto);