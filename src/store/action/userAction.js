import {SET_HOME, ADD_CONFIG, IS_CONSENT, COUNT} from '../type';
export const setHomeScreen = () => {
  return dispatch => {
    dispatch({
      type: SET_HOME,
      payload: true,
    });
  };
};

export const setAddConfig = data => {
  return dispatch => {
    dispatch({
      type: ADD_CONFIG,
      payload: data,
    });
  };
};

export const setUserConsent = value => {
  return dispatch => {
    dispatch({
      type: IS_CONSENT,
      payload: value,
    });
  };
};

export const setCount = (val) => {
  return dispatch => {
    dispatch({
      type: COUNT,
      payload: val,
    });
  };
};
