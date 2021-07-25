import { connect } from 'react-redux';
import { SearchForm } from '../components/SearchForm';
import { searchImg } from '../actions/index';

const mapStateToProps = (state) => {
    return { state: state }
}
const MapDispatchToProps = (dispatch) => {
    return {
        searchImg: (search) => dispatch(searchImg(search))
    }
} 

export default connect(
    mapStateToProps,
    MapDispatchToProps
)(SearchForm);
