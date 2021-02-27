import {
    ADMIN_ORDERS_FAIL,
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_RESET,
    DELETE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_SUCCESS
} from "../constants/orderConstants";


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS: {
            return {
                loading: false,
                order: action.payload
            }
        }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}
export const myOrders = (state = {}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDERS_SUCCESS: {
            return {
                loading: false,
                orders: action.payload
            }
        }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}

export const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS: {
            return {
                loading: false,
                order: action.payload
            }
        }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}

//ADMIN ORDERS

export const adminOrdersReducers = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_ORDERS_SUCCESS: {
            return {
                loading: false,
                orders: action.payload
            }
        }
        case ADMIN_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

//new product
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                isUpdated: action.payload,
                loading: false,
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                err: action.payload,
            };
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
            };
        case DELETE_ORDER_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};