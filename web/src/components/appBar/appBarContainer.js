import { drawerToggle} from '../../actions';

export const mapToProps = () => {
  return {};
};

export const mapToDispatch = dispatch => {
  return {
    toggleDrawer: () => {
      dispatch(drawerToggle);
    }
  };
};
