import {
    ADMIN_ORDERS_FAIL,
    ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";
import {config} from "../constants/general";
import {CLEAR_ERRORS} from "../constants/productConstants";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST})
        const {data} = await axios.post('/api/v1/order/new', order, config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//get my orders
export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDERS_REQUEST})
        const {data} = await axios.get('/api/v1/orders/me', config);
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
};


export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/order/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};

//admin orders

//get my orders
export const getAdminOrders = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_ORDERS_REQUEST})
        const {data} = await axios.get('/api/v1/admin/orders', config);
        dispatch({
            type: ADMIN_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};