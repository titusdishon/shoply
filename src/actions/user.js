import {
    CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    NEW_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    REGISTRATION_FAIL,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS, USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
} from "../constants/authConstants";
import axios from "axios";

//login user
const config = {headers: {"Content-Type": "application/json"}};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST,});
        const {data} = await axios.post(`/api/v1/login`, {email, password}, config);
        dispatch({type: LOGIN_SUCCESS, payload: data.user,});
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message,});
    }
};

//register user

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTRATION_REQUEST,});
        const {data} = await axios.post(`/api/v1/register`, userData, config);
        dispatch({type: REGISTRATION_SUCCESS, payload: data.user,});
    } catch (error) {
        dispatch({type: REGISTRATION_FAIL, payload: error.response.data.message,});
    }
};


//load user

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST,});
        const {data} = await axios.get(`/api/v1/me`, config);
        dispatch({type: LOAD_USER_SUCCESS, payload: data.user,});
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message,});
    }
};


//logout user

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({type: LOGOUT_USER_SUCCESS});
    } catch (error) {
        dispatch({type: LOGOUT_USER_FAIL, payload: error.response.data.message,});
    }
};


//change user profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST,});
        const {data} = await axios.put(`/api/v1/me/update`, userData, config);
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message});
    }
};
//change user profile
export const changePassword = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST,});
        const {data} = await axios.put(`/api/v1/password/update`, userData, config);
        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message});
    }
};


//forgot password for user
export const forgotPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST,});
        const {data} = await axios.post(`/api/v1/password/forgot`, {email: email}, config);
        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    } catch (error) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message});
    }
};

//forgot password for user
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({type: NEW_PASSWORD_REQUEST,});
        const {data} = await axios.post(`/api/v1/password/reset/${token}`, {
            password: passwords.password,
            confirmPassword: passwords.confirmPassword
        }, config);
        dispatch({type: NEW_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: NEW_PASSWORD_FAIL, payload: error.response.data.message});
    }
};

//update user profile -ADMIN
export const updateUser = (id,userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST,});
        const {data} = await axios.put(`/api/v1//admin/user/update/${id}`, userData, config);
        dispatch({type: UPDATE_USER_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_USER_FAIL, payload: error.response.data.message});
    }
};

//load users for admin

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: GET_ALL_USERS_REQUEST,});
        const {data} = await axios.get(`/api/v1/admin/users/all`, config);
        dispatch({type: GET_ALL_USERS_SUCCESS, payload: data.users});
    } catch (error) {
        dispatch({type: GET_ALL_USERS_FAIL, payload: error.response.data.message,});
    }
};

//load users for admin

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST,});
        const {data} = await axios.get(`/api/v1/user/details/${id}`, config);
        dispatch({type: USER_DETAILS_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: USER_DETAILS_FAIL, payload: error.response.data.message,});
    }
};

//delete user for admin

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST,});
        const {data} = await axios.delete(`/api/v1/admin/user/delete/${id}`, config);
        dispatch({type: DELETE_USER_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: DELETE_USER_FAIL, payload: error.response.data.message,});
    }
};


//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS,});
};