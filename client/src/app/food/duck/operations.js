import ActionCreators from "./actions";
import axios from "axios";
// import _ from 'lodash';

const {
  loading,
  fetchError,
  setMacros,
  setMeals,
  setExerciseCals,
  getUserProducts,
  getRecentProducts,
  searchProducts,
  selectProduct,
  selectMeal,
  addDiaryProduct,
  editDiaryProduct,
  deleteDiaryProduct,

  addDay,
  substractDay,
  setDay,

  addPersonalProduct,
  editPersonalProduct,
  deletePersonalProduct,
  resetMessage,
  resetSearchMessage,

  fetchRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
  selectRecipe
} = ActionCreators;

const complexFetchHome = date => async dispatch => {
  try {
    const fDate = date.format("YYYY-MM-DD");

    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("userId");

    const reqConfig = { headers: { authorization: token } };

    const goals = await axios.get(`/api/user/${userId}/goals`, reqConfig);

    const meals = await axios.get(
      `/api/diary/user/${userId}?date=${fDate}`,
      reqConfig
    );

    const exercises = await axios.get(
      `/api/user/${userId}/exercise`,
      reqConfig
    );

    dispatch(setDay(date));

    dispatch(setMeals(meals.data));

    dispatch(setMacros(goals.data.macros));

    dispatch(setExerciseCals(exercises.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexFetchRecipes = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("userId");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/user/${userId}/recipe`, reqConfig);

    dispatch(fetchRecipes(response.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexSearchProducts = term => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(
      `/api/product/search?like=${term}`,
      reqConfig
    );
    const { products, message } = response.data;

    dispatch(searchProducts(products, message));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddDiaryProduct = (mealId, diaryProduct) => async dispatch => {
  try {
    const token = localStorage.getItem("token");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.post(
      `/api/diary/${mealId}/product`,
      diaryProduct,
      reqConfig
    );
    const { message } = response.data;

    dispatch(addDiaryProduct(message));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditDiaryProduct = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem("token");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(
      `/api/diary/${mealId}/product`,
      product,
      reqConfig
    );
    const { diary, message } = response.data;

    dispatch(editDiaryProduct([diary], message));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexDeleteDiaryProduct = (mealId, product) => async dispatch => {
  try {
    const token = localStorage.getItem("token");

    const reqConfig = { headers: { authorization: token } };

    const productId = product.product;

    const response = await axios.delete(
      `/api/diary/${mealId}/product/${productId}`,
      reqConfig
    );
    const { diary, message } = response.data;

    dispatch(deleteDiaryProduct([diary], message));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddDay = date => async dispatch => dispatch(addDay(date));

const complexSubstractDay = date => async dispatch =>
  dispatch(substractDay(date));

const complexSetDay = date => async dispatch => {
  dispatch(loading(true));

  dispatch(setDay(date));

  dispatch(loading(false));
};

const complexGetUserProducts = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("userId");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(`/api/product/user/${userId}`, reqConfig);

    dispatch(getUserProducts(response.data));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexGetRecentProducts = part => async dispatch => {
  try {
    dispatch(loading(true));
    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("userId");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.get(
      `/api/user/${userId}/products?part=${part}`,
      reqConfig
    );

    dispatch(getRecentProducts(response.data));
    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexEditPersonalProduct = (
  productId,
  updatedProduct
) => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem("token");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.put(
      `/api/product/${productId}`,
      updatedProduct,
      reqConfig
    );
    const { product, message } = response.data;

    dispatch(editPersonalProduct([product], message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexDeletePersonalProduct = productId => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem("token");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.delete(`/api/product/${productId}`, reqConfig);
    const { product, message } = response.data;

    dispatch(deletePersonalProduct(product._id, message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

const complexAddPersonalProduct = newProduct => async dispatch => {
  try {
    dispatch(loading(true));

    const token = localStorage.getItem("token");

    const reqConfig = { headers: { authorization: token } };

    const response = await axios.post("/api/product/", newProduct, reqConfig);
    const { product, message } = response.data;

    dispatch(addPersonalProduct([product], message));

    dispatch(loading(false));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export default {
  complexFetchHome,
  complexGetUserProducts,
  complexGetRecentProducts,
  complexSearchProducts,
  selectProduct,
  selectMeal,

  complexAddDiaryProduct,
  complexEditDiaryProduct,
  complexDeleteDiaryProduct,

  complexAddDay,
  complexSubstractDay,
  complexSetDay,

  complexEditPersonalProduct,
  complexDeletePersonalProduct,
  complexAddPersonalProduct,
  resetMessage,
  resetSearchMessage,

  complexFetchRecipes,
  selectRecipe
};
