export const mapToProps = state => {
  return {
    wall: state.wall,
    user: state.user,
    nowProvider: () => {
      return Date.now();
    }
  };
};
