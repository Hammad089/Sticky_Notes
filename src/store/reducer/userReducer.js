import { SET_HOME, ADD_CONFIG, IS_CONSENT, COUNT } from '../type';

const initialState = {
  is_home_screen: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME:
      return {
        ...state,
        is_home_screen: true,
      };
    default:
      return state;
  }
};
