let defaultState = {
  status: 'unknown',
};

const mainReducer = (state = defaultState, action) => {
  if (action.type === 'LOGGED_IN_STATUS') {
    return {
      ...state,
      status: action.status,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default mainReducer;
