import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Body } from '../../components';
import { switchImage } from '../../modules/actions';

const mapStateToProps = (state: any) => ({
  imageToShow: state.app.imageToShow
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchImage: (imageID: number) => dispatch(switchImage(imageID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
