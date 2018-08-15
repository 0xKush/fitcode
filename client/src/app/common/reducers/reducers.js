import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import root from 'app/root/duck';
import food from 'app/food/duck';

export default combineReducers({
  auth: root.authReducer,
  form: FormReducer,
  food: food.foodReducer
});