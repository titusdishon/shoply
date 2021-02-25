import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {newProductReducer, newReviewReducer, productDetailsReducer, productsReducer} from "./reducers/product";
import {authReducer, forgotPasswordReducer, userReducer} from "./reducers/user";
import {cartReducer} from "./reducers/cart";
import {myOrders, newOrderReducer, orderDetailsReducer} from "./reducers/order";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrders,
    order:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ?JSON.parse(localStorage.getItem('shippingInfo')):{}
    }
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
