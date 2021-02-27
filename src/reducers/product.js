import {
    ADMIN_ALL_PRODUCTS_FAIL,
    ADMIN_ALL_PRODUCTS_REQUEST,
    ADMIN_ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCTS_REVIEW_FAIL,
    PRODUCTS_REVIEW_REQUEST, PRODUCTS_REVIEW_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const productsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            };
        case ADMIN_ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                products: {},
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productDetailsReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                product: null,
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload.product,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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


//review
export const newReviewReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                success: action.payload,
                loading: false,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false,
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


//Get product reviews
export const getProductReviewReducer = (state = {reviews: []}, action) => {
    switch (action.type) {
        case PRODUCTS_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PRODUCTS_REVIEW_SUCCESS:
             return {
                loading: false,
                reviews: action.payload,
            };
        case PRODUCTS_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

//new product
export const newProductReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                product: action.payload.product,
                loading: false,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                success: false,
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

//new product
export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isDeleted: action.payload,
                loading: false,
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isUpdated: action.payload,
                loading: false,
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                err: action.payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
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

//Get product reviews
export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
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

