import ActionCreators from './actions';
import axios from 'axios';

const {
  loading,
  fetchGoals,
  fetchHistory,
  fetchError,
  editMacros,
  setCurrentWeight,
  setGoalWeight,
  setFromDate,
  setToDate,
  resetMessage
} = ActionCreators;

const complexFetchGoals = date => async dispatch => {
  try {
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const goals = await axios.get(`/api/user/${userId}/goals`, reqConfig);

    dispatch(fetchGoals(goals.data, date));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexFetchHistory = (fromDate, toDate) => async dispatch => {
  try {
    dispatch(loading(true));
    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/user/${userId}/history?from=${fromDate}&to=${toDate}`, reqConfig);

    const { diaries, weights } = response.data;
    dispatch(fetchHistory(diaries, weights));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditMacros = newMacros => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/user/${userId}/macros`, newMacros, reqConfig);
    const { macros, message } = response.data;

    dispatch(editMacros(macros, message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEnterCurrentWeight = (newCurrentWeight, date) => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/user/${userId}/currentweight`, newCurrentWeight, reqConfig);

    const { currentWeight, message } = response.data;

    dispatch(setCurrentWeight(currentWeight, message, date));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEnterGoalWeight = newGoalWeight => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem('token');

    const userId = localStorage.getItem('userId');

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(`/api/user/${userId}/goalweight`, newGoalWeight, reqConfig);
    const { goalWeight, message } = response.data;

    dispatch(setGoalWeight(goalWeight, message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexSetFromDate = date => async dispatch => {
  dispatch(setFromDate(date));
};

const complexSetToDate = date => async dispatch => {
  dispatch(setToDate(date));
};

export default {
  complexFetchGoals,
  complexFetchHistory,
  complexEditMacros,
  complexEnterCurrentWeight,
  complexEnterGoalWeight,
  complexSetFromDate,
  complexSetToDate,
  resetMessage
};
