import axios from "axios";
import {
    ADMIN_ALL_PRODUCTS_FAIL,
    ADMIN_ALL_PRODUCTS_REQUEST,
    ADMIN_ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";
import {config} from "../constants/general";

export const getAllProducts = (
    keyword = "",
    currentPage = 1,
    price,
    category,
    rating = 1
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
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};


//submit a product review
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST,
        });
        const data = await axios.post(`/api/v1/admin/product/new`, productData, config);
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//submit a product review
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        });
        const data = await axios.delete(`/api/v1/admin/product/${id}`, config);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
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
