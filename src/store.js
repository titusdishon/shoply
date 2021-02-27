import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productReducer,
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productsReducer, getProductReviewReducer, deleteReviewReducer
} from "./reducers/product";
import {authReducer, forgotPasswordReducer, userReducer, usersDetailsReducer, usersReducer} from "./reducers/user";
import {cartReducer} from "./reducers/cart";
import {adminOrdersReducers, myOrders, newOrderReducer, orderDetailsReducer, orderReducer} from "./reducers/order";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    productReviews: getProductReviewReducer,
    review: deleteReviewReducer,
    newOrder: newOrderReducer,
    myOrders: myOrders,
    order: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    adminOrders: adminOrdersReducers,
    product: productReducer,
    orderUpdate:orderReducer,
    userDetails:usersDetailsReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
