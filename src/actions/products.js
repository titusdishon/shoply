import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  CLEAR_ERRORS,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_SUCCESS,
  ADMIN_ALL_PRODUCTS_REQUEST,
  ADMIN_ALL_PRODUCTS_SUCCESS, ADMIN_ALL_PRODUCTS_FAIL,
} from "../constants/productConstants";
import {config} from "../constants/general";
import {NEW_PASSWORD_SUCCESS} from "../constants/authConstants";

export const getAllProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating =1
) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });
    let Link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
    if (category) {
      Link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
    }
    const data = await axios.get(Link);
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const data = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get admin products
export const getAdminProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_ALL_PRODUCTS_REQUEST,
    });

    const data = await axios.get(`/api/v1/admin/products`);
    dispatch({
      type: ADMIN_ALL_PRODUCTS_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//submit a product review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });
    const data = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
