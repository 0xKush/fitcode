import types from './types';
import moment from 'moment';
import _ from 'lodash';

const INITIAL_STATE = {
  meals: {},
  goals: {},

  products: [],
  selectedProduct: {},
  selectedMeal: {},
  selectedGrams: {},

  loading: true,
  errorMessage: '',

  date: moment()
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_HOME:
      return {
        ...state,
        goals: action.payload.goalData,
        meals: _.mapKeys(action.payload.mealData, '_id'),
        loading: false
      };

    case types.FETCH_GOALS:
      return {
        ...state,
        goals: action.payload,
        loading: false
      };

    case types.FETCH_MEALS:
      return {
        ...state,
        meals: _.mapKeys(action.payload, '_id'),
        loading: false
      };

    case types.FETCH_HOME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };

    case types.SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    case types.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product,
        selectedGrams: action.payload.grams,
        loading: false
      };

    case types.SELECT_MEAL:
      return {
        ...state,
        selectedMeal: action.payload,
        loading: false
      };

    case types.EDIT_PRODUCT:
      return {
        ...state,
        meals: { ...state.meals, ..._.mapKeys(action.payload, '_id') },
        loading: false
      };

    case types.DELETE_PRODUCT:
      return {
        ...state,
        meals: { ...state.meals, ..._.mapKeys(action.payload, '_id') },
        loading: false
      };

    case types.ADD_DAY:
      return {
        ...state,
        date: action.payload,
        loading: false
      };

    case types.SUBSTRACT_DAY:
      return {
        ...state,
        date: action.payload,
        loading: false
      };

    case types.SET_DAY:
      return {
        ...state,
        date: action.payload
      };

    default:
      return state;
  }
};
export default { foodReducer };